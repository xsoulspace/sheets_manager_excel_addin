<template>
	<div
		:id="id"
		draggable="isDraggable"
		class="item"
		:class="{
			'--is-dark': isDarkTheme,
			'--on-edit': onEdit,
		}"
	>
		<NColorMark :el="el" @click="openColors" />
		<span class="item-icon">
			<i class="fas fa-ellipsis-v"></i>
		</span>
		<div>
			<NInput
				:el="el"
				:is-draggable="isDraggable"
				@draggable-change="changeDraggable"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import NColorMark from './NColorMark.vue'

import { getModule } from 'vuex-module-decorators'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Log } from '@/LogicCore/Debug/Log'
import NInput, { ActionTypes } from './NInput.vue'
import AppSettings from '@/StorageCore/AppSettings'
import Sheets from '../../StorageCore/Sheets'

@Component({
	props: ['id', 'el'],
	components: { NInput, NColorMark },
})
export default class Item extends Vue {
	get isActive() {
		const sheetsModule = getModule(Sheets, this.$store)
		const isActive =
			this.$props.el.sourceId == sheetsModule.getActiveSheetId
		return isActive
	}
	@Watch('isActive')
	elm(isActive: boolean) {

		const item: HTMLElement | null  = this.$el.parentElement!.parentElement!.parentElement
		if(item){
			if(isActive){
				item.classList.add("--is-active");
				if(this.isDarkTheme){
					item.classList.add("--is-dark");
				}
			} else {
				item.classList.remove("--is-active");
				if(this.isDarkTheme){
					item.classList.remove("--is-dark");
				}
			}
		}
	}
	isDraggable: boolean = true
	get onEdit() {
		return !this.isDraggable
	}
	changeDraggable(newValue: boolean) {
		this.isDraggable = newValue
	}
	get isDarkTheme() {
		const module = getModule(AppSettings, this.$store)
		return module.getIsDarkTheme
	}
	openColors() {
		this.$emit('open-colors', this.$props.el)
	}
}
</script>

<style lang="scss"></style>
