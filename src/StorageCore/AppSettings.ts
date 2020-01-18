import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Log } from '@/LogicCore/Debug/Log'
/// <reference path='../types/SheetManager.d.ts'/>

@Module({ name: 'AppSettings', namespaced: true })
export default class AppSettings extends VuexModule {
	themeName: SheetManager.AppSettingsThemeName = 'base'
	get getIsDarkTheme() {
		return true //this.themeName == SheetManager.enumAppSettingsThemeName['dark']
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
