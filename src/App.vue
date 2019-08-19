<template>
<div id="app">
  <div class="notification" v-show="log.length>0">
    <button class="delete"></button>
    {{log}}
  </div>
<router-view></router-view>
</div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      StoreAppSettings: "appSettings",
    }        
  },
  computed: {
    log: function(){
      return this.$store.getters['getLog']
    },
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
    eventHandler: async function(event){
      var self = this;
      // self.$store.commit('joinlog', JSON.stringify(event))
      switch (event.type) {
        case "WorksheetAdded":
          self.$store.dispatch('worksheetAdded',event.worksheetId)   
          break;
      
        case "WorksheetActivated":
          self.$store.dispatch('worksheetActivated',event.worksheetId)   
          break;
        case "WorksheetDeleted":
          self.$store.dispatch('worksheetDeleted',event.worksheetId)   
          break;
      }
      // 
       
    },
  },
  mounted: function(){
    // Catch all events from Excel
      var self = this;
      Excel.run(async context=> {
        let sheets = context.workbook.worksheets
        sheets.onActivated.add(self.eventHandler) 
        sheets.onAdded.add(self.eventHandler)
        sheets.onDeleted.add(self.eventHandler)
        sheets.onChanged.add(self.eventHandler)    
        return await context.sync()
      })
    this.log(JSON.stringify(window.Office))

    // ****************
    // Excel Events end
    // ****************
    // const elements = localStorage.getItem("elements")
    // if(typeof elements != "undefined"){
    //   this.$store.dispatch('specialUpdateElements',elements)
    // }
    if (this.isLocalStorageExists){
      // getting data from local storage
      //console.log(wStorage)
      if (localStorage.getItem(this.StoreAppSettings)){
        this.appSettings = JSON.parse(localStorage.getItem(this.StoreAppSettings))
      }
    }    
  },
  beforeDestroy: function(){
    // const elements = this.$store.getters['getNested']
    // localStorage.setItem("elements",elements)
  }
}
</script>
