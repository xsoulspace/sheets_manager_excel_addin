<template>
  <input 
    @dblclick="readonly=false"
    :readonly="readonly"
    :class="{'on-edit': !readonly}"
    @mouseout="readonly=true"
    type="text"
    class="input has-simple-look"
    v-model="content"
    @input="$emit(
        'update:content', 
        $event.target.innerHTML
    )">
</template>


<script>
export default {
  name: "editable-text",
  props: ['content'],
  data(){
    return {
        readonly: true
    }
  },
  mounted: function () {
      this.$el.innerHTML = this.content;
  },
  watch: {
    readonly: function(value){
      switch (value) {
        case true:
          this.$emit("editable-text-readonly", value)          
          break;
      
        case false:
          this.$emit("editable-text-readonly-off", value)
          break;
      }
    },
    content: function () {
        this.$el.innerHTML = this.content;
    }
  }
}
</script>
<style scoped>
.input.has-simple-look,
.input.has-simple-look:focus, 
.input.has-simple-look:active,
.input.has-simple-look:hover{
    border-color: white;
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
    background-color: rgb(248, 248, 248); 
}
</style>