<template>
	<NModal
		:title="'Восстановление нумерации'"
		:isActive="isActive"
		:show-save="false"
		@close="close"
	>
		<template v-slot:modalBody>
			<p>
				Мы обнаружили, что у части листов есть нумерация.
			</p>
			<p>
				Попробовать восстановить нумерацию?
			</p>
			<p class="buttons">
				<button
					class="button__box --has-border"
					:class="{ '--is-dark': isDarkTheme }"
					@click="repaire(true)"
				>
					Да
				</button>
				<button
					class="button__box --has-border"
					:class="{ '--is-dark': isDarkTheme }"
					@click="repaire(false)"
				>
					Нет
				</button>
			</p>

			<!-- <section>
				<p>В чем преимущество нумерации?</p>
			</section> -->
		</template>
	</NModal>
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Log } from '@/LogicCore/Debug/Log'
import NModal from '@/GraphicCore/StatefullWidget/NModal.vue'
import AppSettings from '../../StorageCore/AppSettings'
@Component({
	props: ['isActive'],
	components: { NModal },
})
export default class ModalBrokenNavigation extends Vue {
	public get isDarkTheme() {
		const module = getModule(AppSettings, this.$store)
		return module.getIsDarkTheme
	}
	repaire(value: boolean) {
		this.$emit('repaire-answer', value)
	}
	close() {
		this.$emit('repaire-answer', false)
	}
}
</script>

<style lang="scss"></style>
