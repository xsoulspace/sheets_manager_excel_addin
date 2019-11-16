<template>
<div class="home">
<navigation-tabs
  @tab-settings-clicked="isSettingsActive=$event"
  :pIsSettingsActive = "isSettingsActive"
>
</navigation-tabs>
  <root-nested-items 
    :isParent="true" v-model="elements" 
  />
<settings-modal 
  :settingsState="isSettingsActive"
  @settings-modal-state-changed="isSettingsActive=$event">
</settings-modal>

</div>
</template>

<script>
// @ is an alias to /src
import Nested from ".././components/Widgets/SheetManager/Nested";
import NestedItems from ".././components/Widgets/NestedItems";

import SettingsModal from "../components/Widgets/SettingsModal";
import NavigationTabs from "../components/Widgets/NavigationTabs";
export default {
  name: 'home',
  data(){
    return{
      isSettingsActive: false
    }
  },
  mounted: function(){
    this.$store.dispatch('loadWorksheets')
  },
  methods: {
  },
  components: {
    NavigationTabs,
    SettingsModal,
    'root-nested-items':NestedItems
  },
  computed:{
    elements: {
      get: function() {
        return this.$store.getters['getNested'];
      },
      set: async function (value) {
        await this.$store.dispatch("updateElements", value);
      }
    }
  }
}
</script>
<style lang="scss">
.draganddrop-parent-container {
  display: flex;
  flex-flow: column nowrap;
}

</style>