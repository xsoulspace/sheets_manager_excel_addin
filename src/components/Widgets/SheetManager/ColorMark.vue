<template>
  <div 
    @click="clicked" class="rectangular" 
    :style="{
      'background-color': tabColor,
      'border-color': tabColor
    }">
  </div>
</template>

<script>

export default {
  name: "color-mark",
  props: ['id','tabColor'],
  data () {
    return {
    }
  },
  mounted: function(){
    
  },
  methods: {
    clicked:function(){
      console.log(this.tabColor)
      this.$emit("color-mark-clicked")
    }
  }
}
</script>

<style lang="scss" scoped>
.rectangular {
  position: absolute;
  left: 0; 
  top: 0; 
  bottom: 0;
  width: 6px;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;  
  border-width: 0 0 0 1px;
  border-style: solid;
  background-color: rgba(54, 54, 54, 0.9);
  border-color: rgba(54, 54, 54, 0.9);
  cursor: crosshair;
}
.rectangular:hover{
  width: 2rem;
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
}

</style>