<template>
	<div
		:class="{ '--is-active': isSettingsActive }"
		class="modal"
		@click="turnOffSettings"
	>
		<div
			ref="card"
			@click.stop
			class="modal__card"
			:class="{ '--is-dark': isDarkTheme }"
		>
			<header class="modal__card-head">
				<p class="modal-card-title --has-accent">Настройки</p>
				<div class="modal__card-close" @click="turnOffSettings">
					<span
						class="icon --has-accent"
						:class="{ '--is-dark': isDarkTheme }"
					>
						<i class="fas fa-times"></i>
					</span>
				</div>
				<div class="modal__card-save" @click="turnOffSettings">
					<span
						class="icon --has-accent"
						:class="{ '--is-dark': isDarkTheme }"
					>
						<i class="fas fa-save"></i>
					</span>
				</div>
			</header>
			<section class="modal__card-body">
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
			</section>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Log } from '../../LogicCore/Debug/Log'
import { getModule } from 'vuex-module-decorators'
import AppSettings from '@/StorageCore/AppSettings'
import Checkbox from '@/GraphicCore/StatelessWidget/Checkbox.vue'
@Component({
	props: {
		isSettingsActive: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	components: { Checkbox },
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
		const settings = getModule(AppSettings, this.$store)
		await settings.switchSheetsNumeration()
	}
	get isNumerated() {
		const settings = getModule(AppSettings, this.$store)
		return settings.getMaintainerStatuses.areSheetsHaveNumeration
	}
	turnOffSettings() {
		this.$emit('turn-off-settings-state')
	}
	switchNumeration(){
		const module = getModule(AppSettings, this.$store)
		module.switchShowNumeration()
	}
	get showNumeration(){
		const module = getModule(AppSettings, this.$store)
		return module.getShowNumeration
	}
	async clearNumeration() {}
}
</script>
