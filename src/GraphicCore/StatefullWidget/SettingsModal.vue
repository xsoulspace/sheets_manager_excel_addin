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
				<div class="form">
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
					<div class="form__field">
						<label
							class="checkbox"
							:class="{ '--is-dark': isDarkTheme }"
						>
							<input
								class="checkbox__input"
								v-model="isTouchDevice"
								type="checkbox"
							/>
							Адаптировать интерфейс под тач
						</label>
					</div>
					<div class="form__field">
						<label
							class="checkbox"
							:class="{ '--is-dark': isDarkTheme }"
						>
							<input
								class="checkbox__input"
								type="checkbox"
								v-model="isDarkTheme"
							/>
							Темная тема
						</label>
					</div>
					<div class="form__field">
						<button
							class="button"
							:class="{ '--is-dark': isDarkTheme }"
							@click="clearNumeration"
						>
							Очистить нумерацию листов (все цифры будут удалены)
						</button>
					</div>
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
	_isNumerated: boolean = false
	public set isDarkTheme(value: boolean) {
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
	set isTouchDevice(val: boolean) {
		try {
			this.$data._isTouchDevice = val
		} catch (error) {
			throw Log.error('', error)
		}
	}
	get isTouchDevice() {
		try {
			return this.$data._isTouchDevice
		} catch (error) {
			throw Log.error('', error)
		}
	}
	set isNumerated(val: boolean) {
		this.$data._isNumerated = val
	}
	changeIsNumerated(){
		this.$data._isNumerated = !this.$data._isNumerated
	}
	get isNumerated() {
		return this.$data._isNumerated
	}
	turnOffSettings() {
		this.$emit('turn-off-settings-state')
	}
	async clearNumeration() {}
}
</script>
