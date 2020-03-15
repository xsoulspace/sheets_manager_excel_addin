<template>
	<NModal
		:title="'Информация'"
		:isActive="isActive"
		:show-save="false"
		@close="close"
	>
		<template v-slot:modalBody>
			<section class="form">
				<p class="form__p --is-centered">
					Если у вас есть предложения или замечания - просто напишите
					об этом ниже
				</p>
				<textarea
					class="textarea"
					cols="30"
					rows="10"
					autocomplete="on"
				></textarea>
				<div class="form__p">email:</div>
				<textarea
					class="textarea --like-input"
					cols="30"
					rows="1"
					autocomplete="on"
					maxlength="40"
				></textarea>
				<div class="buttons">
					<button
						class="button --has-border"
						:class="{ '--is-dark': isDarkTheme }"
					>
						Отправить
					</button>
				</div>
				<div>(c) CozySoft (aka Arenukvern:)</div>
			</section>
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
export default class ModalInfo extends Vue {
	public get isDarkTheme() {
		const module = getModule(AppSettings, this.$store)
		return module.getIsDarkTheme
	}
	close() {
		this.$emit('close', false)
	}
}
</script>

<style lang="scss"></style>
