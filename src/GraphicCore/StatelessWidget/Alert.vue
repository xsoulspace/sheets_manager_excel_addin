<template>
	<div class="alert" :class="classMod">
		<div class="alert-title">{{ title }}</div>
		<div v-if="!isLoading" @click="close" class="alert-close">
			<span class="icon">
				<i class="fas fa-times"></i>
			</span>
		</div>
		<div class="alert-body" v-if="isBodyExists">
			<slot name="body"></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators'
import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator'
import { Log } from '@/LogicCore/Debug/Log'
import { AlertTypes, AlertArgs } from '@/types/SheetManager'

@Component({
	props: ['type', 'isActive', 'title'],
})
export default class Alert extends Vue {
	get isBodyExists() {
		return this.$slots.body !== undefined
	}
	get isLoading() {
		return this.$props.type == AlertTypes.loading
	}
	get classMod() {
		let classes: string = this.$props.isActive ? '--is-active ' : ''
		switch (this.$props.type) {
			case AlertTypes.danger:
				return classes + '--is-danger'
			case AlertTypes.success:
				return classes + '--is-success'
			case AlertTypes.loading:
				return classes + '--is-loading'
		}
	}
	@Emit()
	close() {
		return
	}
}
</script>

<style lang="scss"></style>
