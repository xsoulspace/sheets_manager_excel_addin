<template>
  <figure 
    @click="clicked" class="action has-corner" 
    :style="{
      'border-color': tabColor
    }">
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
.left-arrow {
	border-top-color: transparent;
  border-bottom-color: transparent;
	border-style: solid;
	border-width: 0px 0px 20px 20px;
	height: 0px;
	width: 0px;
  cursor: crosshair;
}
.left-corner {
	border-style: solid;
	border-width: 0px 0px 0px 2px;
	height: auto;
	width: 0px;
  cursor: crosshair;
}
</style>