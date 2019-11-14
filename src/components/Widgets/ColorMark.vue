<template>
  <figure 
    @click="clicked" class="box is-leftrounded is-tinywidth is-fullheight" 
    :style="{
      'background-color': tabColor,
      'border-color': tabColor
    }">
      <!-- &nbsp; -->
  </figure>
</template>

<script>

export default {
  name: "color-mark",
  props: ['id'],
  data () {
    return {
    }
  },
  mounted: function(){
    
  },
  methods: {
    clicked:function(){
      this.$emit("color-mark-clicked")
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
  }
}
</script>

<style lang="scss" scoped>

.media-left{
  &.has-tiny-margin{
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
    }
  }
  &.has-tiny-margin:hover{
    width: 8px;
    .box:hover{
      width: 4px;
    }
  }
}

</style>