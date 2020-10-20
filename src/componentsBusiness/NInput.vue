<template>
	<p
		v-if="!isInputActive"
		@dblclick.prevent="edit"
		@click.prevent="selectWorksheet"
		v-touch:longtap="edit"
		v-touch:tap="selectWorksheet"
		class="item-name"
	>
		{{ name }}
	</p>
	<div v-else-if="isInputActive">
		<input
			ref="input"
			:maxlength="maxLength"
			@keydown.enter="closeEdit"
			v-outsideClick="{
				exclude: ['input'],
				handler: 'closeEdit',
			}"
			type="text"
			class="item-input"
			v-model="name"
		/>
		<div v-if="isWarningShown" class="item-input-warning">
			{{ $t('item.nameCannotBeEmpty') }}
		</div>
	</div>
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators'
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Log } from '@/LogicCore/Debug/Log'
import Sheets from '@/StorageCore/Sheets'
import AppSettings from '@/StorageCore/AppSettings'
import outsideClick from '@/GraphicCore/Directives/outside-click'
export enum ActionTypes {
	rename,
	changeColor,
	delete,
	create,
	nothing,
}
@Component({
	components: {},
	directives: {
		outsideClick,
	},
})
export default class Input extends Vue {
	//@ts-ignore
	@Prop() readonly el: MatrixElementInterface.MatrixElement
	//@ts-ignore
	@Prop({ required: true }) readonly editing: boolean
	@Watch('editing')
	editingChange(isEditing: boolean) {
		this.isEditing = isEditing
	}
	actionType: ActionTypes = ActionTypes.nothing
	maxLength: number = 26
	isEditing: boolean = false
	@Watch('isEditing')
	async isEditingChange(newValue: boolean, oldValue: boolean) {
		if (newValue !== oldValue) {
			if (newValue) {
				this.showInput()
				await this.$nextTick(() => {
					const el = <HTMLInputElement>this.$refs.input
					console.log(el)
					el.focus()
					el.select()
				})
			} else {
				await this.closeInput()
			}
		}
	}
	edit() {
		this.isEditing = true
	}
	closeEdit() {
		this.isEditing = false
	}
	mounted() {
		this.changeEl(this.$props.el)
		this.editingChange(this.editing)
	}
	isInputActive: boolean = false
	showInput() {
		this.$data.isInputActive = true
		this.$emit('input-state-change', true)
	}
	async closeInput() {
		this.$data.isInputActive = false
		await this.elementChange(this.element)
		this.$emit('input-state-change', false)
	}

	element: MatrixElementInterface.MatrixElement = {} as MatrixElementInterface.MatrixElement
	@Watch('el')
	changeEl(value: MatrixElementInterface.MatrixElement) {
		this.element = value
	}
	// @Watch('element', { deep: true })
	async elementChange(el: MatrixElementInterface.MatrixElement) {
		const sheetsModule = getModule(Sheets, this.$store)
		switch (this.actionType) {
			case ActionTypes.rename:
				await sheetsModule.renameSheet(el)
				break

			default:
				break
		}
		this.actionType = ActionTypes.nothing
	}
	isWarningShown: boolean = false
	set name(value: string) {
		if (value.length <= 0) {
			this.isWarningShown = true
			return
		} else {
			this.isWarningShown = false
		}
		this.element.encodedName = value
		this.actionType = ActionTypes.rename
	}
	get name() {
		return this.element.decodedName
	}
	async selectWorksheet() {
		const sheetsModule = getModule(Sheets, this.$store)
		await sheetsModule.selectSheet(this.$props.el.sourceId)
	}
}
</script>

<style lang="scss"></style>
