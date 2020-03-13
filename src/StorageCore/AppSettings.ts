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
	get getMaintainerStatuses() {
		const m = new MaintainerStatuses(
			this.maintainerStatuses.areSheetsHaveNumeration,
			this.maintainerStatuses.isNumerationBroken,
			this.maintainerStatuses.shouldWeRestoreNumeration
		)
		return m
	}
	@Mutation
	setTheme(themeName: SheetManager.AppSettingsThemeName) {
		this.themeName = themeName
	}
	@Action
	async setThemeAct(themeName: SheetManager.AppSettingsThemeName) {
		this.context.commit('setTheme', themeName)
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
	async switchSheetsNumeration() {
		const currentState = this.maintainerStatuses.areSheetsHaveNumeration
		const newState = !currentState
		this.switchSheetsNumerationMut(newState)

		await this.context.dispatch('Sheets/initializeStore', null, {
			root: true,
		})
	}
}
