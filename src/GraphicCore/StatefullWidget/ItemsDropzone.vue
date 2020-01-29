<template>
	<div
		:id="id"
		class="item__dropzone"
		@dragover.prevent
		@drop.prevent="drop"
		:class="{ '--is-child': isIChild, '--has-children':hasItems}"
	>
		<ItemChild
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
@Component({
	props: ['id', 'isChild', 'children'],
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
}
</script>

<style lang="scss"></style>
