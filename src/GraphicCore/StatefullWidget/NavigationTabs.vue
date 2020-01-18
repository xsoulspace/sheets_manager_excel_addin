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
				class="search"
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
		<transition name="fade">
			<div class="tabs__tab" @click="turnOnInfo">
				<div
					class="button"
					:class="{
						'--is-dark': isDarkTheme,
					}"
				>
					<span class="icon__refresh">
						<i class="fa fa-refresh"></i>
					</span>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="tabs__tab" @click="turnOnSettings">
				<div
					class="button"
					:class="{
						'--is-dark': isDarkTheme,
					}"
				>
					<span class="icon">
						<i class="fas fa-sliders-h"></i>
					</span>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="tabs__tab" @click="turnOnTutorial">
				<div
					class="button"
					:class="{
						'--is-dark': isDarkTheme,
					}"
				>
					<span class="icon">
						<i class="fas fa-question"></i>
					</span>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="tabs__tab" @click="turnOnInfo">
				<div
					class="button"
					:class="{
						'--is-dark': isDarkTheme,
					}"
				>
					<span class="icon">
						<i class="fas fa-info"></i>
					</span>
				</div>
			</div>
		</transition>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
	name: 'navigation-tabs',
	components: {},
})
export default class NavigationTabs extends Vue {
	isDarkTheme: boolean = false
	isSearchActive: boolean = false
	searchingWord: string = ''
	turnOnInfo() {}
	turnOnSettings() {}
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
