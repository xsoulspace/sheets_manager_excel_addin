<template>
	<div class="tabs">
		<div class="tabs__tab">
			<div class="search"
				:class="{
					'--is-open': isSearchActive,
				}"
				@mouseover="changeIsSearchActive(true)"
				@mouseleave="changeIsSearchActive(false)"
				@click="changeIsSearchActive(true, true)"
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

		<!-- <transition name="fade">
			<div class="tabs__tab">
				<li v-show="!isSearchActive" @click="isSettingsActive = true">
					<a>
						<span class="icon">
							<i class="fas fa-sliders-h"></i>
						</span>
					</a>
				</li>
			</div>
		</transition>

			<transition name="fade">
		<div class="tabs__tab">
				<li v-show="!isSearchActive">
					<a>
						<span class="icon">
							<i class="fas fa-question"></i>
						</span>
					</a>
				</li>

		</div>

			</transition>
			<transition name="fade">
		<div class="tabs__tab">
				<li v-show="!isSearchActive">
					<a>
						<span class="icon">
							<i class="fas fa-info"></i>
						</span>
					</a>
				</li>

		</div>

			</transition>
			<transition name="fade">
				<div class="tabs__tab">
				<li v-show="!isSearchActive">
					<a @click="refreshSheets">
						<span class="icon">
							<i class="fa fa-refresh"></i>
						</span>
					</a>
				</li>
				</div>
			</transition> -->
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
	name: 'navigation-tabs',
	components: {},
})
export default class NavigationTabs extends Vue {
	isSearchActive: boolean = false
	searchingWord: string = ''
	
	turnOnSettings() {}
	async refreshSheets() {}
	changeIsSearchActive(value: boolean, useItExplicitly?: boolean) {
		let isExplicit: boolean = false
		if (useItExplicitly === true) isExplicit = true
		if (this.searchingWord.length > 0) isExplicit = true
		console.log(isExplicit)
		if (isExplicit) {
			this.$data.isSearchActive = isExplicit
			return
		}
		this.$data.isSearchActive = value
	}
}
</script>
<style lang="scss" scoped>
.tabs {
	&.has-tiny-paddings {
		padding-bottom: 0.4rem;
		padding-top: 0.2rem;
		padding-left: 0.1rem;
		padding-right: 0.1rem;
	}
	&.is-overflowless-horizontal {
		overflow-x: hidden;
	}

	li {
		transition-property: width;
		transition-duration: 0.6s;
		transition-timing-function: ease-in-out;
		&.fade-enter-active {
			transition: opacity 1s;
			transition-delay: 0.5s;
		}
		&.fade-leave-active {
			transition: opacity 0.1s;
		}
		&.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
			opacity: 0;
		}
	}
}
</style>
