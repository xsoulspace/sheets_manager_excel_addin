<template>
  <figure 
    @click="clicked" class="action has-shadow" 
    v-hammer:tap="touched"
    :class="{'has-corner':!isTouchDevice,'is-rounded':isTouchDevice}"
    :style="{
      'border-color': tabColor,
      'background-color': tabColor
    }"
  />
</template>

<script>
export default {
  name: "color-mark",
  props: ['id','dragging'],
  data () {
    return {
      
    }
  },
  mounted: function(){
    
  },
  methods: {
    clicked:function(){
      this.$emit("color-mark-clicked")
    },
    touched(){
      if(this.isTouchDevice && !this.dragging){
        this.clicked()
      }
    }
  },
  computed: {
    tabColor: {
      get: function(){
        let localColor = '' //this.$store.getters['getColor'](this.id);
        let color
        localColor == "" ?
          color = "#4f4f4f" :
          color = localColor 
        // let opacity;
        // this.isTouchDevice ?
        //   opacity = "0.8" :
        //   opacity = "0.9"
        return color
      },
      set: function(color){
        const id = this.id
        // this.$store.dispatch('changeColorWorksheet',{id,color})
      }
    },
    isTouchDevice(){
      return false
      // return this.$store.getters['getIsTouchDevice']
    }
  }
}
</script>

<style lang="scss" scoped>

</style>