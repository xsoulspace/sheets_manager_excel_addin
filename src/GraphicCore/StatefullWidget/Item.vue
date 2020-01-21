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
		<ItemDropzone id="dropzoneId" :is-child="true" />
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Log } from '../../LogicCore/Debug/Log'
@Component({
	props: ['id', 'draggable'],
	components: {
		ItemDropzone: () =>
			import('@/GraphicCore/StatefullWidget/ItemsDropzone.vue'),
	},
})
export default class Item extends Vue {
	dragstart(e: any) {
		const target = e.target
		e.dataTransfer.setData('cardId', target.id)
		target.style.opacity = '0.5'
	}
	dragend(e: any) {
		const target = e.target
		target.style.opacity = ''
	}
	get dropzoneId() {
		return 'dropzone' + this.$props.id
	}
	drop(e: any) {
		const cardId = e.dataTransfer.getData('cardId')
		const card = document.getElementById(cardId)
		if (!card || !card.parentNode) return

		if(card.id == e.target.id) return
		let c: number = 0
		const checkAndPush = (el: any) => {
			if (el.className == 'item') {
				card.parentNode!.removeChild(card)
				el.parentNode.insertBefore(card,el)
			} else {
				c++
				checkAndPush(el.parentNode)
			}
		}
		checkAndPush(e.target)
	}
}
</script>

<style lang="scss"></style>
