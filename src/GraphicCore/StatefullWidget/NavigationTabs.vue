<template>
	<div
		class="tabs"
		:class="{
			'--is-dark': isDarkTheme,
		}"
	>
		<div
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
		<div class="tabs__tab" @click="turnOnInfo">
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
		<div class="tabs__tab" @click="turnOnSettings">
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
		<div class="tabs__tab" @click="turnOnTutorial">
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
		<div class="tabs__tab" @click="turnOnInfo">
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
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppSettings from '@/StorageCore/AppSettings'
import { getModule } from 'vuex-module-decorators'

@Component({
	name: 'navigation-tabs',
	components: {},
})
export default class NavigationTabs extends Vue {
	public get isDarkTheme() {
		const module = getModule(AppSettings, this.$store)
		return module.getIsDarkTheme
	}
	isSearchActive: boolean = false
	searchingWord: string = ''
	turnOnInfo() {}
	turnOnSettings() {
		this.$emit('turn-on-settings')
	}
	turnOnTutorial() {}
	async refreshSheets() {}
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
}
</script>
<style lang="scss" scoped></style>
