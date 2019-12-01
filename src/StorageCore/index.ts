import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appSettings:{
      excelUsingInfo: {}
    }
  },
  getters: {
    getExcelUsingInfo: state=>{
      try {
        return state.appSettings.excelUsingInfo        
      } catch (error) {
        
      }
    }
  },
  mutations: {
    setExcelUsingInfo(state,excelUsingInfo){
      try {
        state.appSettings.excelUsingInfo = excelUsingInfo
      } catch (error) {
        
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
