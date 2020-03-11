<template>
	<div class="home">
		<header class="header">
			<navigation-tabs
				@turn-on-settings="changeSettingsState(true)"
				:isSettingsActive="isSettingsActive"
			/>
		</header>
		<settings-modal
			:isSettingsActive="isSettingsActive"
			@turn-off-settings-state="changeSettingsState(false)"
		/>
		<NItems/>
		<!-- <root-nested-items 
    :isParent="true" v-model="elements" 
  /> -->
	</div>
</template>

<script lang="ts">
// @ is an alias to /src
import SettingsModal from '@/GraphicCore/StatefullWidget/SettingsModal.vue'
import NavigationTabs from '@/GraphicCore/StatefullWidget/NavigationTabs.vue'
import ItemsDropzone from '@/GraphicCore/StatefullWidget/ItemsDropzone.vue'
import Item from '@/GraphicCore/StatefullWidget/Item.vue'
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import AppSettings from '@/StorageCore/AppSettings'
import Sheets from '@/StorageCore/Sheets'
import NItems from "@/GraphicCore/StatefullWidget/NItems.vue";
@Component({
	components: {
		NavigationTabs,
		SettingsModal,
		ItemsDropzone,
		Item,
		NItems
	},
})
export default class Home extends Vue {
	isSettingsActive: boolean = false
	public get elements(): SheetElementsInterface.EArr{
		const sheetsModule = getModule(Sheets, this.$store)
		return sheetsModule.getSheets
	}
	public get isDarkTheme() {
		const module = getModule(AppSettings, this.$store)
		return module.getIsDarkTheme
	}
	changeSettingsState(value: boolean = false) {
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
<style lang="scss"></style>
