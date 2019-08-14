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
var loadWorksheetsItems = function(){}
loadWorksheetsItems.prototype.load= async function(){
  var self = this;
  await Excel.run(async context=>{
    var sheets = context.workbook.worksheets;
    sheets.load("items");
    await context.sync()
    self.sheets = sheets.items
    return context.sync();
  })
}
loadWorksheetsItems.prototype.getItems = async function(){
  await this.load()
  return this.sheets;
}
loadWorksheetsItems.prototype.changePositions = async function(changedValues){
  await this.getItems()
  var changedItem;
  var fisrtChange = false;
  changedValues.forEach((item, index)=>{
    const changedItems = this.sheets.filter((oldItem)=>{
      return (item.id ==oldItem.id && oldItem.position != index)
    })
    if (changedItems.length>0 && fisrtChange==false){
      changedItem = {
        id: item.id,
        position: index
      }
      fisrtChange= true
    }
  })
  return changedItem;  
}

const actions = {
  async updateElements ({dispatch, commit }, payload) {   
    const newSheetOrder = []
    await payload.forEach(async (sheet)=>{
      if(sheet.elements.length>0){
        await sheet.elements.forEach(async (sheetChild) => {
          newSheetOrder.push(sheetChild)
        });
      }else{
        newSheetOrder.push(sheet)        
      }
    });
    try {
      // check which sheet changed
    const itemLoader = new loadWorksheetsItems();
    const changedItem = await itemLoader.changePositions(newSheetOrder);
    dispatch('reorderWorksheet', changedItem)
    commit('updateElements',payload);      
    } catch (error) {
      commit('log',error)
    }

  },
  async loadWorksheets ({commit},payload){
    const items = new loadWorksheetsItems() 
    commit("loadWorksheets", await items.getItems())
  },
  async renameWorksheet ({dispatch, commit}, {id, name}){
    await Excel.run(async context => {
      var sheet = context.workbook.worksheets.getItem(id)
      sheet.name = name;
      return await context.sync()
    })
    dispatch('loadWorksheets')
  },
  async reorderWorksheet ({dispatch, commit}, {id, position}){
    await Excel.run(async context => {
      var sheet;
      switch (typeof id) {
        case "undefined":
          sheet = context.workbook.worksheets.getActiveWorksheet();        
          break;
        default:
          sheet = context.workbook.worksheets.getItem(id)
          break;
      }
      sheet.position = position
      return await context.sync()
    })
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
