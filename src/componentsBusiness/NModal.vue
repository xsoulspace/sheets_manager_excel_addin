<template>
  <div
    :class="{ '--is-active': isActive }"
    class="modal"
    @click="turnOffCancel"
  >
    <div
      ref="card"
      @click.stop
      class="modal__card"
      :class="{ '--is-dark': isDarkTheme }"
    >
      <header class="modal__card-head">
        <div class="modal__bookmarks" v-if="isBookmarksActive">
          <slot name="bookmarks" />
        </div>
        <div class="modal__card-save" @click="turnOffSave" v-if="showSave">
          <span class="icon --has-accent" :class="{ '--is-dark': isDarkTheme }">
            <i class="fas fa-save"></i>
          </span>
        </div>

        <p class="modal__card-title --has-accent">{{ title }}</p>
        <div class="modal__card-close" @click="turnOffCancel" v-if="showClose">
          <span class="icon --has-accent" :class="{ '--is-dark': isDarkTheme }">
            <i class="fas fa-times"></i>
          </span>
        </div>
      </header>
      <section class="modal__card-body">
        <slot name="modalBody" />
      </section>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Log } from '../../LogicCore/Debug/Log'
import { getModule } from 'vuex-module-decorators'
import AppSettings from '@/StorageCore/AppSettings'
import Checkbox from '@/GraphicCore/StatelessWidget/Checkbox.vue'
@Component({
  props: {
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
  components: { Checkbox },
})
export default class NModal extends Vue {
  get isBookmarksActive() {
    return this.$slots['bookmarks'] !== undefined
  }
  bookmarkClicked(el: number) {
    this.$emit('b-click', el)
  }

  //@ts-ignore
  @Prop({ required: false, default: true }) readonly showSave: boolean
  //@ts-ignore
  @Prop({ required: false, default: true }) readonly showClose: boolean

  public get isDarkTheme() {
    const module = getModule(AppSettings, this.$store)
    return module.getIsDarkTheme
  }
  turnOffCancel() {
    this.$emit('close')
  }
  turnOffSave() {
    this.$emit('save')
  }
}
</script>
