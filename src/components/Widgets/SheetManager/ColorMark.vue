<template>
  <div class="rectangular grey">
  </div>
</template>

<script>
export default {
  name: "color-mark",
  props: ['id']
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
}
.rectangular:hover{
  width: 35px;
}
.grey {
  background-color: rgba(54, 54, 54, 0.9);
  border-color: rgba(54, 54, 54, 0.9);

}
</style>