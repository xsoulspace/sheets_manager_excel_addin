<template>
<nav class="tabs no-overflow has-tiny-margin is-small">
  <ul>
    <li  
      :class="{
        'is-tiny':!isSearchActive,
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
</template>
<script>
export default {
  name: 'navigation-tabs',
  data: function(){
    return{
      isSearchActive: false
    }
  },
  computed: {
    sheetFilter:{
      set: function(value){
        this.$store.commit('setSheetFilter', value)
      },
      get: function(){
        return this.$store.getters['getSheetFilter']
      }
    },
    isSettingsActive: {
      set: function(value){
        this.$emit('tab-settings-clicked',value)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tabs {
  &.has-tiny-margin{
    margin-bottom: 0.4rem !important;
  }
  &.no-overflow{
    overflow-x: hidden;
  }

  li {
    transition-property: width;
    transition-duration: 0.6s;
    transition-timing-function: ease-in-out;
    &.is-full-width{
      width: 100%;
    }
    &.is-tiny{
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