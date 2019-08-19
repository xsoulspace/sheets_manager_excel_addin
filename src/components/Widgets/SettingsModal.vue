<template>
<div :class="{'is-active':isSettingsActive}" class="modal">
  <div @click="isSettingsActive = false" class="modal-background"></div>
  <div @click.stop class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Настройки</p>
      <button @click="isSettingsActive = false" class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <label class="checkbox">
          <input type="checkbox">
          Группировка листов (все листы будут пронумерованы)
        </label>
      </div>  
      <div class="field">
        <label class="checkbox">
          <input type="checkbox">
          Адаптировать интерфейс под тач
        </label>        
      </div> 
    </section>
    <footer class="modal-card-foot">
      <button @click="isSettingsActive = false" class="button is-success">Применить</button>
      <button @click="isSettingsActive = false" class="button">Отменить</button>
    </footer>
  </div>
</div>
</template>
<script>
export default {
  name: 'settings-modal',
  props: {
    settingsState: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  computed: {
    isSettingsActive: {
      set: function(value){
        this.$emit('settings-modal-state-changed',value)
      },
      get: function(){
        return this.$props.settingsState;
      }
    }
  }
}
</script>