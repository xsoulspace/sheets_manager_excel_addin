<template>
	<figure
		@click="clicked"
		class="item-color"
		v-touch:tap="touched"
		:class="{ '--has-corner': !isTouchDevice, '--is-rounded': isTouchDevice }"
		:style="{
			'border-color': tabColor,
			'background-color': tabColor,
		}"
	/>
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Log } from '@/LogicCore/Debug/Log'
import Sheets from '@/StorageCore/Sheets'
import AppSettings from '@/StorageCore/AppSettings'
@Component({
	props: ['el'],
	components: {},
})
export default class NColorMark extends Vue {
	get tabColor() {
		let localColor: MatrixElementInterface.MatrixElement['color'] = this.$props.el.color
		let color
		!localColor || localColor.length == 0 ? (color = '' ) : (color = localColor)
		// let opacity;
		// this.isTouchDevice ?
		//   opacity = "0.8" :
		//   opacity = "0.9"
		return color
	}
	clicked() {
		this.$emit('click')
	}
	touched() {
		if (this.isTouchDevice) {
			this.clicked()
		}
	}
	get isTouchDevice() {
		return false
		// return this.$store.getters['getIsTouchDevice']
	}
}
</script>

<style lang="scss"></style>
