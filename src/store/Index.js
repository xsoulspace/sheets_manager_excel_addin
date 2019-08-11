const state = {
  elements: [
    {
      id: 1,
      name: "Shrek",
      elements: []
    },
    {
      id: 2,
      name: "Fiona",
      elements: [
        {
          id: 4,
          name: "Lord Farquad",
          elements: []
        },
        {
          id: 5,
          name: "Prince Charming",
          elements: []
        }
      ]
    },
    {
      id: 3,
      name: "Donkey",
      elements: []
    }
  ],
  appSettings: {
//    enableChildren: true,
    
  }
}

const getters = {
  getNested: state=>{
    return  state.elements;
  },
  appSettings: state=>{
    return state.appSettings;
  }
}

const mutations = {
  updateElements: (state, payload) => {
    state.elements = payload;
  },
  appSettings: (state, payload)=>{
    state.appSettings = payload
  }
}

const actions = {
  updateElements: ({ commit }, payload) => {
    commit("updateElements", payload);
  }
}

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state,
  getters,
  mutations,
  actions
})
