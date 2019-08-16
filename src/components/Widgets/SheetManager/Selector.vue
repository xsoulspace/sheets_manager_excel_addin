<template>
<div class="icon is-small" @click="selectWorksheet">
    <i 
      @click="selectWorksheet" 
      :class="{
        'is-active':isSelected,
        'is-passive':!isSelected
      }" 
      class="fas fa-circle"></i>
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
  methods: {
    selectWorksheet: function(){
      this.$store.dispatch('selectWorksheet',{id:this.id})
      this.isSelected=true;
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