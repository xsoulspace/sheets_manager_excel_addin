<template>
<div :class="{'is-active':isSettingsActive}" class="modal">
  <div @click="isSettingsActive = false" class="modal-background"></div>
  <div @click.stop class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Настройки</p>
      <button @click="isSettingsActive = false" class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <label class="checkbox">
          <input type="checkbox" v-model="positioning">
          Группировка листов (все листы будут пронумерованы)
        </label>
      </div>  
      <div class="field">
        <label class="checkbox">
          <input v-model="isTouchDevice" type="checkbox">
          Адаптировать интерфейс под тач
        </label>        
      </div> 
      <div class="field">
        <button class="button" @click="clearNumeration">
          Очистить нумерацию листов (все цифры будут удалены)
        </button>        
      </div> 
    </section>
    <footer class="modal-card-foot">
      <button @click="isSettingsActive = false" class="button is-success">Применить</button>
      <button @click="isSettingsActive = false" class="button">Отменить</button>
    </footer>
  </div>
</div>
</template>
<script lang="ts">
// import enumPositioningOptions from "@/StorageCore/EnumPositioningOptions";


import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {
  },
})
export default class SettingsModal extends Vue {

}

// export default {
//   name: 'settings-modal',
//   props: {
//     settingsState: {
//       type: Boolean,
//       required: true,
//       default: false
//     }
//   },
//   methods: {
//     clearNumeration: async function(){
//       await this.$store.dispatch('clearSheetsNumeration')
//     }
//   },  
//   computed: {
//     isTouchDevice:{
//       set: function(isTouchDevice){
//         this.$store.commit('setIsTouchDevice',isTouchDevice)
//       },
//       get: function(){
//         return this.$store.getters['getIsTouchDevice']
//       }
//     },
//     positioning: {
//       set: async function(value){
//         let positioningType
//         if(value){
//           positioningType = enumPositioningOptions.numeratedGroups
//         } else {
//           positioningType = enumPositioningOptions.default
//         }
//         await this.$store.dispatch('changePositioningType',positioningType)
//       },
//       get: function(){
//         const positioningType = this.$store.getters['getPositioningType']
//         switch (positioningType) {
//           case enumPositioningOptions.default:
//             return false        
//           case enumPositioningOptions.numeratedGroups:
//             return true;
//         }
//       }
//     },  
//     isSettingsActive: {
//       set: function(value){
//         this.$emit('settings-modal-state-changed',value)
//       },
//       get: function(){
//         return this.$props.settingsState;
//       }
//     }
//   }
// }
</script>