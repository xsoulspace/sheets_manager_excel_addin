<template>
	<div :id="id" draggable="isDraggable">
		<p
			v-outsideClick="{ exclude: ['input'], handler: 'closeInput' }"
			v-show="!isInputActive"
			class="item__label"
			@click="showInput"
		>
			{{ name }}
		</p>
		<input ref="input" v-show="isInputActive" type="text" v-model="name" />
	</div>
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Log } from '@/LogicCore/Debug/Log'
import Sheets from '@/StorageCore/Sheets'
import AppSettings from '@/StorageCore/AppSettings'
import outsideClick from '@/GraphicCore/Directives/outside-click'
enum ActionTypes{
	rename,
	changeColor,
	delete,
	create,
	nothing
}
@Component({
	props: ['id', 'el'],
	components: {},
	directives: {
		outsideClick,
	},
})
export default class Item extends Vue {
	actionType: ActionTypes = ActionTypes.nothing

	mounted() {
		this.changeEl(this.$props.el)
	}
	isDraggable: boolean = true
	isInputActive: boolean = false
	showInput() {
		this.$data.isInputActive = true
		this.$data.isDraggable = false
	}
	closeInput() {
		this.$data.isInputActive = false
		this.$data.isDraggable = true
	}
	element: MatrixElementInterface.MatrixElement = {} as MatrixElementInterface.MatrixElement
	@Watch('el')
	changeEl(value: MatrixElementInterface.MatrixElement) {
		this.element = value
	}
	@Watch('element', { deep: true })
	async elementChange(el: MatrixElementInterface.MatrixElement) {
		const sheetsModule = getModule(Sheets, this.$store)
		switch (this.actionType) {
			case ActionTypes.rename:
				await sheetsModule.renameSheet(el)
				break;
		
			default:
				break;
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
}
</script>

<style lang="scss"></style>
