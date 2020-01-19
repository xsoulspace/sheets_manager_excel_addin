<template>
	<div
		class="home"
	>
		<header class="header">
			<navigation-tabs
				@turn-on-settings='changeSettingsState(true)'
				:isSettingsActive="isSettingsActive"
			/>
		</header>
		<settings-modal
			:isSettingsActive="isSettingsActive"
			@turn-off-settings-state="changeSettingsState(false)"
		/>
		<!-- <root-nested-items 
    :isParent="true" v-model="elements" 
  /> -->
	</div>
</template>

<script lang="ts">
// @ is an alias to /src
import NestedItems from '@/GraphicCore/StatefullWidget/NestedItems.vue'
import SettingsModal from '@/GraphicCore/StatefullWidget/SettingsModal.vue'
import NavigationTabs from '@/GraphicCore/StatefullWidget/NavigationTabs.vue'

import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import AppSettings from "@/StorageCore/AppSettings";
import outsideClick from "@/GraphicCore/Directives/outside-click";
import Sheets from '@/StorageCore/Sheets'
@Component({
	components: {
		NavigationTabs,
		SettingsModal,
		'root-nested-items': NestedItems,
	},
	directives:{
		outsideClick
	}
})
export default class Home extends Vue {
	isSettingsActive: boolean = false
	public get elements(): SheetElementsInterface.EMap {
		const sheetsModule = getModule(Sheets, this.$store)
		return sheetsModule.getSheets
	}
	public get isDarkTheme(){
		const module = getModule(AppSettings,this.$store)
		return module.getIsDarkTheme
	}
	changeSettingsState(value: boolean = false){
		this.$data.isSettingsActive = value
	}
	// public set elements(value: Array<Object>) {
	//   async() => {
	//     await this.$store.dispatch("updateElements", value)
	//   }
	// }
	// private get excelUsingInfo(): Array<Object> {
	//   return this.$store.getters['getNested'];
	// }
	async mounted() {
		// await this.$store.dispatch('loadWorksheets')
	}
}
</script>
<style lang="scss">
</style>
