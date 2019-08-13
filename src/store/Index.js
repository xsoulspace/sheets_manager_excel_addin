import vue from "vue";
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
    
  },
  log: ""
}

const getters = {
  getNested: state=>{
    return  state.elements;
  },
  appSettings: state=>{
    return state.appSettings;
  },
  getLog: state=> {
    return state.log;
  }
}

const mutations = {
  updateElements: (state, payload) => {
    state.elements = payload;
  },
  appSettings: (state, payload)=>{
    state.appSettings = payload
  },
  loadWorksheets: (state, sheets)=>{
    const elements =[]
    sheets.forEach(sheet => {
      const element = {
        id: sheet.id,
        name: sheet.name,
        elements: []
      }
      elements.push(element)
    });
    state.elements = elements;
  },
  log: (state, payload)=>{
    state.log=payload
  }
}


const actions = {
  updateElements: ({ commit }, payload) => {
    commit("updateElements", payload);
  },
  async loadWorksheets ({commit},payload){
    await Excel.run(async context=>{
      var sheets = context.workbook.worksheets;
      sheets.load("items");
      return await context.sync().then(()=>{
        return sheets.items}) 
    }).then(value => commit("loadWorksheets", value))
  },
  async renameWorksheet ({dispatch, commit}, {id, name}){
    var comm = commit;
    
    await Excel.run(async context => {
      
      var sheet = context.workbook.worksheets.getItem(id)
      sheet.name = name;
      return await context.sync()
    })
    dispatch('loadWorksheets')
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
