<template>
	<div>
		<vue-nestable
			v-model="nestableItems"
			:childrenProp="childrenProp"
			:MaxDepth="2"
			:threshold="4"
		>
			<vue-nestable-handle slot-scope="{ item }" :item="item">
				{{ item.text }}
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

@Component({})
export default class Item extends Vue {
	childrenProp: string = 'elements'
	nestableItems: any[] = [
		{
			id: 0,
			text: 'Andy',
		},
		{
			id: 1,
			text: 'Harry',
			elements: [
				{
					id: 2,
					text: 'David',
				},
			],
		},
		{
			id: 3,
			text: 'Lisa',
		},
	]
}
</script>

<style lang="scss"></style>
