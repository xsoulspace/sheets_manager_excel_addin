<template>
	<div
		:id="id"
		class="item__dropzone"
		@dragover.prevent
		@drop.prevent="drop"
		:class="{ '--is-child': isIChild, '--has-children':hasItems}"
	>
		<ItemChild
			@dragst='iDragstart'
			@dragt='iDragend'
			draggable="true"
			v-for="(el,index) in items"
			:key="el.id"
			:id="el.id"
			:el='el'
			:pos='index'
			@change-element='changeElement'
		/>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Log } from '@/LogicCore/Debug/Log'
// TODO: study it
//https://developer.mozilla.org/en-US/docs/Web/API/DragEvent
import { getModule } from 'vuex-module-decorators'
import Sheets from '@/StorageCore/Sheets'

@Component({
	props: ['id', 'isChild', 'children',  'parentEl'],
	components: {
		ItemChild: ()=>import('@/GraphicCore/StatefullWidget/Item.vue')
	}
})
export default class ItemsDropzone extends Vue {
	mounted(){
		this.changeChildren()
	}
	items: SheetElementsInterface.SheetElement[] = []
	drop(e: any) {
		console.log('drop dropzone', e)
		const {cardId, elId} = JSON.parse(e.dataTransfer.getData('cardId'))
		const card = document.getElementById(cardId)
		if (!card || !card.parentNode) return
		if (e.target.className.includes('item__dropzone')) {
			card.parentNode.removeChild(card)
			e.target.appendChild(card)
		}
	}
	get isIChild() {
		return this.$props.isChild ? true : false
	}
	@Watch('children')
	changeChildren() {
		this.$data.items= this.$props.children ? [...this.$props.children.values()] : []
	}
	@Watch('items',{deep: true})
	changeItems(items: SheetElementsInterface.SheetElement[]) {
		this.$emit('change-items',items)
	}
	get hasItems(){
		return this.$data.items.length > 0
	}
	changeElement({el,pos}:{el: SheetElementsInterface.SheetElement,pos: number}){
		this.$data.items[pos]=el
	}
	iDragstart(el: SheetElementsInterface.SheetElement){
		console.log(this.$props.children)
		console.log({iDragstart:'iDragstart',el})

	}
	async iDragend(el: any){
		// this.items.push(el)
		console.log({iDragend:'iDragend',el})
		
		const module = getModule(Sheets, this.$store)

		await module.changeSheetPosition({items:this.$data.items})
	}
}
</script>

<style lang="scss"></style>
