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
					<iframe
						src="https://docs.google.com/forms/d/e/1FAIpQLSfTjl0EPEtQW7I1SNexONwSOinC9t3p9gwig3ehR-w4IN-j0g/viewform?embedded=true"
						frameborder="0"
						marginheight="0"
						marginwidth="0"
						>Loading…</iframe
					>
				</p>
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
