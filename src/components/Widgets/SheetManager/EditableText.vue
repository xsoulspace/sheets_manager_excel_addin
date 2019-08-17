<template>
<input 
    @dblclick="readonly=false"
    :readonly="readonly"
    :class="{'on-edit': !readonly}"
    @mouseout="handleMouseOut()"
    @keydown.enter="readonly=true"
    type="text"
    class="input has-simple-look handle"
    v-model="content"
    @input="updateContent"
    >  
</template>


<script>
export default {
  name: "editable-text",
  props: ['content', 'isModalActive', 'id'],
  data(){
    return {
        readonly: true
    }
  },
  mounted: function () {
      this.$el.innerHTML = this.content;
  },
  watch: {
    isModalActive: function(value){
      if(value==false) {this.readonly = true}
    },
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
  },
  methods: {
    selectWorksheet: function(){
      this.dispatch('selectWorksheet',{id:this.id})

    },
    updateContent: function(){
      this.$emit(
        'update:content', 
        this.content
      )
    },
    handleMouseOut: function(){
      if (!this.readonly && this.justCoupleWords){
        this.readonly = true
      }
    }
  },
  computed: {
    justCoupleWords: function(){
      return this.content.split(" ").length<=3
    }
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
    background-color: rgba(248, 248, 248, 0.9); 
}
</style>