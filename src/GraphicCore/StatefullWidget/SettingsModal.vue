<template>
	<div :class="{ 'is-active': isSettingsActive }" class="modal">
		<div @click="turnOffSettings" class="modal-background"></div>
		<div @click.stop class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Настройки</p>
				<button
					@click="turnOffSettings"
					class="delete"
					aria-label="close"
				></button>
			</header>
			<section class="modal-card-body">
				<div class="field">
					<label class="checkbox">
						<input type="checkbox" v-model="isNumerated" />
						Группировка листов (все листы будут пронумерованы)
					</label>
				</div>
				<div class="field">
					<label class="checkbox">
						<input v-model="isTouchDevice" type="checkbox" />
						Адаптировать интерфейс под тач
					</label>
				</div>
				<div class="field">
					<button class="button" @click="clearNumeration">
						Очистить нумерацию листов (все цифры будут удалены)
					</button>
				</div>
			</section>
			<footer class="modal-card-foot">
				<button @click="turnOffSettings" class="button is-success">
					Применить
				</button>
				<button @click="turnOffSettings" class="button">
					Отменить
				</button>
			</footer>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Log } from '../../LogicCore/Debug/Log'
@Component({
	props: {
		isSettingsActive: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	components: {},
})
export default class SettingsModal extends Vue {
	_isSettingsActive: boolean = false
	_isTouchDevice: boolean = false
	_isNumerated: boolean = false
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
	get isNumerated() {
		return this.$data._isNumerated
	}
	turnOffSettings() {
		this.$data._isSettingsActive = false
		this.$emit('settings-modal-state-changed', false)
	}
	async clearNumeration() {}
}

</script>
