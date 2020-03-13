<template>
	<p
		v-if="!isInputActive"
		@dblclick.prevent="edit"
		@click.prevent="selectWorksheet"
		v-touch:longtap="edit"
		v-touch:tap="selectWorksheet"
	>
		{{ name }}
	</p>
	<input
		ref="input"
		:maxlength="maxLength"
		v-else-if="isInputActive"
		@click="edit"
		v-touch:tap="edit"
		@keydown.enter="closeEdit"
		v-outsideClick="{
			exclude: ['input'],
			handler: 'closeEdit',
		}"
		type="text"
		class="item-input"
		v-model="name"
	/>
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Log } from '@/LogicCore/Debug/Log'
import Sheets from '@/StorageCore/Sheets'
import AppSettings from '@/StorageCore/AppSettings'
import outsideClick from '@/GraphicCore/Directives/outside-click'
export enum ActionTypes {
	rename,
	changeColor,
	delete,
	create,
	nothing,
}
@Component({
	props: ['el', 'isDraggable'],
	components: {},
	directives: {
		outsideClick,
	},
})
export default class Item extends Vue {
	actionType: ActionTypes = ActionTypes.nothing
	maxLength: number = 26
	onEdit: boolean = false
	@Watch('onEdit')
	async onEditChange(newValue: boolean, oldValue: boolean) {
		if (newValue !== oldValue) {
			if (newValue) {
				this.showInput()
			} else {
				await this.closeInput()
			}
		}
	}
	edit() {
		this.onEdit = true
	}
	closeEdit() {
		this.onEdit = false
	}
	mounted() {
		this.changeEl(this.$props.el)
	}
	isInputActive: boolean = false
	showInput() {
		this.$data.isInputActive = true
		this.$emit('draggable-change', false)
	}
	async closeInput() {
		this.$data.isInputActive = false
		await this.elementChange(this.element)
		this.$emit('draggable-change', true)
	}

	element: MatrixElementInterface.MatrixElement = {} as MatrixElementInterface.MatrixElement
	@Watch('el')
	changeEl(value: MatrixElementInterface.MatrixElement) {
		this.element = value
	}
	// @Watch('element', { deep: true })
	async elementChange(el: MatrixElementInterface.MatrixElement) {
		const sheetsModule = getModule(Sheets, this.$store)
		switch (this.actionType) {
			case ActionTypes.rename:
				await sheetsModule.renameSheet(el)
				break

			default:
				break
		}
		this.actionType = ActionTypes.nothing
	}

	set name(value: string) {
		this.element.encodedName = value
		this.actionType = ActionTypes.rename
	}
	get name() {
		return this.element.decodedName
	}
	async selectWorksheet() {
		const sheetsModule = getModule(Sheets, this.$store)
		
	}
}
</script>

<style lang="scss"></style>
