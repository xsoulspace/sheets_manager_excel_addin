<template>
  <div class="home">
    <header class="header">
      <navigation-tabs
        @turn-on-settings="changeSettingsState(true)"
        :isSettingsActive="isSettingsActive"
      />
    </header>
    <settings-modal
      :isSettingsActive="isSettingsActive"
      @turn-off-settings-state="changeSettingsState(false)"
    />
    <NItems :pElements="elements" @elements-change="changeElements" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import SettingsModal from '@/GraphicCore/StatefullWidget/SettingsModal.vue'
import NavigationTabs from '@/GraphicCore/StatefullWidget/NavigationTabs.vue'
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import AppSettings from '@/StorageCore/AppSettings'
import Sheets from '@/StorageCore/Sheets'
import NItems from '@/GraphicCore/StatefullWidget/NItems.vue'
import { WorksheetsBuilder } from '../../LogicCore/APIExcel/WorksheetsBuilder'
@Component({
  components: {
    NavigationTabs,
    SettingsModal,
    NItems,
  },
})
export default class Home extends Vue {
  isSettingsActive = false
  public get elements() {
    const sheetsModule = getModule(Sheets, this.$store)
    return sheetsModule.getSheets
  }
  async changeElements(items: any[]) {
    const sheetsModule = getModule(Sheets, this.$store)
    if (!sheetsModule.isInFiltering) {
      await sheetsModule.changeSheetPosition({ items })
    }
  }
  public get isDarkTheme() {
    const module = getModule(AppSettings, this.$store)
    return module.getIsDarkTheme
  }
  changeSettingsState(value = false) {
    this.$data.isSettingsActive = value
  }
  async mounted() {
    // await this.$store.dispatch('loadWorksheets')
  }
}
</script>
<style lang="scss"></style>
