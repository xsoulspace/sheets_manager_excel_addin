<template>
	<div
		:id="id"
		class="item__dropzone"
		@dragover.prevent
		@drop.prevent="drop"
		:class="{ '--is-child': isIChild }"
	>
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Log } from '../../LogicCore/Debug/Log'
// TODO: study it
//https://developer.mozilla.org/en-US/docs/Web/API/DragEvent
@Component({
	props: ['id','isChild'],
})
export default class ItemsDropzone extends Vue {
	drop(e: any) {
		const cardId = e.dataTransfer.getData('cardId')
        const card = document.getElementById(cardId)
        if(!card || !card.parentNode) return
        console.log('card target',e.target.className)
		if (e.target.className.includes('item__dropzone')) {
			card.parentNode.removeChild(card)
			e.target.appendChild(card)
        }
        if (e.target.className == 'item') {
			card.parentNode.removeChild(card)
			e.target.appendChild(card)
		}
    }
    get isIChild(){
        return this.$props.isChild ? true : false
    }
}
</script>

<style lang="scss">
</style>
