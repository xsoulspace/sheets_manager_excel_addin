<template>
  <span class="icon">
    <i @mouseover.capture="selectWorksheet" class="fas fa-circle"></i>
  </span>
</template>

<script>
export default {
  name:"selector",
  props: ['id'],
  methods: {
    selectWorksheet: function(){
      dispatch('selectWorksheet',{id:this.id})
    }
  }
}
</script>