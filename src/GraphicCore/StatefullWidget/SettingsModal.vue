<template>
	<NModal
		:isActive="isSettingsActive"
		@close="turnOffSettings"
		@save="turnOffSettings"
		:title="'Настройки'"
	>
		<template v-slot:modalBody>
			<div class="form" :class="{ '--is-dark': isDarkTheme }">
				<div class="form__field">
					<checkbox
						:text="
							`Группировка листов (все листы будут
								пронумерованы)`
						"
						:value="isNumerated"
						@click="changeIsNumerated"
					/>
				</div>
				<!-- <div class="form__field">
						<checkbox
							:text="`Адаптировать интерфейс под тач`"
							:value="isTouchDevice"
							@click="changeIsTouchDevice"
						/>
					</div> -->
				<div class="form__field">
					<checkbox
						:text="`Темная тема`"
						:value="isDarkTheme"
						@click="changeIsDarkTheme"
					/>
				</div>
				<div class="form__field">
					<checkbox
						:text="`Показать нумерацию`"
						:value="showNumeration"
						@click="switchNumeration"
					/>
				</div>
				<!-- <div class="form__field --is-mobile">
						<button
							class="button__box --has-border"
							:class="{ '--is-dark': isDarkTheme }"
							@click="clearNumeration"
						>
							Очистить нумерацию листов (все цифры будут удалены)
						</button>
					</div> -->
			</div>
		</template>
	</NModal>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Log } from '../../LogicCore/Debug/Log'
import { getModule } from 'vuex-module-decorators'
import AppSettings from '@/StorageCore/AppSettings'
import Checkbox from '@/GraphicCore/StatelessWidget/Checkbox.vue'
import { AlertTypes } from '../../types/SheetManager'
import NModal from './NModal.vue'
@Component({
	props: {
		isSettingsActive: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	components: { Checkbox, NModal },
})
export default class SettingsModal extends Vue {
	_isTouchDevice: boolean = false
	public changeIsDarkTheme() {
		const module = getModule(AppSettings, this.$store)
		const oldValue = module.getIsDarkTheme
		if (oldValue == true) {
			module.setTheme('base')
		} else {
			module.setTheme('dark')
		}
	}
	public get isDarkTheme() {
		const module = getModule(AppSettings, this.$store)
		return module.getIsDarkTheme
	}
	changeIsTouchDevice() {
		this.$data._isTouchDevice = !this.$data._isTouchDevice
	}
	get isTouchDevice() {
		return this.$data._isTouchDevice
	}
	async changeIsNumerated() {
		const newState = !this.isNumerated
		const title = newState ? 'Нумерации включена' : 'Нумерации отключена'
		const settings = getModule(AppSettings, this.$store)
		settings.loading(true)
		await settings.switchSheetsNumeration()
		settings.openAlert({ title, type: AlertTypes.success })
	}
	get isNumerated() {
		const settings = getModule(AppSettings, this.$store)
		return settings.getMaintainerStatuses.areSheetsHaveNumeration
	}
	turnOffSettings() {
		this.$emit('turn-off-settings-state')
	}
	switchNumeration() {
		const module = getModule(AppSettings, this.$store)
		const newState = !this.showNumeration
		module.switchShowNumeration()
		const title = newState
			? 'Видимость нумерации включена'
			: 'Видимость нумерации отключена'
		module.openAlert({ title, type: AlertTypes.success })
	}
	get showNumeration() {
		const module = getModule(AppSettings, this.$store)
		return module.getShowNumeration
	}
	async clearNumeration() {}
}
</script>
