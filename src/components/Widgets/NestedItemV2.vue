<template>
<div class="media">
  <figure class="media-left has-tiny-margin is-fullheight">
    <figure class="box is-leftrounded is-tinywidth is-fullheight"></figure>
  </figure>
  <div class="media-content is-paddingfull">
    <div class="level is-mobile">
      <figure class="level-item">
        <span class="icon">
          <i class="fas fa-ellipsis-v"></i>
        </span>
      </figure>
      <div class="level-item is-clearfix">
        <div class="content is-pulled-left">
          <p>{{sheetName}}</p>
        </div>

      </div>
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
  &.is-fullheight{
    min-height: 100%
  }
  &.has-tiny-margin{
    margin-right: $margin-right;
    .box {
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