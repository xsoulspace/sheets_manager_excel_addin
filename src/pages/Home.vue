<template>
<div class="home">
<nav class="tabs has-tiny-margin is-small no-overflow">
  <ul>
    <li class="is-tiny" 
      :class="{
        'is-full-width':isSearchActive
        }">
        <input 
          v-model="sheetFilter"
          @mouseover="isSearchActive=true"
          @mouseleave="isSearchActive=false"
          class="input"
          type="text" 
          placeholder="sheet search.."
          >
    </li>
<transition name="fade">  
    <li 
      v-show="!isSearchActive"
      @click="isSettingsActive = true">
      <a>
        <span class="icon">
          <i class="fas fa-sliders-h"></i>
        </span>
      </a>
    </li>
    </transition>
<transition name="fade">  
    <li 
      v-show="!isSearchActive">
      <a>
        <span class="icon">
          <i class="fas fa-question"></i>
        </span>
      </a>
    </li>
    </transition>
<transition name="fade">  
    <li v-show="!isSearchActive">
      <a>
        <span class="icon">
          <i class="fas fa-info"></i>
        </span>
      </a>
    </li>
    </transition>
  </ul>
</nav>

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

export default {
  name: 'home',
  data(){
    return{
      isSettingsActive: false,
      isSearchActive: false
    }
  },
  mounted: function(){
    this.$store.dispatch('loadWorksheets')
  },
  methods: {
  },
  components: {
    SettingsModal,
    Nested
  },
  computed:{
    sheetFilter:{
      set: function(value){
        this.$store.commit('setSheetFilter', value)
      },
      get: function(){
        return this.$store.getters['getSheetFilter']
      }
    },
    visibilitySwitches: {
      set: function(){
        this.$store.commit('toogleVisibilitySwitchesState')
      },
      get: function(){
        return this.$store.getters['getVisibilitySwitchesState']
      }
    },
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
.nav {
  margin-top: 2px;
  margin-right: auto;
  height: 5vh;
}
.nav > .settings {
  position: absolute;
  right: 10px
}
.is-no-margin-bottom {
  margin-bottom: 0 !important;
}
.has-tiny-margin{
  margin-bottom: 0.4rem !important;
}
.is-tiny{
  width: 8rem;
} 
.is-full-width{
  width: 100%;
}
.no-overflow{
  overflow-x: hidden !important;
}
li {
  transition-property: width;
  transition-duration: 0.6s;
  transition-timing-function: ease-in-out;
}
.fade-enter-active{
  transition: opacity 1s;
  transition-delay: 0.5s;
}
.fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>