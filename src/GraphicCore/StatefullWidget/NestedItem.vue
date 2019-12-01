<template>
<div class="draggable-item" 
  :class="{'is-draggable': !onEdit}" 
  :style="{'background-color':backgroundColor}">
  <div class="actions-flex">
    <color-mark 
      :id="id"
      @color-mark-clicked="changeColorSwitchState(true)"
      :dragging='dragging'
    />
    <div class="action">
      <span class="icon">
        <i class="fas fa-ellipsis-v"></i>
      </span>
    </div>
    <div class="action">
      <div class="item-name">
        <editable-text 
          :id="id"
          @editable-text-on-edit="onEditChanged($event)"
          :dragging='dragging'
        />
      </div>
    </div>
  </div>

  <div v-show="isParent" class="children-box">
    <child-nested-items 
      :isParent="false"
      :parentID="id"
      v-model="elements"
    />
  </div>
  <modal 
    :title="'Редактирование цвета листа.'"
    :modalState="isColorSwitchesActive"
    @modal-state-changed="changeColorSwitchState($event)"
  >
    <template v-slot:modal-body>
      <swatches v-model="tabColor" 
        colors="material-basic"
        inline
        show-fallback
        popover-to="left">
      </swatches>
    </template>
  </modal>
</div>
</template>

<script lang="ts">
import EditableText from "./EditableText.vue";
import ColorMark from "./ColorMark.vue";
// import hexToRgba from 'hex-to-rgba';
import ChildNestedItems from "./NestedItems.vue";
// import Swatches from 'vue-swatches'
import Modal from "./Modal.vue";

import NestedItems from "@/GraphicCore/StatefullWidget/NestedItems.vue";
import SettingsModal from "@/GraphicCore/StatefullWidget/SettingsModal.vue";
import NavigationTabs from "@/GraphicCore/StatefullWidget/NavigationTabs.vue";

import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {
  },
})
export default class NestedItem extends Vue {

}
// export default {
//   name:'nested-item',
//   props: {
//     el: {
//       required: false,
//       type: Object,
//     },
//     id:{
//       default: "",
//       required: true,
//     },
//     isParent: {
//       type: Boolean,
//       required: true,
//       default: false
//     },
//     dragging: {
//       type: Boolean,
//       required: false,
//       default: false
//     }
//   },
//   data(){
//     return {
//       onEdit: false,
//       isColorSwitchesActive: false
//     }
//   },
//   components: {
//     EditableText,
//     ColorMark,
//     'child-nested-items': ()=> import('./NestedItems.vue'),
//     Swatches,
//     Modal
//   },
//   methods: {
//     onEditChanged: function(event){
//       this.onEdit = event
//     },
//     changeColorSwitchState: function(newState){
//       this.isColorSwitchesActive = newState
//     },
//     updateSpecificElement: async function(elements){
//       if(!this.isParent) return
//       const obj ={
//         id: this.id,
//         elements
//       }
//       await this.$store.dispatch('updateSpecificElement',obj)
//     }
//   },
//   computed: {
//     elements: {
//       set: async function(elements){
//         if(!this.isParent) return
//         const obj ={
//           id: this.id,
//           elements
//         }
//         await this.$store.dispatch('updateSpecificElement',obj)
//       },
//       get: function(){
//         return this.el.elements
//       }
//     },
//     tabColor: {
//       get: function(){
//         return this.$store.getters['getColor'](this.id)
//       },
//       set: function(color){
//         const id = this.id
//         this.$store.dispatch('changeColorWorksheet',{id,color})
//       }
//     },
//     sheetName:{ 
//       get: function(){
//         const id = this.id
//         return this.$store.getters['getWorksheetName'](id) 
//       },
//       set: async function(name){
//         const id = this.id
//         await this.$store.dispatch('renameWorksheet',{id, name}) 
//       }
//     },
//     isActive: {
//       set: async function(){
//         await this.$store.dispatch('selectWorksheet',this.id)
//       },
//       get: function(){
//         return this.$store.getters['getIsActive'](this.id)
//       }
//     }, 
//     backgroundColor: function(){
//       let color;
//       /** need to create switch to expirement with background colors */
//       // this.tabColor == "" ?
//       //   color = "#ebebeb" :
//       //   color = this.tabColor 
//       color = "#ebebeb"
//       let opacity;
//       this.isActive ?
//         opacity = "0.4" :
//         opacity = "0.02"
//       return hexToRgba(color, opacity)
//     },
//     realValue:{
//       get: function(){
//         return this.elements
//       },
//       set: function(value){
//         this.$emit("child-real-value-changed",value)
//       }
//     }
//   }
// }
</script>
<style lang="scss" scoped>
$padding-top: 0.3em;
$padding-bottom: 0.3em;
$color-mark-width: 6px;
.draggable-item{
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-left: 0.2em;
  align-items: center;
  border-bottom-left-radius: 0.4em;
  border-bottom-right-radius: 0.4em;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 0px rgba(10, 10, 10, 0.1);
  &+&{
    margin-bottom: 0.2em;
  }
  &:first-of-type{
    margin-bottom: 0.2em;
  }
  .actions-flex{
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    margin-right: 0.3em;
    align-self: stretch;
    justify-content: space-between;
    .action{
      padding-top: $padding-top;
      padding-bottom: $padding-bottom;
      align-content: center;

      &.has-corner{
        border-style: solid;
        border-left-width: $color-mark-width;
        border-top-left-radius: 0.4em;
        border-bottom-left-radius: 0.4em;
        display: flex;
        align-self: stretch;
        cursor: crosshair;
        &:hover{
          border-left-width: 20px;
        }
        &.has-shadow{
          // https://www.cssmatic.com/box-shadow
          box-shadow: 7px 1px 9px -4px rgba(31,31,31,0.41);
        }
      }
      &.is-rounded{
        border-style: solid;
        width: 1.5em;
        border-top-left-radius: 0.4em;
        border-bottom-left-radius: 0.4em;
        border-top-right-radius: 0.4em;
        border-bottom-right-radius: 0.4em;
        display: flex;
        align-self: stretch;
        cursor: pointer;
        &.has-shadow{
          box-shadow: 3px 4px 9px -4px rgba(31,31,31,0.41);
        }
      }
      .item-name{
        cursor: pointer;
        &:hover{
          color: #6f6f6f;
        }
      }
    }
  }

  .children-box{
    padding-top: $padding-top;
    padding-bottom: $padding-bottom;
    min-width: 2em;
    min-height: 1.6em;
    border-style: dashed;
    border-width: 1px;
    border-color: #dbdbdb;
    border-radius: 4px;
    margin-right: 1.5em;
    &.filled{
      border-style: solid;
    }
  }
}
</style>