<template>
<div 
  @click="toogleVisibility" 
  class="icon is-small pointer" :class="{
    'is-active':!isVisible,
    'is-passive':isVisible
  }" >
    <i class="far fa-eye-slash"></i>
</div>
  
</template>

<script>
export default {
  name:"selector",
  props: ['id'],
  data(){
    return {
      isVisible: true
    }
  },
  computed:{
    visibility:{
      set: function(value){
        this.$store.dispatch('toogleWorksheetVisibility',{id:this.id, isVisible: value})
      },
      get: function(){
        if(this.$store.getters['getIsVisible'](this.id) == "Visible"){
          this.isVisible= true
        } else {
          this.isVisible= false
        }
        return this.$store.getters['getIsVisible'](this.id);
      }
    }

  },
  methods: {
    toogleVisibility: function(){
      if(this.visibility == "Visible") {
        this.visibility = "Hidden"
        this.isVisible = false
      }else{
        this.visibility = "Visible"
        this.isVisible = true
      }

    }
  }
}
</script>
<style lang="scss" scoped>
.icon.is-tiny{
  width: 0.5rem;
  height:0.5rem;
}
.is-active{
  color: rgba(54, 54, 54, 0.9);
}
.is-passive{
  color: rgba(54, 54, 54, 0.144);
}
</style>