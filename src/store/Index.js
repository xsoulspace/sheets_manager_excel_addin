const state = {
  elements: [
    {
      id: 1,
      name: "Shrek",
      isVisible: "Visible",
      color: "#FFFBBB",
      elements: []
    },
    {
      id: 2,
      name: "Fiona",
      isVisible: "Visible",
      color: "",
      elements: [
        {
          id: 4,
          name: "Lord Farquad",
          isVisible: "Visible",
          color: "",
          elements: []
        },
        {
          id: 5,
          name: "Prince Charming",
          isVisible: "Visible",
          color: "",
          elements: []
        }
      ]
    },
    {
      id: 3,
      name: "Donkey",
      isVisible: "Visible",
      color: "",
      elements: []
    }
  ],
  appSettings: {
//    enableChildren: true,
    
  },
  log: "",
  editMode: false
}

const getters = {
  getVisibleSheetsCounter: state=>{
    return state;
  },
  getNested: state=>{
    return  state.elements;
  },
  appSettings: state=>{
    return state.appSettings;
  },
  getLog: state=> {
    return state.log;
  },
  getEditMode: state => {
    return state.editMode;
  },
  getColor: state=>id=>{
    return getValueInElements(id,state.elements,"color")
  },
  getIsVisible: state=>id=>{
    return getValueInElements(id,state.elements,"isVisible")
  }
}

function getValueInElements(id,elements, propertyName){
  var founded;
  elements.forEach(element => {
    if(element.elements.length> 0){
      element.elements.forEach(elementChild => {
        getValue(elementChild)  
      })
    }
    getValue(element)
  })
  function getValue(parent){
    if(parent.id == id) {
      founded = parent[propertyName];
    }  
  }
  return founded;
}


function changeValueInElements(id,elements, propertyName, value){
  const newItems = elements.map(element => {
    var newChildren =[];
    if(element.elements.length> 0){
      newChildren = element.elements.map(elementChild => {
        return changeValue(elementChild)
      })
    }
    var newElement = changeValue(element)
    newElement.elements=newChildren
    return newElement;
  })
  
  function changeValue(parent){
    const newParent =parent;
    if(newParent.id == id) {
      newParent[propertyName]=value;
    }
    return newParent;
  }

  return newItems;
}


// Mutations

const mutations = {
  toogleEditMode: (state, payload) =>{
    const current = state.editMode
    state.editMode = !current;
  },
  updateElements: (state, payload) => {
    state.elements = payload;
  },
  appSettings: (state, payload)=>{
    state.appSettings = payload
  },
  toogleWorksheetVisibility: (state, {id, isVisible})=>{
    state.elements = changeValueInElements(id,state.elements,"isVisible",isVisible)
  },
  changeColorWorksheet: (state, {id,color})=>{
    state.elements = changeValueInElements(id,state.elements,"color",color)
  },
  loadWorksheets: (state, sheets)=>{
    const elements =[]
    sheets.forEach(sheet => {
      const element = {
        id: sheet.id,
        name: sheet.name,
        color: sheet.tabColor,
        isVisible: sheet.visibility,
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


// Object loader

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
  var newChangedItems=[];
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
      newChangedItems.push(changedItem)
      // fisrtChange= true
    }
  })
  return newChangedItems;  
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
    const changedItems = await itemLoader.changePositions(newSheetOrder);
    changedItems.forEach((item)=>{
      dispatch('reorderWorksheet', item)
    })
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
  async addNewWorksheet({dispatch, commit}, {name,position, color}){
    var id;
    await Excel.run(async context => {
      var sheets = context.workbook.worksheets
      var sheet = sheets.add(name)
      id = sheet.load("id")
      return context.sync()
    })
    dispatch('reorderWorksheet', {id, position});
    dispatch("changeColorWorksheet",{id,color});    
  },
  async deleteWorksheet({dispatch, commit}, {id}){
    await Excel.run(async context => {
      var sheets = context.workbook.worksheets
      sheets.load("items");
      return context.sync()
        .then(function () {
            if (sheets.items.length === 1) {
              commit('log',"Unable to delete the only worksheet in the workbook")
            } else {
                var sheet = sheets.getItem(id);
                sheet.delete();
                return context.sync();
            };
        });
    })
    dispatch("loadWorksheets")
  },
  async toogleWorksheetVisibility({dispatch, commit}, {id,isVisible}){
    await Excel.run(async context => {
      var sheet = context.workbook.worksheets.getItem(id)
      sheet.visibility = isVisible;
      return await context.sync()
    });
    commit('toogleWorksheetVisibility', {id,isVisible})
  },
  async changeColorWorksheet({dispatch, commit}, {id, color}){
    await Excel.run(async context => {
      var sheet = context.workbook.worksheets.getItem(id)
      sheet.tabColor = color;
      return await context.sync()
    });
    commit('changeColorWorksheet', {id,color})
  },
  async selectWorksheet({dispatch, commit}, {id}){
    await Excel.run(async context => {
      var sheet = context.workbook.worksheets.getItem(id)
      sheet.activate();
      return await context.sync()
    })
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
