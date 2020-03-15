/// <reference path='../types/SheetManager.d.ts'/>

import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Log } from '@/LogicCore/Debug/Log'
import { MaintainerStatuses } from '@/LogicCore/Instances/MatrixElement/Maintainer'

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
	get getIsTouchDevice(){
		return this.isTouchDevice
	}
	@Mutation
	setIsTouchDevice(value: boolean){
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
		if(newState == isNumerated){
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
	get getShowNumeration(){
		return this.showNumeration
	}
	@Mutation
	switchShowNumeration(){
		this.showNumeration = !this.showNumeration
	}
}
