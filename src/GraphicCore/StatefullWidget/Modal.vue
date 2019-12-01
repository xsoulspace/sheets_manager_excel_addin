<template>
<div :class="{'is-active':isModalActive}" class="modal">
  <div @click="isModalActive = false" class="modal-background"></div>
  <div @click.stop class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{title}}</p>
      <button @click="isModalActive = false" class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <slot name="modal-body"></slot>
    </section>
    <footer class="modal-card-foot">
      <button @click="isModalActive = false" class="button is-success">Применить</button>
      <button @click="isModalActive = false" class="button">Отменить</button>
    </footer>
  </div>
</div>
</template>
<script>
export default {
  name: 'modal',
  props: {
    title:{
      required: true,
      type: String,
      default: ""
    },
    modalState:{
      required: true,
      type: Boolean,
      default: false
    }
  },
  data(){
    return{

    }
  },
  computed: {
    isModalActive: {
      set: function(value){
        this.$emit('modal-state-changed',value)
      },
      get: function(){
        return this.$props.modalState;
      }
    }
  }
}
</script>