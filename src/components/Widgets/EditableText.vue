<template>
<p 
  v-if="!onEdit"
  @dblclick="onEdit=true"
  @click="selectWorksheet" 
>
  {{sheetName}}
</p>
<input
  ref="input"
  :maxlength="maxLength" 
  v-else-if="onEdit"
  @click.native="onEdit=true"
  @keydown.enter="onEdit=false"
  v-closable="{
    exclude: ['input'],
    handler: 'editOff'
  }"
  type="text"
  class="input has-simple-look on-edit"
  v-model="sheetName"
>
</template>


<script>
export default {
  name: "editable-text",
  props: ['id'],
  data(){
    return {
      onEdit: false,
      maxLength: 31
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
    selectWorksheet: async function(){
      await this.$store.dispatch('selectWorksheet',this.id)
    },
    editOff: function(){
      this.onEdit=false
    }
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
    border-color: rgba(67, 245, 221, 0.664);
    border-radius: unset;
    box-shadow: none;
    box-sizing: border-box;
    max-width: auto;
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