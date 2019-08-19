<template>
<div class="home">
<navigation-tabs
  @tab-settings-clicked="isSettingsActive=$event"
></navigation-tabs>
<section class="section is-paddingless">
  <nested-v2 
    :isParent="true" v-model="elements">
  </nested-v2>
</section>
<section class="section is-paddingless">
  <nested :isParent="true" class="is-no-margin-bottom" v-model="elements"></nested>
</section>


<settings-modal 
  :settingsState="isSettingsActive"
  @settings-modal-state-changed="isSettingsActive=$event">
</settings-modal>

</div>
</template>

<script>
// @ is an alias to /src
import Nested from ".././components/Widgets/SheetManager/Nested";
import NestedV2 from ".././components/Widgets/NestedV2";

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
    Nested,
    NestedV2
  },
  computed:{
    elements: {
      get: function() {
        return this.$store.getters['getNested'];
      },
      set: function (value) {
        this.$store.dispatch("updateElements", value);
      }
    }
  }
}
</script>
<style lang="scss">
.section {
  &.is-paddingless{
    padding-left: 0;
    padding-right: 0;
  }
}

</style>