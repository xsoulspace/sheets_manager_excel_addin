<template>
<nav class="section is-paddingless">
  <div class="container">
    <div class="tabs
      is-overflowless-horizontal 
      has-tiny-paddings
      is-small">
      <ul>
        <li  
          :class="{
            'is-tinywidth':!isSearchActive,
            'is-fullwidth':isSearchActive
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
        <transition name="fade">  
          <li v-show="!isSearchActive">
            <a @click="refreshSheets">
              <span class="icon">
                <i class="fa fa-refresh"></i>
              </span>
            </a>
          </li>
        </transition>
      </ul>
    </div>
  </div>
</nav>
</template>
<script lang="ts">


import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: "navigation-tabs",
  components: {
  },
})
export default class NavigationTabs extends Vue {

}

// export default {
//   name: 'navigation-tabs',
//   props: {
//     pIsSettingsActive:{
//       required: true,
//       type: Boolean,
//       default: false
//     }
//   },
//   data: function(){
//     return{
//       isSearchActive: false
//     }
//   },
//   methods:{
//     refreshSheets: async function(){
//       await this.$store.dispatch("loadWorksheets")
//     }
//   },
//   computed: {
//     sheetFilter:{
//       set: async function(filteredWord){
//         await this.$store.dispatch('setSheetFilter', {filteredWord})
//       },
//       get: function(){
//         return this.$store.getters['getSheetFilter']
//       }
//     },
//     isSettingsActive: {
//       set: function(value){
//         this.$emit('tab-settings-clicked',value)
//       },
//       get: function(){
//         return this.pIsSettingsActive
//       }
//     }
//   }
// }
</script>
<style lang="scss" scoped>
.tabs {
  &.has-tiny-paddings{
    padding-bottom: 0.4rem;
    padding-top: 0.2rem;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
  }
  &.is-overflowless-horizontal{
    overflow-x: hidden;
  }

  li {
    transition-property: width;
    transition-duration: 0.6s;
    transition-timing-function: ease-in-out;
    &>a{
      padding-top: 0.5em;
      padding-right: 0.1em;
      padding-bottom: 0.5em;
      padding-left: 0.1em;
    }
    &.is-fullwidth{
      width: 100%;
    }
    &.is-tinywidth{
      width: 8rem;
    }
    &.fade-enter-active{
      transition: opacity 1s;
      transition-delay: 0.5s;
    }
    &.fade-leave-active {
      transition: opacity .1s;
    }
    &.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    } 
  }
}
</style>