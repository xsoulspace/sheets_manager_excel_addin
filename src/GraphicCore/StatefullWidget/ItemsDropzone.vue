<template>
	<div
		:id="id"
		class="item__dropzone"
		@dragover.prevent
		@drop.prevent="drop"
		:class="{ '--is-child': isIChild }"
	>
		<ItemChild
			draggable="true"
			v-for="el in items"
			:key="el.id"
			:id="el.id"
			:el='el'
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
	get items() {
		return this.$props.children ? [...this.$props.children.values()] : []
	}
}
</script>

<style lang="scss"></style>
