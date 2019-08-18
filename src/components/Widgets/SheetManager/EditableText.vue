<template>
<input 
    @mouseout="onEdit=false"
    @mouseleave="onEdit=false"
    @keydown.enter="onEdit=false"
    type="text"
    class="input has-simple-look handle on-edit"
    v-model="sheetName"
    >
</template>


<script>
export default {
  name: "editable-text",
  props: ['id'],
  data(){
    return {
        onEdit: true
    }
  },
  mounted: function () {
  },
  watch: {
    onEdit: function(value){
      this.$emit("editable-text-on-edit", value)
    }
  },
  methods: {
  },
  computed: {
    sheetName:{ 
      get: function(){
        const id = this.id
        return this.$store.getters['getWorksheetName'](id) 
      },
      set: function(name){
        const id = this.id
        this.$store.dispatch('renameWorksheet',{id, name}) 
      }
    },
  }
}
</script>
<style scoped>
.input.has-simple-look,
.input.has-simple-look:focus, 
.input.has-simple-look:active,
.input.has-simple-look:hover{
    border-color: rgba(255, 255, 255, 0.5);
    border-radius: unset;
    box-shadow: none;
    box-sizing: border-box;
    max-width: 130px;
    padding-left: 0px;
    padding-right: 0px; 
}
.input.has-simple-look.on-edit{
    max-width: 100%;
    word-wrap: break-word;
    max-height: 100%;
    color: rgb(5, 5, 5);
    background-color: rgba(255, 255, 255, 0.267); 
}
</style>