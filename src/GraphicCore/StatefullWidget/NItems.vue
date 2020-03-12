<template>
	<div>
		<vue-nestable
			v-model="elements"
			:childrenProp="childrenProp"
			:maxDepth="2"
			:threshold="50"
			@change="changeElements"
		>
			<vue-nestable-handle slot-scope="{ item }" :item="item">
				<NItem :el="item" :id="item.id" />
			</vue-nestable-handle>
		</vue-nestable>
	</div>
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Log } from '@/LogicCore/Debug/Log'
import Sheets from '@/StorageCore/Sheets'
import AppSettings from '@/StorageCore/AppSettings'
import outsideClick from '@/GraphicCore/Directives/outside-click'
import NItem from './NItem.vue'
@Component({
	props: ['pElements'],
	components: {
		NItem,
	},
})
export default class Item extends Vue {
	els: any[] = []
	@Watch('pElements')
	changePElements(values: any[]) {
		this.els = values
	}
	changeElements() {
		this.$emit('elements-change', this.els)
	}
	set elements(values: any[]) {
		this.els = values
	}
	get elements() {
		return this.els
	}
	childrenProp: string = 'elements'
}
</script>

<style lang="scss"></style>
