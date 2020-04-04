<template>
	<NModal :isActive="isActive" :show-save="false" @close="close">
		<template v-slot:bookmarks>
			<div :class="'bookmark'" @click="changeTab(0)">
				<Changelog :isActive='isChangelogActive' />
			</div>
			<div :class="'bookmark'" @click="changeTab(1)" :isActive='isFeedbackActive'>
				<Feedback />
			</div>
		</template>
		<template v-slot:modalBody>
			<section class="form --has-overflow-y" v-show="isChangelogActive">
				<p class="form__p --is-centered --has-underline">
					v.0.1.0
				</p>
				<div class="form__field"></div>
				<div>(c) CozySoft (aka Arenukvern)</div>
			</section>
			<section class="form" v-show="isFeedbackActive">
				<p class="form__p --is-centered --is-iframe-google">
					<iframe
						src="https://docs.google.com/forms/d/e/1FAIpQLSfTjl0EPEtQW7I1SNexONwSOinC9t3p9gwig3ehR-w4IN-j0g/viewform?embedded=true"
						frameborder="0"
						marginheight="0"
						marginwidth="0"
						>Loading…</iframe
					>
				</p>
				<div>(c) CozySoft (aka Arenukvern)</div>
			</section>
		</template>
	</NModal>
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Log } from '@/LogicCore/Debug/Log'
import NModal from '@/GraphicCore/StatefullWidget/NModal.vue'
import AppSettings from '@/StorageCore/AppSettings'
import Changelog from '@/GraphicCore/StatelessWidget/Icons/Changelog.vue'
import Feedback from '@/GraphicCore/StatelessWidget/Icons/Feedback.vue'

@Component({
	props: ['isActive'],
	components: { NModal, Changelog, Feedback },
})
export default class ModalInfo extends Vue {
	public get isDarkTheme() {
		const module = getModule(AppSettings, this.$store)
		return module.getIsDarkTheme
	}
	isChangelogActive: boolean = false
	isFeedbackActive: boolean = true
	close() {
		this.$emit('close', false)
	}

	changeTab(el: number) {
		if (el == 0) {
			this.isChangelogActive = true
			this.isFeedbackActive = false
		}
		if (el == 1) {
			this.isFeedbackActive = true
			this.isChangelogActive = false
		}
	}
}
</script>

<style lang="scss"></style>
