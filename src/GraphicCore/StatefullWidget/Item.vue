<template>
	<div
		:id="id"
		class="item"
		:draggable="draggable"
		@dragend="dragend"
		@dragstart="dragstart"
		@dragover.stop
		@dragover.prevent
		@drop.prevent="drop"
		:class="{ '--is-dark': isDarkTheme }"
	>
		<p
			v-outsideClick="{ exclude: ['input'], handler: 'closeInput' }"
			v-show="!isInputActive"
			class="item__label"
			@click="showInput"
		>
			{{ name }}
		</p>
		<input ref="input" v-show="isInputActive" type="text" v-model="name" />
		<ItemDropzone @changeItems='changeItems' :children="elements" id="dropzoneId" :is-child="true" />
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
	props: ['id', 'draggable', 'el', 'pos'],
	components: {
		ItemDropzone: () =>
			import('@/GraphicCore/StatefullWidget/ItemsDropzone.vue'),
	},
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
	changeItems(){
		// this.$data.el.elements = 
	}
	public get isDarkTheme() {
		const module = getModule(AppSettings, this.$store)
		return module.getIsDarkTheme
	}
	dragstart(e: any) {
		console.log('dragstart')
		const target = e.target
		e.dataTransfer.setData(
			'cardId',
			JSON.stringify({ cardId: target.id, elId: this.$props.el.id })
		)
		target.style.opacity = '0.5'
	}
	dragend(e: any) {
		console.log('dragend')
		const target = e.target
		target.style.opacity = ''
	}
	get dropzoneId() {
		return 'dropzone' + this.$props.id
	}
	set name(value: string) {
		this.$data.element.name = value
	}
	get name() {
		return this.$data.element.name
	}
	get elements(): SheetElementsInterface.EMap {
		return this.$data.element ? this.$data.element.elements : new Map()
	}
	drop(e: any) {
		console.log('drop item')
		const { cardId, elId } = JSON.parse(e.dataTransfer.getData('cardId'))
		const card = document.getElementById(cardId)
		if (card === null || card.parentNode === null) return
		if (card.id == e.target.id) return

		let c: number = 0
		const checkAndPush = (el: any) => {
			const parentNode = el.parentElement
			if (parentNode === null) return
			if (el.className == 'item' || el.className == 'item --is-dark') {
				card.parentNode!.removeChild(card)
				/** count all elements and find el*/
				const children: any[] = [...parentNode.children]
				// children.findIndex()
				const elIndex: number = (() => {
					let index: number = 0
					children.forEach((child, i) => {
						if (child.id == el.id) {
							index = i
							return
						}
					})
					return index
				})()
				console.log({ elIndex, cardId })
				console.log(this.$props.el)
				parentNode.insertBefore(card, el)
			} else {
				c++
				checkAndPush(parentNode)
			}
		}
		checkAndPush(e.target)
	}
}
</script>

<style lang="scss"></style>
