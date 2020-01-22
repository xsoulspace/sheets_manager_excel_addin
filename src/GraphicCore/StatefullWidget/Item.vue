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
	>
		<slot />
		<ItemDropzone :children='elements' id="dropzoneIdchild" :is-child="true" />
	</div>
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Log } from '../../LogicCore/Debug/Log'
import Sheets from '@/StorageCore/Sheets'

@Component({
	props: ['id', 'draggable', 'el'],
	components: {
		ItemDropzone: () =>
			import('@/GraphicCore/StatefullWidget/ItemsDropzoneChild.vue'),
	},
})
export default class Item extends Vue {
	dragstart(e: any) {
		console.log('dragstart')
		const target = e.target
		e.dataTransfer.setData('cardId', target.id)
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
	get element(){
		return this.$props.el
	}
	get elements(): SheetElementsInterface.EMap{
		return this.element ? this.element.elements : new Map()
	}
	drop(e: any) {
		console.log('drop item')
		const cardId = e.dataTransfer.getData('cardId')
		const card = document.getElementById(cardId)
		if (card === null || card.parentNode === null) return
		if(card.id == e.target.id) return

		let c: number = 0
		const checkAndPush = (el: any) => {
			const parentNode = el.parentElement
			if(parentNode === null) return
			if (el.className == 'item') {
				card.parentNode!.removeChild(card)
				/** count all elements and find el*/
				const children: any[] = [...parentNode.children]
				// children.findIndex()
				const elIndex: number = (()=>{
					let index: number = 0
					children.forEach((child, i)=>{
						if(child.id == el.id) {
							index = i
							return
						} 
					})
					return index
				})()
				parentNode.insertBefore(card,el)
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
