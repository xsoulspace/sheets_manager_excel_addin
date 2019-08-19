<template>
  <div class="media is-tiny-margin">
    <div class="media-content handle">
      <div class="level is-mobile is-relative" :style="{'background-color':backgroundColor}">
        <div class="level-left">
            <color-mark 
              @color-mark-clicked="handleColorMarkClick"
              :tabColor="tabColor"
              :id="id"></color-mark>
            
            <div class="color-mark-divider"></div>  
            <dropdown-menu :id="id"></dropdown-menu>
            <div class="content has-text-left drag">
              <div class="level-item">
                
                <div class="color-mark-divider"></div>

                <editable-text
                  v-if="isEditModeActive" 
                  :id="id"
                  @editable-text-on-edit="handleEdit($event)"
                ></editable-text>
                <div 
                  v-if="!isEditModeActive"
                  @dblclick="isEditModeActive = true"
                  @click="selectWorksheet" 
                  class="has-simple-look pointer"
                  >
                  {{sheetName}}</div>
                
              </div>
            </div>
        </div>

        <div v-if="!isEditModeActive && childrenEnabled" class="level-right">
          <div class="level-item">
            <transition name="fade">              
              <nested 
                v-show="isParent" 
                :class="{'has-padding':true}" 
                :isParent="false" 
                :childrenExists="childrenExists" 
                :list="realValue">
                <template v-slot:drag-content>
                  <transition name="fade"> 
                  <i v-if="!childrenExists && isParent && dragging">место для листов</i>                    
                  </transition>
                </template>
              </nested>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <!-- modals -->

    <div v-if="!isContextMenuActive && isTextEditorActive"
      :class="{'is-active':!justCoupleWords && isTextEditorActive}" 
      class="modal"> 
      <div @click="isTextEditorActive = false" class="modal-background"></div>
      <div @click.stop class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title is-small">Редактирование названия листа..</p>
        </header>
        <section class="modal-card-body">
          <textarea class="textarea has-fullsize" rows="1" 
          v-model="sheetName"/>
        </section>
        <footer class="modal-card-foot">
          <button @click="isTextEditorActive = false" class="button is-success">Сохранить</button>
        </footer>
      </div>
    </div>

    <div v-if="!justCoupleWords && isTextEditorActive"
      :class="{'is-active':!justCoupleWords && isTextEditorActive}" 
      class="modal"> 
      <div @click="isTextEditorActive = false" class="modal-background"></div>
      <div @click.stop class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title is-small">Редактирование названия листа..</p>
        </header>
        <section class="modal-card-body">
          <textarea class="textarea has-fullsize" rows="1" 
          v-model="sheetName"/>
        </section>
        <footer class="modal-card-foot">
          <button @click="isTextEditorActive = false" class="button is-success">Сохранить</button>
        </footer>
      </div>
    </div>

    <div v-show="isColorSwitchesActive"
      :class="{'is-active':isColorSwitchesActive}" 
      class="modal"> 
      <div @click="isColorSwitchesActive = false" class="modal-background"></div>
      <div @click.stop class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title is-small">Редактирование цвета листа..</p>
        </header>
        <section class="modal-card-body">
          <swatches v-model="tabColor" 
            colors="material-basic"
            inline
            show-fallback
            popover-to="left">
          </swatches>
        </section>
        <footer class="modal-card-foot">
          <button @click="isColorSwitchesActive = false" class="button is-success">Сохранить</button>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import DropdownMenu from "./DropdownMenu";
import ColorMark from "./ColorMark";
//import EventBus from "../../../EventBus.js";
import EditableText from "./EditableText";
//https://saintplay.github.io/vue-swatches/#sub-using-a-custom-trigger
import Swatches from 'vue-swatches'
import hexToRgba from 'hex-to-rgba';
// https://www.npmjs.com/package/hex-to-rgba

export default {
  name: 'nested-item',
  props: {
    dragging: {
      default: false
    },
    id: {

    },
    value: {
      default: {}
    },
    isParent: {
      default: false
    },
    name: {
      default:""
    },
    isHovered: {
      default: false
    },
  },
  data(){
    return{
      isEditModeActive: false,
      isTextEditorActive: false,
      isColorSwitchesActive: false,
      childrenEnabled: true,
      tinyMarginEnabled: false
    }
  },
  components: {
    EditableText,
    ColorMark,
    DropdownMenu,
    Swatches,
    Nested: ()=> import('./Nested.vue')
  },
  mounted: function(){
    this.sheetName = this.name
  },
  methods: {
    handleColorMarkClick:function(){
      this.isColorSwitchesActive=true
    },
    handleEdit: function($event){
      this.isEditModeActive = $event
    },
    selectWorksheet: function(){
      this.$store.dispatch('selectWorksheet',this.id)
    }
  },
  watch:{

  },
  computed: {
    isVisibilitySwitchesActive: function(){
      return this.$store.getters['getVisibilitySwitchesState']
    },
    sheetName:{ 
      get: function(){
        const id = this.id
        return this.$store.getters['getWorksheetName'](id) 
      },
      set: function(name){
        const id = this.id
        this.$store.dispatch('renameWorksheet',{id, name}) 
      }
    },
    isActive: function(){
      return this.$store.getters['getIsActive'](this.id)
    },
    backgroundColor: function(){
      var color;
      this.tabColor == "" ?
        color = "#ebebeb" :
        color = this.tabColor 
      var opacity;
      this.isActive ?
        opacity = "0.3" :
        opacity = "0.05"
      return hexToRgba(color, opacity)
    },
    tabColor: {
      get: function(){
        return this.$store.getters['getColor'](this.id)
      },
      set: function(color){
        const id = this.id
        this.$store.dispatch('changeColorWorksheet',{id,color})
      }
    },
    justCoupleWords: function(){
      const state = this.sheetName.split(" ").length<=3
      // if (this.isEditModeActive == true && state != true){
      //   this.isTextEditorActive =true
      // }
      return state
    },
    childrenExists: function(){
      return Object.keys(this.value).length > 0
    },
    realValue() {
      return this.value;
    }
  }
}
</script>
<style lang="scss" scoped>
.color-mark-divider{
  width: 10px;
  position: relative;
}
.is-relative{
  position: relative;
  border-radius: 4px;
  height: 2.4rem;
}
.modal-card-title.is-small {
  font-size: 1em;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.has-fullsize{
  height: 65vh !important;
}
.media-content {
  overflow-x: hidden;
  overflow-y: hidden;
}
.media.is-tiny-margin + .media.is-tiny-margin {
    margin-top: 0.3rem;
    padding-top: 0.1rem;
    border-top: 1px solid rgba(219, 219, 219, 0.5);
    display: flex;
}
.media .media:first-child {
  border-top: none;
  padding-top: 0rem;
}
.media .box.has-padding {
  padding: 1rem 0.6rem 1rem 0.4rem;
}
span.is-child {
  content: "\2022";
  color: #949494;
}

.fill-height {
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
}

.has-simple-look,
.has-simple-look:focus, 
.has-simple-look:active,
.has-simple-look:hover{
    border-color: rgba(255, 255, 255,0.5);
    border-radius: unset;
    box-shadow: none;
    box-sizing: border-box;
    max-width: auto;
    padding-left: 0px;
    padding-right: 0px; 
}
.pointer{
  cursor: pointer;
}
.crosshair{
  cursor: crosshair;
}
.drag{
  cursor: move;
}
</style>
