/// <reference path='../types/SheetManager.d.ts'/>

import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Log } from '@/LogicCore/Debug/Log'
import { MaintainerStatuses } from '@/LogicCore/Instances/MatrixElement/Maintainer'
import { AlertTypes, AlertArgs } from '@/types/SheetManager'

@Module({ name: 'AppSettings', namespaced: true })
export default class AppSettings extends VuexModule {
	themeName: SheetManager.AppSettingsThemeName = 'dark'
	maintainerStatuses: MatrixElementInterface.maintainerStatuses = new MaintainerStatuses()
	get getIsDarkTheme() {
		const dark: SheetManager.AppSettingsThemeName = 'dark'
		return this.themeName == dark
	}
	@Mutation
	setTheme(themeName: SheetManager.AppSettingsThemeName) {
		this.themeName = themeName
	}
	@Action
	async setThemeAct(themeName: SheetManager.AppSettingsThemeName) {
		this.context.commit('setTheme', themeName)
	}

	isTouchDevice: boolean = false
	get getIsTouchDevice() {
		return this.isTouchDevice
	}
	@Mutation
	setIsTouchDevice(value: boolean) {
		this.isTouchDevice = value
	}

	get getMaintainerStatuses() {
		const m = new MaintainerStatuses(
			this.maintainerStatuses.areSheetsHaveNumeration,
			this.maintainerStatuses.isNumerationBroken,
			this.maintainerStatuses.shouldWeRestoreNumeration
		)
		return m
	}
	@Mutation
	switchSheetsNumerationMut(
		value: MaintainerStatuses['shouldWeRestoreNumeration']
	) {
		this.maintainerStatuses.default.shouldWeRestoreNumeration = value
		this.maintainerStatuses.default.areSheetsHaveNumeration = value
		this.maintainerStatuses.resetToDefault()
	}

	@Action
	async switchSheetsNumeration(forceState?: boolean) {
		const currentState = this.maintainerStatuses.areSheetsHaveNumeration
		const newState = forceState !== undefined ? forceState : !currentState

		this.switchSheetsNumerationMut(newState)
		const isNumerated = true
		if (newState == isNumerated) {
			await this.context.dispatch('Sheets/initializeStore', null, {
				root: true,
			})
		} else {
			await this.context.dispatch('Sheets/cleanNumerationIni', null, {
				root: true,
			})
		}
	}
	showNumeration: boolean = true
	get getShowNumeration() {
		return this.showNumeration
	}
	@Mutation
	switchShowNumeration() {
		this.showNumeration = !this.showNumeration
	}

	alert: AlertArgs = {
		title: '',
		type: AlertTypes.loading,
		isOpen: false,
	}
	get getAlertState() {
		return this.alert
	}
	@Mutation
	openAlert({ title, type }: { title: string; type: AlertTypes }) {
		this.alert.type = type
		this.alert.title = title
		this.alert.isOpen = true
		setTimeout(() => {
			this.alert.isOpen = false
		}, 5000)
	}
	@Mutation
	closeAlert() {
		this.alert.title = ''
		this.alert.isOpen = false
	}
	@Mutation
	loading(isLoading: boolean) {
		if (isLoading) {
			this.alert.type = AlertTypes.loading
			this.alert.title = 'Загрузка...'
			this.alert.isOpen = true
			setTimeout(() => {
				if (this.alert.isOpen) {
					this.alert.type = AlertTypes.danger
					this.alert.title =
						'Не удается выполнить загрузку! Пожалуйста перезагрузите аддин'
				}
			}, 100000)
		} else {
			this.alert.title = ''
			this.alert.isOpen = false
		}
	}
}
