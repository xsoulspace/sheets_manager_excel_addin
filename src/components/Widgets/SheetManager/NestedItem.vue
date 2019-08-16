<template>
  <div class="media is-tiny-margin">
    <div class="media-content">
      <div class="level is-mobile is-relative">
        <div class="level-left">
          <span class="is-child handler" v-show="!isParent">&#8226;</span>
            <color-mark :id="id"></color-mark>
            <div class="color-mark-divider"></div>        
            <div class="content has-text-left">
              <div class="level-item">

                <selector :id="id"></selector>
                <editable-text 
                  @editable-text-readonly="handleReadonly"
                  @editable-text-readonly-off="handleReadonly"
                  :isModalActive="isReadonlyModeActive"
                  :content.sync="sheetName"
                ></editable-text>
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
  </div>
</template>
<script>
import DropdownMenu from "./DropdownMenu";
import ColorMark from "./ColorMark";
//import EventBus from "../../../EventBus.js";
import Selector from "./Selector";
import EditableText from "./EditableText";
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
      isReadonlyModeActive: false
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
    Nested: ()=> import('./Nested.vue')
  },
  mounted: function(){
    this.sheetName = this.name
  },
  methods: {
    handleReadonly: function(){
      const lastValue = this.isReadonlyModeActive
      this.isReadonlyModeActive = !lastValue 
    },
    selectWorksheet: function(){
      // dispatch('selectWorksheet',{id:this.id})
      console.log("hey")
      //commit("log", 'event')
    }
  },
  computed: {
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
  width: 8px;
  position: relative;
}
.is-relative{
  position: relative;
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
  padding: 0.6rem 0.6rem 0.6rem 0.4rem;
}
span.is-child {
  content: "\2022";
  color: #949494;
}
</style>
