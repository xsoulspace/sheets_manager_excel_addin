<template>
	<div
		:id="id"
		draggable="true"
	>
		{{name}}
		<!-- <p
			v-outsideClick="{ exclude: ['input'], handler: 'closeInput' }"
			v-show="!isInputActive"
			class="item__label"
			@click="showInput"
		>
			{{ name }}
		</p> -->
		<!-- <input ref="input" v-show="isInputActive" type="text" v-model="name" /> -->
	</div>
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Log } from '@/LogicCore/Debug/Log'
import Sheets from '@/StorageCore/Sheets'
import AppSettings from '@/StorageCore/AppSettings'
import outsideClick from '@/GraphicCore/Directives/outside-click'
@Component({
	props: ['id', 'el'],
	components: {	},
	directives: {
		outsideClick,
	},
})
export default class Item extends Vue {
	mounted() {
		this.changeEl(this.$props.el)
	}

	isInputActive: boolean = false
	showInput() {
		this.$data.isInputActive = true
	}
	closeInput() {
		this.$data.isInputActive = false
	}
	element: SheetElementsInterface.SheetElement = {} as SheetElementsInterface.SheetElement
	@Watch('el')
	changeEl(value: SheetElementsInterface.SheetElement) {
		this.$data.element = value
	}
	@Watch('element', { deep: true })
	changeElement(el: SheetElementsInterface.SheetElement) {
		this.$emit('change-element', { el, pos: this.$props.pos })
	}
	
	set name(value: string) {
		this.$data.element.name = value
	}
	get name() {
		return this.$data.element.name
	}
}
</script>

<style lang="scss"></style>
