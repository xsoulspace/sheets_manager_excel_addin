<template>
<div id="app">
  {{log}}
<router-view></router-view>
</div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      StoreAppSettings: "appSettings",
      log: "",
    }        
  },
  computed: {
    isLocalStorageExists: function(){
      return typeof localStorage !=  "undefined"
    },
    appSettings: {
      set: function(value){
        this.$store.commit(this.StoreAppSettings, value)
      },
      get: function(){
        return this.$store.getters[this.StoreAppSettings]
      }
    }
  },
  watch:{
    appSettings: function(){
      if (this.isLocalStorageExists){
        localStorage.setItem(this.StoreAppSettings,JSON.stringify(this.appSettings))
      }
    }
  },
  methods: {

  },
  mounted: function(){
    if (this.isLocalStorageExists){
      // getting data from local storage
      //console.log(wStorage)
      if (localStorage.getItem(this.StoreAppSettings)){
        this.appSettings = JSON.parse(localStorage.getItem(this.StoreAppSettings))
      }
    }
    
  },
}
</script>
