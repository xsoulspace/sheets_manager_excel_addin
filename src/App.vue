<template>
	<div id="app" :class="{ '--is-dark': isDarkTheme }">
		<router-view />
		<ModalBrokenNavigation
			@repaire-answer="acceptRepaireAnswer"
			:isActive="hasBrokenNumeration"
		/>
		<Alert
			@close="closeAlert"
			:title="alertState.title"
			:type="alertState.type"
			:isActive="alertState.isOpen"
		/>
		<v-tour
			name="tour"
			:steps="steps"
			:options="{ highlight: true }"
			:callbacks="tourCallbacks"
		></v-tour>
	</div>
</template>
<script lang="ts">
import { getModule } from 'vuex-module-decorators'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Log } from '@/LogicCore/Debug/Log'
import AppSettings, { AllAppSettingsInterface } from '@/StorageCore/AppSettings'
import Sheets from '@/StorageCore/Sheets'
import { ExcelContextBuilder } from './LogicCore/APIExcel/ExcelContextBuilder'
import ModalBrokenNavigation from '@/GraphicCore/StatefullWidget/ModalBrokenNavigation.vue'
import Alert from '@/GraphicCore/StatelessWidget/Alert.vue'
import { AlertTypes, AlertArgs } from '@/types/SheetManager'
import { introTour } from '@/LogicCore/Tours/IntroTour'
import { Languages } from './LogicCore/Languages/Languages'
@Component({
	components: {
		ModalBrokenNavigation,
		Alert,
	},
})
export default class App extends Vue {
	tourCallbacks = {
		onStart: this.enableDimmer,
		onStop: this.disableDimmer,
		onNextStep: this.introOnNextStep,
		onPreviousStep: this.introOnPreviousStep,
	}
	async enableDimmer() {
		const module = getModule(AppSettings, this.$store)
		module.dimmer(true)
		await this.mountTestData()
	}
	async disableDimmer() {
		const module = getModule(AppSettings, this.$store)
		module.dimmer(false)
		await this.switchIntroIsRunning()
		let alertTitle: string
		alertTitle = <string>this.$t('alerts.introTutorialCompleted')

		module.openAlert({ title: alertTitle, type: AlertTypes.success })
		// if (!this.isMounted) {
		setTimeout(() => {
			this.sourceApp = 'excelDesktop'
			this.continueMounted()
		}, 1000)
		// }
	}
	get introIsRunning() {
		const module = getModule(AppSettings, this.$store)
		return module.getIntroIsRunning
	}
	switchIntroIsRunning() {
		const module = getModule(AppSettings, this.$store)
		module.switchIntroState()
	}
	@Watch('introIsRunning')
	introIsRunningChange(newState: boolean) {
		if (newState) {
			//@ts-ignore
			this.$tours['tour'].start()
			const module = getModule(AppSettings, this.$store)
			this.tourCurrentStep = 0
			module.setIntroStep(this.tourCurrentStep)
		}
	}
	tourCurrentStep: number = 0
	startTour() {
		this.switchIntroIsRunning()
	}
	introOnPreviousStep() {
		this.introOnStep(true)
	}
	introOnNextStep() {
		this.introOnStep(false)
	}
	introOnStep(isPrevious: boolean) {
		const module = getModule(AppSettings, this.$store)
		if (isPrevious) {
			this.tourCurrentStep -= 1
		} else {
			this.tourCurrentStep += 1
		}
		module.setIntroStep(this.tourCurrentStep)
	}
	get steps() {
		return introTour()
	}
	hostInfo: any = undefined
	sourceApp: MatrixElementInterface.outsideApp = 'excelDesktop'
	hasBrokenNumeration: boolean = false
	iniStore: boolean = false
	@Watch('iniStore')
	async iniStoreChange() {
		const sheets = getModule(Sheets, this.$store)
		const isLoaded = await sheets.initializeStore(this.sourceApp)
	}
	closeAlert() {
		const module = getModule(AppSettings, this.$store)
		module.closeAlert()
	}
	get alertState() {
		const module = getModule(AppSettings, this.$store)
		return module.getAlertState
	}
	get isDarkTheme() {
		const module = getModule(AppSettings, this.$store)
		return module.getIsDarkTheme
	}
	@Watch('appSettings')
	appSettingsChange() {
		if (this.isLocalStorageExists) {
			localStorage.setItem(
				this.title.storeAppSettings,
				JSON.stringify(this.appSettings)
			)
		}
	}

	async acceptRepaireAnswer(restoreNumeration: boolean) {
		const module = getModule(AppSettings, this.$store)
		module.loading(true)
		await module.switchSheetsNumeration(restoreNumeration)
		this.iniStore = !this.iniStore

		this.hasBrokenNumeration = false

		let alertTitle: string
		if (restoreNumeration) {
			alertTitle = <string>this.$t('alerts.successfulSheetsRecover')
		} else {
			alertTitle = <string>this.$t('alerts.successfulSheetsLoad')
		}
		module.openAlert({ title: alertTitle, type: AlertTypes.success })
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
	title = {
		lang: 'lang',
		storeAppSettings: 'appSettings',
	}
	get isLocalStorageExists() {
		return typeof localStorage != 'undefined'
	}
	set appSettings(value: AllAppSettingsInterface) {
		const module = getModule(AppSettings, this.$store)
		module.setAllSettings(value)
	}
	get appSettings() {
		const module = getModule(AppSettings, this.$store)
		return module.getAllSettings
	}
	get currentLang() {
		return <Languages>this.$i18n.locale
	}
	set currentLang(value: Languages) {
		this.$i18n.locale = value
	}
	@Watch('currentLang')
	currentLangChange(value: Languages) {
		localStorage.setItem(this.title.lang, value)
	}

	isMounted: boolean = false
	async mounted() {
		const module = getModule(AppSettings, this.$store)
		/** loading local settings */

		if (this.isLocalStorageExists) {
			// getting data from local storage
			const item = localStorage.getItem(this.title.storeAppSettings)
			if (item) this.appSettings = JSON.parse(item)
			const lang = localStorage.getItem(this.title.lang)
			if (lang) this.currentLang = <Languages>lang
		}

		/** run intro if it is needed */
		if (module.getRunIntroOnOpen) {
			this.startTour()
			return
		}
		await this.continueMounted()
	}
	async continueMounted() {
		const module = getModule(AppSettings, this.$store)
		module.loading(true)
		const sheetsModule = getModule(Sheets, this.$store)
		if (this.sourceApp == 'excelDesktop') {
			try {
				// Catch all events from Excel
				const context: Excel.RequestContext = await ExcelContextBuilder.init()
				const sheets: Excel.WorksheetCollection =
					context.workbook.worksheets

				sheets.onActivated.add(this.eventHandler)
				sheets.onAdded.add(this.eventHandler)
				sheets.onDeleted.add(this.eventHandler)

				await context.sync()
			} catch (error) {
				this.sourceApp = 'browser'
			}
		}
		this.checkIsTouchDevice()
		console.log('continue mounted', this.sourceApp)

		/** dispatch context to store */
		const isLoaded = await sheetsModule.initializeStore(this.sourceApp)
		console.log('m', this.sourceApp)
		if (!isLoaded) {
			this.hasBrokenNumeration = true
			module.loading(false)
			return
		}

		this.hasBrokenNumeration = false

		let alertTitle: string = <string>this.$t('alerts.successfulSheetsLoad')

		module.openAlert({ title: alertTitle, type: AlertTypes.success })
		this.isMounted = true
	}
	async mountTestData() {
		const sheetsModule = getModule(Sheets, this.$store)
		const isLoaded = await sheetsModule.initializeStore('browser')
		if (!isLoaded) {
			/** we will load anyway to show user test data */
		}
		this.hasBrokenNumeration = false
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
}
</script>
<style lang="scss"></style>
