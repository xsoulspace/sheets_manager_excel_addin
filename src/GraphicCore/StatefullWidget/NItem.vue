<template>
	<div
		:id="id"
		class="item"
		:class="{
			'--is-dark': isDarkTheme,
			'--on-edit': isEditing,
		}"
		:draggable="isDraggable"
	>
		<NColorMark :el="el" @click="openColors" />
		<span class="item-icon">
			<i class="fas fa-ellipsis-v"></i>
		</span>
		<div>
			<NInput
				:el="el"
				@input-state-change="changeIsEditing"
				:editing="isEditing"
			/>
		</div>
		<div class="item-numeration" v-if="showNumeration" v-show="!isEditing">
			<i>{{ numerationPattern }}</i>
		</div>
	</div>
</template>

<script lang="ts">
import NColorMark from './NColorMark.vue'

import { getModule } from 'vuex-module-decorators'
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Log } from '@/LogicCore/Debug/Log'
import NInput, { ActionTypes } from './NInput.vue'
import AppSettings from '@/StorageCore/AppSettings'
import Sheets, { EditingElement } from '../../StorageCore/Sheets'

@Component({
	components: { NInput, NColorMark },
})
export default class Item extends Vue {
	//@ts-ignore
	@Prop() readonly id: number
	//@ts-ignore
	@Prop() readonly el: MatrixElementInterface.MatrixElement

	get isActive() {
		const sheetsModule = getModule(Sheets, this.$store)
		const isActive =
			this.$props.el.sourceId == sheetsModule.getActiveSheetId
		return isActive
	}
	@Watch('isActive')
	elm(isActive: boolean) {
		const item: HTMLElement | null = this.$el.parentElement!.parentElement!
			.parentElement
		if (item) {
			if (isActive) {
				item.classList.add('--is-active')
				if (this.isDarkTheme) {
					item.classList.add('--is-dark')
				}
			} else {
				item.classList.remove('--is-active')
				if (this.isDarkTheme) {
					item.classList.remove('--is-dark')
				}
			}
		}
	}

	isEditing: boolean = false
	changeIsEditing(isEditing: boolean) {
		this.isEditing = isEditing
		this.$emit('edit-change', isEditing)
	}
	get editingElement(){
		const module = getModule(Sheets, this.$store)
		return module.getEditingElement
	}
	@Watch('editingElement')
	editingElementChange(el: EditingElement){
		if(el.id == this.el.id){
			this.isEditing = el.isEditing
		}
	}
	@Watch('isDraggable')
	isDraggableChange(isDraggable: boolean) {
		const draggableHandle: HTMLElement | null = this.$el.parentElement
		draggableHandle!.setAttribute('draggable', `${isDraggable}`)
	}
	get isDraggable() {
		return !this.isEditing
	}
	get numerationPattern() {
		return this.$props.el._numerationPattern()
	}

	get isDarkTheme() {
		const module = getModule(AppSettings, this.$store)
		return module.getIsDarkTheme
	}
	openColors() {
		this.$emit('open-colors', this.$props.el)
	}
	get showNumeration() {
		const module = getModule(AppSettings, this.$store)
		return module.getShowNumeration
	}
}
</script>

<style lang="scss"></style>
