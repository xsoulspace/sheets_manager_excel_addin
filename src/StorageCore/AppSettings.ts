/// <reference path='../types/SheetManager.d.ts'/>

import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Log } from '@/LogicCore/Debug/Log'

@Module({ name: 'AppSettings', namespaced: true })
export default class AppSettings extends VuexModule {
	themeName: SheetManager.AppSettingsThemeName = 'dark'
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
}
