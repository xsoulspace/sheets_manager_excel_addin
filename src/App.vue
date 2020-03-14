<template>
	<div id="app" :class="{ '--is-dark': isDarkTheme }">
		<router-view />
	</div>
</template>

<script>
import { ExcelContextBuilder } from './LogicCore/APIExcel/ExcelContextBuilder'
import { getModule } from 'vuex-module-decorators'
import Sheets from './StorageCore/Sheets'
import AppSettings from '@/StorageCore/AppSettings'

export default {
	name: 'App',
	data() {
		return {
			StoreAppSettings: 'appSettings',
			hostInfo: undefined,
			sourceApp: 'excelDesktop', //browser
			// sourceApp: 'browser',//browser
			hasBrokenNumeration: false,
			iniStore: false,
		}
	},
	computed: {
		isLocalStorageExists: function() {
			return typeof localStorage != 'undefined'
		},
		appSettings: {
			set: function(value) {
				//this.$store.commit(this.StoreAppSettings, value)
			},
			get: function() {
				return '' //this.$store.getters[this.StoreAppSettings]
			},
		},
		isDarkTheme() {
			const module = getModule(AppSettings, this.$store)
			return module.getIsDarkTheme
		},
	},
	watch: {
		appSettings: function() {
			if (this.isLocalStorageExists) {
				localStorage.setItem(
					this.StoreAppSettings,
					JSON.stringify(this.appSettings)
				)
			}
		},
		hasBrokenNumeration: async function(newValue){
			console.log('hasBrokenNumeration')

			/**TODO: call popup do we need to restore numeration? */
			if (newValue) {
				const module = getModule(AppSettings, this.$store)
				await module.switchSheetsNumeration()
				this.iniStore = ! this.iniStore
			}
		},
		iniStore: async function() {
			console.log('hey')
			const sheets = getModule(Sheets, this.$store)
			const isLoaded = await sheets.initializeStore(this.sourceApp)
			console.log('heyxx',isLoaded)

		},
	},
	methods: {
		checkIsTouchDevice() {
			//https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript/4819886#4819886
			try {
				let prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
				let mq = function(query) {
					return window.matchMedia(query).matches
				}

				if (
					'ontouchstart' in window ||
					(window.DocumentTouch && document instanceof DocumentTouch)
				) {
					return true
				}

				// include the 'heartz' as a way to have a non matching MQ to help terminate the join
				// https://git.io/vznFH
				let query = [
					'(',
					prefixes.join('touch-enabled),('),
					'heartz',
					')',
				].join('')
				let isTouchDevice = mq(query)
				//this.$store.commit('setIsTouchDevice', isTouchDevice)
			} catch (error) {
				console.log('isTouchDevice', error)
			}
		},
		eventHandler: async function(event) {
			// self.$store.commit('joinlog', JSON.stringify(event))
			switch (event.type) {
				case 'WorksheetAdded':
					//this.$store.dispatch('worksheetAdded', event.worksheetId)
					break

				case 'WorksheetActivated':
					// this.$store.dispatch(
					// 	'worksheetActivated',
					// 	event.worksheetId
					// )
					break
				case 'WorksheetDeleted':
					// this.$store.dispatch('worksheetDeleted', event.worksheetId)
					break
			}
			//
		},
	},
	async mounted() {
		this.checkIsTouchDevice()
		// Catch all events from Excel
		// let context = await ExcelContextBuilder.init()
		// let sheets = await context.workbook.worksheets
		// sheets.onActivated.add(this.eventHandler)
		// sheets.onAdded.add(this.eventHandler)
		// sheets.onDeleted.add(this.eventHandler)
		// sheets.onChanged.add(this.eventHandler)
		// await context.sync()
		// ****************
		// Excel Events end
		// ****************
		/** dispatch context to store */
		const sheets = getModule(Sheets, this.$store)
		const isLoaded = await sheets.initializeStore(this.sourceApp)
		if (!isLoaded) {
			this.hasBrokenNumeration = true
			return
		}
					console.log('isLoaded',isLoaded)

		this.hasBrokenNumeration = false
		// const elements = localStorage.getItem("elements")
		// if(typeof elements != "undefined"){
		//   this.$store.dispatch('specialUpdateElements',elements)
		// }
		if (this.isLocalStorageExists) {
			// getting data from local storage
			//console.log(wStorage)
			if (localStorage.getItem(this.StoreAppSettings)) {
				this.appSettings = JSON.parse(
					localStorage.getItem(this.StoreAppSettings)
				)
			}
		}
	},
}
</script>
<style lang="scss"></style>
