<template>
	<div id="app">

		<router-view />
	</div>
</template>

<script>
import { ExcelContextBuilder } from './LogicCore/APIExcel/ExcelContextBuilder'
import { getModule } from 'vuex-module-decorators'
import Sheets from './StorageCore/Sheets'

export default {
	name: 'App',
	data() {
		return {
			StoreAppSettings: 'appSettings',
			hostInfo: undefined,
			sourceApp: 'browser'
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
				return ''//this.$store.getters[this.StoreAppSettings]
			},
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
		const elements = getModule(Sheets,this.$store)
		await elements.initializeStore(this.sourceApp)
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
<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
