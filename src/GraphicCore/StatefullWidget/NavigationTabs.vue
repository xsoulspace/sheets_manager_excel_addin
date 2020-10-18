<template>
	<div
		class="tabs"
		:class="{
			'--is-dark': isDarkTheme,
		}"
	>
		<div
			data-v-step="header-search"
			class="tabs__tab"
			@mouseover="changeIsSearchActive(true)"
			@mouseleave="changeIsSearchActive(false)"
			@click="changeIsSearchActive(true, true)"
		>
			<div
				class="search --has-accent"
				:class="{
					'--is-open': isSearchActive,
					'--is-dark': isDarkTheme,
				}"
			>
				<input
					v-model="searchingWord"
					class="search__input"
					type="text"
				/>
				<div class="search__icon">
					<span class="icon">
						<i class="fas fa-search"></i>
					</span>
				</div>
			</div>
		</div>
		<div class="tabs__tab" @click="sync" data-v-step="header-sync">
			<div
				class="button --has-accent"
				:class="{
					'--is-dark': isDarkTheme,
				}"
			>
				<span class="icon__refresh">
					<i class="fa fa-refresh"></i>
				</span>
			</div>
		</div>
		<div
			class="tabs__tab"
			@click="turnOnSettings"
			data-v-step="header-settings"
		>
			<div
				class="button --has-accent"
				:class="{
					'--is-dark': isDarkTheme,
				}"
			>
				<span class="icon">
					<i class="fas fa-sliders-h"></i>
				</span>
			</div>
		</div>
		<div
			class="tabs__tab"
			@click="turnOnTutorial"
			data-v-step="header-help"
		>
			<div
				class="button --has-accent"
				:class="{
					'--is-dark': isDarkTheme,
				}"
			>
				<span class="icon">
					<i class="fas fa-question"></i>
				</span>
			</div>
		</div>
		<div class="tabs__tab" @click="turnOnInfo" data-v-step="header-info">
			<div
				class="button --has-accent"
				:class="{
					'--is-dark': isDarkTheme,
				}"
			>
				<span class="icon">
					<i class="fas fa-info"></i>
				</span>
			</div>
		</div>
		<ModalInfo :isActive="isInfoActive" @close="closeInfo" />
	</div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import AppSettings from '@/StorageCore/AppSettings'
import { getModule } from 'vuex-module-decorators'
import Sheets from '@/StorageCore/Sheets'
import ModalInfo from '@/GraphicCore/StatefullWidget/ModalInfo.vue'
import { AlertTypes } from "@/types/SheetManager";
@Component({
	name: 'navigation-tabs',
	components: { ModalInfo },
})
export default class NavigationTabs extends Vue {
	public get isDarkTheme() {
		const module = getModule(AppSettings, this.$store)
		return module.getIsDarkTheme
	}
	isSearchActive: boolean = false
	searchingWord: string = ''
	@Watch('searchingWord')
	async searchingWordChange(word: string) {
		const module = getModule(Sheets, this.$store)
		await module.filterSheetsByWord(word)
	}
	isInfoActive: boolean = false
	turnOnInfo() {
		this.isInfoActive = true
	}
	closeInfo() {
		this.isInfoActive = false
	}
	turnOnSettings() {
		this.$emit('turn-on-settings')
	}
	turnOnTutorial() {
		const module = getModule(AppSettings, this.$store)
		module.switchIntroState()
	}
	changeIsSearchActive(value: boolean, useItExplicitly?: boolean) {
		let isExplicit: boolean = false
		if (useItExplicitly === true) isExplicit = true
		if (this.searchingWord.length > 0) isExplicit = true
		if (isExplicit) {
			this.$data.isSearchActive = isExplicit
			return
		}
		this.$data.isSearchActive = value
	}
	async sync() {
		const settings = getModule(AppSettings, this.$store)
		settings.loading(true)
		const module = getModule(Sheets, this.$store)
		await module.initializeStore()
		const title = <string>this.$t('alerts.successfulSync')
		settings.openAlert({ title, type: AlertTypes.success })
	}
}
</script>
<style lang="scss" scoped></style>
