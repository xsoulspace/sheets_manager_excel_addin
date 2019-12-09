<template>
<div class="home">
  <navigation-tabs
    @tab-settings-clicked="isSettingsActive=$event"
    :pIsSettingsActive = "isSettingsActive"
  />
  <settings-modal 
    :settingsState="isSettingsActive"
    @settings-modal-state-changed="isSettingsActive=$event"
  />
  <root-nested-items 
    :isParent="true" v-model="elements" 
  />
</div>
</template>

<script lang="ts">
// @ is an alias to /src
import NestedItems from "@/GraphicCore/StatefullWidget/NestedItems.vue";
import SettingsModal from "@/GraphicCore/StatefullWidget/SettingsModal.vue";
import NavigationTabs from "@/GraphicCore/StatefullWidget/NavigationTabs.vue";

import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {
    NavigationTabs,
    SettingsModal,
    'root-nested-items': NestedItems
  },
})
export default class Home extends Vue {
  
  private isSettingsActive: boolean = false
  
  public get elements(): Array<Object> {
    return this.$store.getters['getNested'];
  }
  public set elements(value: Array<Object>) {
    async() => {
      await this.$store.dispatch("updateElements", value)
    }
  }
  private get excelUsingInfo(): Array<Object> {
    return this.$store.getters['getNested'];
  }
  async mounted(){
    // await this.$store.dispatch('loadWorksheets')
  }
}
</script>
<style lang="scss">
.draganddrop-parent-container {
  display: flex;
  flex-flow: column nowrap;
}

</style>