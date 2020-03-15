<template>
	<div>
		<vue-nestable
			v-model="els"
			:childrenProp="childrenProp"
			:maxDepth="depth"
			:threshold="50"
			@change="changeElements"
			:hooks="{
				beforeMove: this.nestedHooksBeforeMove,
			}"
		>
			<vue-nestable-handle slot-scope="{ item }" :item="item">
				<NItem :el="item" :id="item.id" @open-colors="openColors" />
			</vue-nestable-handle>
		</vue-nestable>
		<!-- item for intro -->
		<NItemForIntro
			v-if="introIsRunning"
			:el="testItem"
			:id="testItem.id"
			@open-colors="openColors"
		/>
		<NModal
			:isActive="isColorsOpen"
			@close="closeColors"
			@save="saveColors"
			:title="'Выбор цвета'"
			:show-save="false"
		>
			<template v-slot:modalBody>
				<swatches
					v-model="color"
					colors="material-basic"
					inline
					show-fallback
					popover-to="left"
					@close="closeColors"
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
import { MatrixElement } from '../../LogicCore/Instances/MatrixElement/MatrixElement'
import NItemForIntro from './NItemForIntro.vue'
@Component({
	props: ['pElements'],
	components: {
		NItem,
		NModal,
		Swatches,
		NItemForIntro,
	},
})
export default class Item extends Vue {
	testItem: MatrixElementInterface.MatrixElement = new MatrixElement({
		id: 'hola',
		visibility: 'Visible',
		color: '#ffffff',
		name: 'Test Item Name',
		first: 5,
		second: 0,
		delimiter: '_',
		typeOfName: '_excelSheetName',
		elements: [],
		_classTitle: 'SheetElement',
	})
	get introIsRunning() {
		const settings = getModule(AppSettings, this.$store)
		return settings.getIntroIsRunning
	}
	els: MatrixElementInterface.MEArr = []
	@Watch('pElements')
	changePElements(values: any[]) {
		this.els = values
	}
	// @Watch('els')
	changeElements(value: MatrixElementInterface.MatrixElement) {
		this.$emit('elements-change', this.els)
	}
	get depth() {
		const settings = getModule(AppSettings, this.$store)

		return settings.getMaintainerStatuses.areSheetsHaveNumeration ? 2 : 1
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
		let color = this.element.color
		if (color && color != 'undefined') {
			return color
		}
		return this.isDarkTheme ? '#e1e6e4' : '#4f4f4f'
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
	get maintenerStatuses() {
		const module = getModule(AppSettings, this.$store)
		return module.getMaintainerStatuses
	}
	get isInFiltering() {
		const module = getModule(Sheets, this.$store)
		return module.isInFiltering
	}
	/** if returns false, cancel move */
	nestedHooksBeforeMove(){
		if(this.isInFiltering) return false
		return true
	}
}
</script>

<style lang="scss"></style>
