<template>
<div class="draggable-item" :style="{'background-color':backgroundColor}">
  <div class="actions"
    :class="{'is-draggable': !onEdit}"
  >
    <div class="action">
      <div class="is-relative">
        <color-mark :id="id"/>
      </div>
    </div>
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
        />
      </div>
    </div>
  </div>
  <div v-show="isParent" class="children-box">
    <child-nested-items 
      :isParent="false"
      :list="realValue"
    />
  </div>
</div>
</template>
<script>
import EditableText from "./EditableText";
import ColorMark from "./ColorMark";
import hexToRgba from 'hex-to-rgba';
import ChildNestedItems from "./NestedItems";
export default {
  name:'nested-item',
  props: {
    elements: {
      type: Array,
      default: [],
      required: false
    },
    id:{
      default: "",
      required: true,
    },
    isParent: {
      type: Boolean,
      required: true,
      default: false
    },
    dragging: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data(){
    return {
      onEdit: false
    }
  },
  components: {
    EditableText,
    ColorMark,
    'child-nested-items': ()=> import('./NestedItems.vue')
  },
  methods: {
    onEditChanged: function(event){
      this.onEdit = event
    }
  },
  computed: {
    tabColor: {
      get: function(){
        return this.$store.getters['getColor'](this.id)
      },
      set: function(color){
        const id = this.id
        this.$store.dispatch('changeColorWorksheet',{id,color})
      }
    },
    sheetName:{ 
      get: function(){
        const id = this.id
        return this.$store.getters['getWorksheetName'](id) 
      },
      set: async function(name){
        const id = this.id
        await this.$store.dispatch('renameWorksheet',{id, name}) 
      }
    },
    isActive: {
      set: async function(){
        await this.$store.dispatch('selectWorksheet',this.id)
      },
      get: function(){
        return this.$store.getters['getIsActive'](this.id)
      }
    }, 
    backgroundColor: function(){
      let color;
      this.tabColor == "" ?
        color = "#ebebeb" :
        color = this.tabColor 
      let opacity;
      this.isActive ?
        opacity = "0.3" :
        opacity = "0.05"
      return hexToRgba(color, opacity)
    },
    realValue:{
      get: function(){
        return this.elements
      },
      set: function(value){
        this.$emit("child-real-value-changed",value)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$margin-right: 0.5rem;
.draggable-item{
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-left: 0.2em;
  padding-left: 0.4em;
  align-items: center;
  padding-top: 1em;
  padding-bottom: 1em;
  border-bottom-left-radius: 0.4em;
  border-bottom-right-radius: 0.4em;
  // border-bottom: 0.4px solid #dbdbdb;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  .actions{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-right: 0.3em;
    .item-name{
      &:hover{
        color: #6f6f6f;
      }
      cursor: pointer;
    }
  }

  .children-box{
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
.media-left{
  &.is-fullheight{
    min-height: 100%
  }
  &.has-tiny-margin{
    margin-right: $margin-right;
    .is-relative{
      position: relative;
      .box {
        cursor: crosshair;
        &.is-tinywidth{
          width: 1px;
          padding-left: 0.025rem;
        }
        &.is-fullheight{
          min-height: 100%
        }
        &.is-leftrounded{
          border-bottom-left-radius: 4px;
          border-top-left-radius: 4px;
          border-bottom-right-radius: 0px;
          border-top-right-radius: 0px;
        }
        &.has-position-absolute{
          position: absolute;
          left: 0; 
          top: 0; 
          bottom: 0;
        }
        &:hover{
          width: 4px;
        }
      }    
    }
  }
}
.media-content{
  &.is-paddingfull{
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}

</style>