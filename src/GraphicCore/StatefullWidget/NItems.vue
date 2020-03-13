<template>
	<div>
		<vue-nestable
			v-model="elements"
			:childrenProp="childrenProp"
			:maxDepth="2"
			:threshold="50"
			@change="changeElements"
		>
			<vue-nestable-handle slot-scope="{ item }" :item="item">
				<NItem :el="item" :id="item.id" @open-colors="openColors" />				
			</vue-nestable-handle>
		</vue-nestable>
		<NModal
			:isActive="isColorsOpen"
			@close="closeColors"
			@save="saveColors"
			:title="'Выбор цвета'"
		>
			<template v-slot:modalBody>
				<swatches
					v-model="color"
					colors="material-basic"
					inline
					show-fallback
					popover-to="left"
					@close='closeColors'
					:class="{
						'--is-dark': isDarkTheme,
					}"
				>
				</swatches>
			</template>
		</NModal>
	</div>
</template>

<script lang="ts">
import NModal from './NModal.vue'
import Swatches from 'vue-swatches'

import { getModule } from 'vuex-module-decorators'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Log } from '@/LogicCore/Debug/Log'
import Sheets from '@/StorageCore/Sheets'
import AppSettings from '@/StorageCore/AppSettings'
import outsideClick from '@/GraphicCore/Directives/outside-click'
import NItem from './NItem.vue'
import { ActionTypes } from './NInput.vue'
@Component({
	props: ['pElements'],
	components: {
		NItem,
		NModal,
		Swatches,
	},
})
export default class Item extends Vue {
	els: any[] = []
	@Watch('pElements')
	changePElements(values: any[]) {
		this.els = values
	}
	changeElements() {
		this.$emit('elements-change', this.els)
	}
	set elements(values: any[]) {
		this.els = values
	}
	get elements() {
		return this.els
	}
	childrenProp: string = 'elements'
	actionType: ActionTypes = ActionTypes.nothing

	element: MatrixElementInterface.MatrixElement = {} as MatrixElementInterface.MatrixElement
	@Watch('element', { deep: true })
	async elementChange(el: MatrixElementInterface.MatrixElement) {
		const sheetsModule = getModule(Sheets, this.$store)
		switch (this.actionType) {
			case ActionTypes.changeColor:
				await sheetsModule.changeSheetColor(el)
				break

			default:
				break
		}
		this.actionType = ActionTypes.nothing
	}
	set color(value: string) {
		this.element.color = value
		this.actionType = ActionTypes.changeColor
	}
	get color() {
		return this.element.color
	}
	isColorsOpen: boolean = false
	openColors(el: MatrixElementInterface.MatrixElement) {
		this.element = el
		this.isColorsOpen = true
	}
	closeColors() {
		this.isColorsOpen = false
	}
	saveColors() {
		this.closeColors()
	}
	get isDarkTheme() {
		const module = getModule(AppSettings, this.$store)
		return module.getIsDarkTheme
	}
}
</script>

<style lang="scss"></style>
