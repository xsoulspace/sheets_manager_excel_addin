<template>
  <div class="media is-tiny-margin">
    <span class="is-child" v-show="!isParent">~~ </span>
    <div class="media-content">
      <div class="level is-mobile is-relative" :style="{'background-color':backgroundColor}">
        <div class="level-left">
            <color-mark 
              @color-mark-clicked="handleColorMarkClick"
              :tabColor="tabColor"
              :class="{'handle':!isEditModeActive}" 
              :id="id"></color-mark>
            <div class="color-mark-divider"></div>        
            <div class="content has-text-left">
              <div class="level-item">
                <selector :id="id"></selector>
                <div class="color-mark-divider"></div> 
                <editable-text
                  v-if="isEditModeActive" 
                  :id="id"
                  @editable-text-readonly="handleReadonly"
                  @editable-text-readonly-off="handleReadonly"
                  :isModalActive="isReadonlyModeActive"
                  :content.sync="sheetName"
                ></editable-text>
                <div 
                  @dblclick="isEditModeActive = true"
                  @click="selectWorksheet" 
                  class="has-simple-look" 
                  v-if="!isEditModeActive">
                  {{sheetName}}</div>
                <!-- <dropdown-menu :id="id"></!-->
              </div>
            </div>
        </div>
        <div v-show="!isReadonlyModeActive" class="level-right">
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
    <div v-if="!justCoupleWords && isReadonlyModeActive"
      :class="{'is-active':!justCoupleWords && isReadonlyModeActive}" 
      class="modal"> 
      <div @click="isReadonlyModeActive = false" class="modal-background"></div>
      <div @click.stop class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title is-small">Редактирование названия листа..</p>
        </header>
        <section class="modal-card-body">
          <textarea class="textarea has-fullsize" rows="1" 
          v-model="sheetName"/>
        </section>
        <footer class="modal-card-foot">
          <button @click="isReadonlyModeActive = false" class="button is-success">Сохранить</button>
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
import Selector from "./Selector";
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
      sheetName:  "",
      isReadonlyModeActive: false,
      isColorSwitchesActive: false,
    }
  },
  watch: {
    sheetName: function(name){
      const id = this.id
      this.$store.dispatch('renameWorksheet',{id, name}) 
    }
  },
  components: {
    EditableText,
    Selector,
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
    handleReadonly: function(){
      const lastValue = this.isReadonlyModeActive
      this.isReadonlyModeActive = !lastValue 
    },
    selectWorksheet: function(){
      this.$store.dispatch('selectWorksheet',{id:this.id})
    }
  },
  computed: {
    isActive: function(){
      return this.$store.getters['getIsActive'](this.id)
    },
    backgroundColor: function(){
      let opacity;
      this.isActive ?
        opacity = "0.3" :
        opacity = "0.05"
      // this.store.commit('log', opacity)
      return hexToRgba(this.tabColor, opacity)
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
    isEditModeActive: {
      set: function(){
        this.$store.commit('toogleEditMode')
      },
      get: function(){
        return this.$store.getters['getEditMode']
      }
    },
    justCoupleWords: function(){
      return this.sheetName.split(" ").length<=3
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
.has-simple-look,
.has-simple-look:focus, 
.has-simple-look:active,
.has-simple-look:hover{
    border-color: rgba(255, 255, 255,0.5);
    border-radius: unset;
    box-shadow: none;
    box-sizing: border-box;
    max-width: 130px;
    padding-left: 0px;
    padding-right: 0px; 
}
</style>
