<template>
  <NModal
    :title="$t('brokenNumeration.header')"
    :isActive="isActive"
    :show-save="false"
    @close="close"
  >
    <template v-slot:modalBody>
      <p>
        {{ $t('brokenNumeration.whatWeFound') }}
      </p>
      <p>
        {{ $t('brokenNumeration.tryToRecover') }}
      </p>
      <p class="buttons">
        <button
          class="button__box --has-border"
          :class="{ '--is-dark': isDarkTheme }"
          @click="repaire(true)"
        >
          {{ $t('buttons.yes') }}
        </button>
        <button
          class="button__box --has-border"
          :class="{ '--is-dark': isDarkTheme }"
          @click="repaire(false)"
        >
          {{ $t('buttons.no') }}
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
import { Component, Vue } from 'vue-property-decorator'
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
