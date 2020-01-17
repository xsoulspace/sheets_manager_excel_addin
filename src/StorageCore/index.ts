import Vue from "vue";
import Vuex from 'vuex'
import Sheets from "./Sheets";
Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    Sheets
  }
})
