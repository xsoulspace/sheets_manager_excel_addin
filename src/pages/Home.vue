<template>
<div class="home">

<navigation-tabs
  @tab-settings-clicked="isSettingsActive=$event"
></navigation-tabs>

<div class="level has-tiny-margin">
  <div class="level-item">
  </div>
  <div class="level-item">
  </div>
</div>
<nested :isParent="true" class="is-no-margin-bottom" v-model="elements"></nested>

<settings-modal 
  :settingsState="isSettingsActive"
  @settings-modal-state-changed="isSettingsActive=$event">
</settings-modal>

</div>
</template>

<script>
// @ is an alias to /src
import Nested from ".././components/Widgets/SheetManager/Nested";
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
    Nested
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
.is-no-margin-bottom {
  margin-bottom: 0 !important;
}
</style>