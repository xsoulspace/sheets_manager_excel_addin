<template>
<div class="icon is-small">
    <i 
      @click="toogleVisibility" 
      :class="{
        'is-active':isSelected,
        'is-passive':!isSelected
      }" 
      class="far fa-eye-slash"></i>
</div>
  
</template>

<script>
export default {
  name:"selector",
  props: ['id'],
  data(){
    return {
      isSelected: false
    }
  },
  computed:{
    isVisbile:{
      set: function(){
        this.$store.dispatch('toogleIsVisbile',{id:this.id})
      },
      get: function(){
        this.$$store.getters['getIsVisible']
      }
    }

  },
  methods: {

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