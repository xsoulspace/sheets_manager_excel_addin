<template>
<p 
  v-if="!onEdit"
  @dblclick.prevent="onEdit=true"
  @click.prevent="selectWorksheet" 
  v-hammer:press="handlePress"
  v-hammer:tap="handleTouch"
>
  {{sheetName}}
</p>
<input
  ref="input"
  :maxlength="maxLength" 
  v-else-if="onEdit"
  @click.native="onEdit=true"
  v-hammer:tap="handleTouch"
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
  props: ['id','dragging'],
  data(){
    return {
      onEdit: false,
      maxLength: 26,
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
    },
    async handlePress(){
      try {
        if(this.isTouchDevice && !this.dragging){
          await this.selectWorksheet()
        }
      } catch (error) {
        
      }
    },
    handleTouch(){
      try {
        if(this.isTouchDevice && !this.dragging){
          this.onEdit=true
        }
      } catch (error) {
        
      }
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
    isTouchDevice(){
      return this.$store.getters['getIsTouchDevice']
    }
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