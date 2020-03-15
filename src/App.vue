<template>
	<div id="app" :class="{ '--is-dark': isDarkTheme }">
		<router-view />
		<ModalBrokenNavigation
			@repaire-answer="acceptRepaireAnswer"
			:isActive="hasBrokenNumeration"
		/>
	</div>
</template>
<script lang="ts">
import { getModule } from 'vuex-module-decorators'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Log } from '@/LogicCore/Debug/Log'
import AppSettings from '@/StorageCore/AppSettings'
import Sheets from '@/StorageCore/Sheets'
import { ExcelContextBuilder } from './LogicCore/APIExcel/ExcelContextBuilder'
import ModalBrokenNavigation from '@/GraphicCore/StatefullWidget/ModalBrokenNavigation.vue'

@Component({
	components: {
		ModalBrokenNavigation,
	},
})
export default class App extends Vue {
	StoreAppSettings: string = 'appSettings'
	hostInfo: any = undefined
	// sourceApp: MatrixElementInterface.outsideApp = 'excelDesktop'
	sourceApp: MatrixElementInterface.outsideApp = 'browser'
	hasBrokenNumeration: boolean = false
	iniStore: boolean = false
	get isLocalStorageExists() {
		return typeof localStorage != 'undefined'
	}
	set appSettings(value) {
		//this.$store.commit(this.StoreAppSettings, value)
	}
	get appSettings() {
		return '' //this.$store.getters[this.StoreAppSettings]
	}

	get isDarkTheme() {
		const module = getModule(AppSettings, this.$store)
		return module.getIsDarkTheme
	}
	@Watch('appSettings')
	appSettingsChange() {
		if (this.isLocalStorageExists) {
			localStorage.setItem(
				this.StoreAppSettings,
				JSON.stringify(this.appSettings)
			)
		}
	}
	async acceptRepaireAnswer(restoreNumeration: boolean) {
		const module = getModule(AppSettings, this.$store)
		await module.switchSheetsNumeration(restoreNumeration)

		this.iniStore = !this.iniStore

		this.hasBrokenNumeration = false
	}
	@Watch('iniStore')
	async iniStoreChange() {
		console.log('hey')
		const sheets = getModule(Sheets, this.$store)
		const isLoaded = await sheets.initializeStore(this.sourceApp)
		console.log('heyxx', isLoaded)
	}
	checkIsTouchDevice() {
		//https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript/4819886#4819886
		try {
			let prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
			let mq = function(query: string) {
				return window.matchMedia(query).matches
			}

			if (
				'ontouchstart' in window ||
				//@ts-ignore
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
			const module = getModule(AppSettings, this.$store)
			module.setIsTouchDevice(isTouchDevice)
		} catch (error) {
			throw Log.error('App.checkIsTouchDevice', error)
		}
	}
	async eventHandler(
		args:
			| Excel.WorksheetActivatedEventArgs
			| Excel.WorksheetSingleClickedEventArgs
			| Excel.WorksheetDeletedEventArgs
			| Excel.WorksheetAddedEventArgs
			| Excel.WorksheetFormatChangedEventArgs
			| Excel.WorksheetChangedEventArgs
	) {
		const sheetsModule = getModule(Sheets, this.$store)
		switch (args.type) {
			case 'WorksheetSingleClicked':
				break

			case 'WorksheetActivated':
				sheetsModule.selectSheetMut(args.worksheetId)
				break
			case 'WorksheetDeleted':
				await sheetsModule.removeElementFromStore(args.worksheetId)
				break
			case 'WorksheetAdded':
				await sheetsModule.addNewSheet(args.worksheetId)
				break
			case 'WorksheetFormatChanged':
				break
			case 'WorksheetChanged':
				break
		}
		//
	}

	async beforeDestroy() {
		if (this.sourceApp == 'excelDesktop') {
			// Catch all events from Excel
			const context: Excel.RequestContext = await ExcelContextBuilder.init()
			const sheets: Excel.WorksheetCollection =
				context.workbook.worksheets
			sheets.onActivated.remove(this.eventHandler)
			sheets.onAdded.remove(this.eventHandler)
			sheets.onDeleted.remove(this.eventHandler)

			await context.sync()
		}
	}
	async mounted() {
		const sheetsModule = getModule(Sheets, this.$store)
		if (this.sourceApp == 'excelDesktop') {
			// Catch all events from Excel
			const context: Excel.RequestContext = await ExcelContextBuilder.init()
			const sheets: Excel.WorksheetCollection =
				context.workbook.worksheets

			sheets.onActivated.add(this.eventHandler)
			sheets.onAdded.add(this.eventHandler)
			sheets.onDeleted.add(this.eventHandler)

			await context.sync()
		}
		this.checkIsTouchDevice()

		/** dispatch context to store */
		const isLoaded = await sheetsModule.initializeStore(this.sourceApp)
		if (!isLoaded) {
			this.hasBrokenNumeration = true
			return
		}
		// console.log('isLoaded', isLoaded)

		this.hasBrokenNumeration = false
		// const elements = localStorage.getItem("elements")
		// if(typeof elements != "undefined"){
		//   this.$store.dispatch('specialUpdateElements',elements)
		// }
		if (this.isLocalStorageExists) {
			// getting data from local storage
			//console.log(wStorage)
			const item = localStorage.getItem(this.StoreAppSettings)
			if (item) this.appSettings = JSON.parse(item)
		}
	}
}
</script>
<style lang="scss"></style>
