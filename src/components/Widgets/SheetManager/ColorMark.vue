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
  float: left;
  height: 100%;
  width: 4px;
  clear: both;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;  
  border-width: 0 0 0 1px;
  border-style: solid;
}
.grey {
  background-color: rgba(54, 54, 54, 0.9);
  border-color: rgba(54, 54, 54, 0.9);

}
</style>