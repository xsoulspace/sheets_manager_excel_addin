<template>
<div class="media">
  <figure class="media-left has-tiny-margin">
    <div class="level is-mobile">
      <div class="level-item">
        <figure class="box is-leftrounded is-tinywidth"></figure>
      </div>
      <div class="level-item">
        <span class="icon">
          <i class="fas fa-ellipsis-v"></i>
        </span>
      </div>
    </div>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>{{sheetName}}</p>
    </div>
  </div>
  <div class="media-right">

  </div>
</div>
</template>
<script>
export default {
  name:'nested-item-v2',
  props: {
    elements: {
      type: Array,
      default: [],
      required: false
    },
    id:{
      default: "",
      type: String,
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
  computed: {
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
  }
}
</script>
<style lang="scss" scoped>
$margin-right: 0.5rem;
.media-left{
  &.has-tiny-margin{
    margin-right: $margin-right;
    .level {
      &.is-mobile{
        &:not(:last-child){  
          margin-right: $margin-right;
        }
        .level-item {
          &:not(:last-child){
            margin-right: $margin-right;
          }
          .box {
            &.is-tinywidth{
              width: 1px;
              padding-left: 0.025rem;
            }
            &.is-leftrounded{
              border-bottom-left-radius: 4px;
              border-top-left-radius: 4px;
              border-bottom-right-radius: 0px;
              border-top-right-radius: 0px;
            }
          }
        }
      }
    }
  }
}
</style>