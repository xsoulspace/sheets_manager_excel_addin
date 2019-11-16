import enumPositioningOptions from "./EnumPositioningOptions";
const state = {

  elements: [
    {
      id: 1,
      name: "Shrek",
      isVisible: "Hidden",
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
    childrenEnabled: true,
    visibilitySwitchesActive: true,
    positioningType: enumPositioningOptions.numeratedGroups
  },
  log: "",
  activeSheetId: "",
  sheetFilter: "",
  isExcelActive: ""
}

const getters = {
  getNested: state=>{
    const filteredWord = state.sheetFilter
    if (filteredWord.length>0){
      return filterElements(state.elements,filteredWord)
    } else {
      return state.elements;
    }
  },
  getSheetFilter: state=>{
    return state.sheetFilter;
  },
  getVisibilitySwitchesState: state=>{
    return state.appSettings.visibilitySwitchesActive;
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
  },
  getIsActive: state=>id=>{
    return state.activeSheetId == id;
  },
  getWorksheetName:state=>id=>{
    return getValueInElements(id,state.elements, "name")
  },
  getPositioningType:state=>{
    return state.appSettings.positioningType
  }
}

function filterElements(elements, filteredWord){
  let filteredElements= []
  elements.forEach((element)=>{ 
    if(element.elements.length>0){
      element.elements.forEach((elementChild)=>{
        checkCharacter(elementChild)
      })
    }
    checkCharacter(element)
  }) 
  function checkCharacter(el){
    const name = el.name
    const checkedName = name.toLowerCase()
    const condition = filteredWord.toLowerCase()
    if (checkedName.indexOf(condition)>=0) {
     filteredElements.push(el) 
    }
  }
  return filteredElements;
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

function getIdInElements(elements, propertyName, value){
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
    if(parent[propertyName] == value) {
      founded = parent.id;
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

function deleteIdInElements(id,elements, state){
  const newItems =[]
  elements.forEach(element => {
    var newChildren =[];
    if(element.elements.length> 0){
      newChildren = element.elements.filter(elementChild=>{
        return changeValue(elementChild)
      })
    }
    if(changeValue(element) == true){
      const newElement = element;
      newElement.elements=newChildren
      newItems.push(newElement)
    } else {
      if(newChildren.length>0){
        newChildren.forEach(item=>{
          newItems.push(item)
        })
      }
    }
  })
  function changeValue(parent){
    if(parent.id == id) { 
      return false;
    } else {
      return true;
    }
  }
  return newItems;
}



// Mutations

const mutations = {
  setSheetFilter: (state,value) =>{
    state.sheetFilter =value
  },
  toogleEditMode: (state, payload) =>{
    const current = state.editMode
    state.editMode = !current;
  },
  toogleVisibilitySwitchesState: (state,payload)=>{
    let active;
    state.appSettings.visibilitySwitchesActive ?
      active = false :
      active = true
    state.appSettings.visibilitySwitchesActive = active;
  },
  updateElements: (state, payload) => {
    state.elements = payload;
  },
  updateSpecificElement: (state,{id, elements})=>{
    const elementIndex = state.elements.findIndex(el=>el.id == id)
    const element = state.elements[elementIndex]
    element.elements = elements
    state.elements[elementIndex] = element
  },
  appSettings: (state, payload)=>{
    state.appSettings = payload
  },
  deleteWorksheet: (state, id)=>{
    state.elements=deleteIdInElements(id,state.elements, state)
  },
  toogleWorksheetVisibility: (state, {id, isVisible})=>{
    state.elements = changeValueInElements(id,state.elements,"isVisible",isVisible)
  },
  changeColorWorksheet: (state, {id,color})=>{
    state.elements = changeValueInElements(id,state.elements,"color",color)
  },
  renameWorksheet: (state, {id, name})=>{
    state.elements = changeValueInElements(id,state.elements,"name",name)
  },
  changeActiveWorksheet: (state, {id})=>{
    state.activeSheetId = id;
  },
  loadWorksheets: (state, {allElements,activeItemId})=>{
    try {
      state.elements = allElements;
      state.activeSheetId = activeItemId;      
    } catch (error) {
      console.log("loadWorksheets",error)
    }
  },
  log: (state, payload)=>{
    state.log=payload
  },
  joinlog: (state, payload)=>{
    state.log=state.log+ " " + payload
  },
  changePositioningType(state, newType){
    state.appSettings.positioningType = newType
  }
}


// Object loader

var loadWorksheetsItems = function(){}
loadWorksheetsItems.prototype.load= async function(){
  var self = this;
  await Excel.run(async context=>{
    var sheets = context.workbook.worksheets;
    sheets.load('items');
    var activeItem = context.workbook.worksheets.getActiveWorksheet()
    activeItem.load('id')
    await context.sync()
    this.activeItemId = activeItem.id; 
    self.sheets = sheets.items
    return context.sync();
  }).catch(error=>console.log('loadWorksheetsItems.load',error))
}
loadWorksheetsItems.prototype.getAll = async function(){
  await this.load()
  return this.all;
}
loadWorksheetsItems.prototype.getItems = async function(){
  await this.load()
  return this.sheets;
}
loadWorksheetsItems.prototype.changePositions = async function(changedValues){
  try {
    await this.getItems()
    console.log("changedValues",changedValues)
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
  } catch (error) {
    console.log('loadWorksheetsItems.changePositions',error)
  }
}

let numerationEncoder= function(){
  this.delimiter = "_"
}
numerationEncoder.prototype.encode = function(sentence="", firstNumber=0, secondNumber=0){
  /** 1. extract possible pattern -> 00_00 but it can be e0_0uio,
   * so it is necessary to clean up after match and separate to two numbers
   * 2. to clean up pattern 0_0 and all numbers in name
   * 3. create new name 
   */
  const cleanSentence = sentence.replace(/(.\d_\d.)/g, "")
  
  const firstPart = returnPart(firstNumber)
  const secondPart = returnPart(secondNumber)
  const readyPattern = firstPart + this.delimiter + secondPart
  return cleanSentence + readyPattern

  function returnPart(draftValue){
    return draftValue > 9 ? draftValue.toString() : "0" + draftValue.toString()
  }
}
numerationEncoder.prototype.decode = function(sentence=""){
  try {
    const cleanPatternArray = sentence.match(/(.\d_\d.)/g)
    if(cleanPatternArray !== null){
      const cleanPattern = cleanPatternArray[0]
      const positionsArray = cleanPattern.split(this.delimiter)
      const newArr = positionsArray.map(el=>Number(el))
      return newArr
    } else {
      return false
    }
  } catch (error) {
    console.log('numerationEncoder.decode',error)
  }
}
numerationEncoder.prototype.decodeAndClean = function(sentence=""){
  try {
    const sentenceWithoutNumeration = sentence.replace(/(.\d_\d.)/g,"")
    // const sentenceWithoutNumbers = sentenceWithoutNumeration.replace(/(\d)/g,"")
    return sentenceWithoutNumeration
  } catch (error) {
    console.log('numerationEncoder.decode',error)
  }
}

numerationEncoder.prototype.renameAllSheets = async function(newlyNamedSheets){
  await Excel.run(async context=>{
    let sheets = context.workbook.worksheets;
    for(let newSheet of Object.values(newlyNamedSheets)){
      let sheet = sheets.getItem(newSheet.id)
      sheet.name = newSheet.name
    }
    return await context.sync()
  }).catch(error=>console.log('numerationEncoder.renameAllSheets',error))
}
numerationEncoder.prototype.decodeAllSheets = function(sheets){
  try {
    let newSheetOrder = []
    function decodeSheetName(innerSheet){
      const newSheet = innerSheet
      let nameEncoder = new numerationEncoder()
      newSheet.name = nameEncoder.decodeAndClean(innerSheet.name)
      return newSheet
    }
    
    for(let sheet of Object.values(sheets)){
      const newSheet = decodeSheetName(sheet)
      newSheetOrder.push(newSheet)
      if(newSheet.elements.length>0){
        for(let childSheet of Object.values(newSheet.elements)){
          const newChildSheet = decodeSheetName(childSheet)
          newSheetOrder.push(newChildSheet)
        }
      }
    }
    return newSheetOrder
  } catch (error) {
    console.log('numerationEncoder.encodeAllSheets',error)
  }
}
numerationEncoder.prototype.encodeAllSheets = function(sheets){
  try {
    let newSheetOrder = []
    let outerCounter = 0
    let innerCounter = 0
    function encodeSheetName(innerSheet){
      const newSheet = innerSheet
      let nameEncoder = new numerationEncoder()
      newSheet.name = nameEncoder.encode(
        innerSheet.name,outerCounter,innerCounter
      )
      return newSheet
    }
    
    for(let sheet of Object.values(sheets)){
      const newSheet = encodeSheetName(sheet)
      newSheetOrder.push(newSheet)
      if(newSheet.elements.length>0){
        for(let childSheet of Object.values(newSheet.elements)){
          innerCounter++
          const newChildSheet = encodeSheetName(childSheet)
          newSheetOrder.push(newChildSheet)
        }
      }
      
      outerCounter++
      innerCounter = 0
    }
    return newSheetOrder
  } catch (error) {
    console.log('numerationEncoder.encodeAllSheets',error)
  }
}

const actions = {
  async updateSpecificElement({dispatch, commit},{id,elements}){
    commit('updateSpecificElement',{id,elements})
    await dispatch('updateElements',state.elements)
  },
  async loadWorksheetsDetailed ({dispatch, commit},{allItems,activeItemId}){
    try {
      function createSheets(elements){
        let allElements = []
        elements.forEach(sheet => {
          const element = {
            id: sheet.id,
            name: sheet.name,
            color: sheet.tabColor,
            isVisible: sheet.visibility,
            elements: []
          }
          allElements.push(element)
        })
        return allElements
      }
      function createNumeratedSheets(elements){
        const elementProto = {
          id: "",
          name: "",
          color: "",
          isVisible: "",
          elements: {}
        }      
        const DEL = "DEL"
        let allTempElements ={}
        for(let sheet of Object.values(elements)){
          const element = {
            id: sheet.id,
            name: sheet.name,
            color: sheet.tabColor,
            isVisible: sheet.visibility,
            elements: {}
          }
          let sheetPositionEncoder = new numerationEncoder()
          let positions = sheetPositionEncoder.decode(element.name)
          /** if positions failed, then we need to rename all sheets 
           * and then start process again
          */
         if(positions == false){
           console.log("warn",positions)
          return {items: createSheets(elements), status: false}
         }
          /** Check is it in a group or not */
          let [firstPosition, secondPosition] = positions
          if(secondPosition> 0){
            let el = elementProto
            if([DEL+firstPosition] in allTempElements){
              el = allTempElements[DEL+firstPosition]
            }
            el.elements[DEL+secondPosition] = element
            allTempElements[DEL+firstPosition] = el
          } else {
            /** check is element exists */
            if([DEL+firstPosition] in allTempElements){
              const oldEl = allTempElements[DEL+firstPosition] 
              const childElements = oldEl.elements
              element.elements = childElements
            }
            allTempElements[DEL+firstPosition] = element
          }
        }
        /** let's reorder all items */
        function reordering(groupElements){
          let groupValues = []
          let groupKeys = Object.keys(groupElements)
          groupKeys.sort()
          
          for(let key of groupKeys){
            const el = groupElements[key]
            
            /** if child elements >0 then we need to reorder them too*/
            let childElements = Object.keys(el.elements).length>0 ? reordering(el.elements) : []
            el.elements = childElements
            groupValues.push(el)
          }
          return groupValues
        }
        return {items: reordering(allTempElements), status: true}
      }

      const positioningType = state.appSettings.positioningType
      let allElements = []
      let localStatus = true
      switch (positioningType) {
        case enumPositioningOptions.default:
          allElements = createSheets(allItems)
          break;
      
        case enumPositioningOptions.numeratedGroups:
          let {items, status} = createNumeratedSheets(allItems)
          localStatus = status
          allElements = items;

          break;
      }
      commit('loadWorksheets',{allElements,activeItemId})
      if(localStatus == false){
        await dispatch('encodeAllSheets', allElements)
      }
    } catch (error) {
      console.log("loadWorksheetsDetailed",error)
    }
  },
  async encodeAllSheets({dispatch, commit, state}, sheets){
    let nameEncoder = new numerationEncoder()
    let newlyNamedSheets = nameEncoder.encodeAllSheets(sheets)
    await nameEncoder.renameAllSheets(newlyNamedSheets)
  },
  async decodeAllSheets({dispatch, commit, state}, sheets){
    let nameEncoder = new numerationEncoder()
    let newlyNamedSheets = nameEncoder.decodeAllSheets(sheets)
    await nameEncoder.renameAllSheets(newlyNamedSheets)
  },
  async clearSheetsNumeration({dispatch, commit, state}){
    await dispatch('decodeAllSheets',state.elements)
  },
  async changePositioningType({dispatch, commit, state}, newType){
    switch (newType) {
      case enumPositioningOptions.default:
        await dispatch('decodeAllSheets', state.elements)
        break;
      case enumPositioninchangePositioningTypegOptions.numeratedGroups:
        await dispatch('encodeAllSheets', state.elements)
        break;
    }
    commit('',newType)
  },
  async updateElements ({dispatch, commit, state}, payload) {
    try {
      const positioningType = state.appSettings.positioningType
      let newSheetOrder = []
      switch (positioningType) {
        case enumPositioningOptions.default:
          for(let sheet of Object.values(payload)){
            newSheetOrder.push(sheet)
            if(sheet.elements.length>0){
              for(let sheetChild of Object.values(sheet.elements)){
                newSheetOrder.push(sheetChild)
              }        
            }
          }
          break;
        case enumPositioningOptions.numeratedGroups:
          // changing names - adding numeration
          let nameEncoder = new numerationEncoder()
          newSheetOrder = nameEncoder.encodeAllSheets(payload)
          await nameEncoder.renameAllSheets(newSheetOrder)
          break;
      }
      console.log('updateElements',newSheetOrder)

      // check which sheet changed
      const itemLoader = new loadWorksheetsItems();
      const changedItems = await itemLoader.changePositions(newSheetOrder);
      for(let item of Object.values(changedItems)){
        await dispatch('reorderWorksheet', item)
      }
      commit('updateElements',payload);      
    } catch (error) {
      commit('log',error)
    }

  },
  async loadWorksheets ({commit,dispatch},payload){
    const items = new loadWorksheetsItems()
    const allItems =   await items.getItems()
    const activeItemId = await items.activeItemId;
    await dispatch("loadWorksheetsDetailed",{allItems,activeItemId})
  },
  async renameWorksheet ({dispatch, commit}, {id, name}){
    await Excel.run(async context => {
      let sheet = context.workbook.worksheets.getItem(id)
      sheet.name = name;
      return await context.sync()
    })
    commit('renameWorksheet',{id, name})
  },
  async addNewWorksheet({dispatch, commit}, {name,position, color}){
    let id;
    await Excel.run(async context => {
      let sheets = context.workbook.worksheets
      let sheet = sheets.add(name)
      id = sheet.load("id")
      return await context.sync()
    })
    dispatch('reorderWorksheet', {id, position});
    dispatch("changeColorWorksheet",{id,color});    
  },
  async worksheetAdded ({dispatch,commit},id){
    dispatch('loadWorksheets')
  },
  async deleteWorksheet({dispatch, commit}, {id}){
    await Excel.run(async context => {
      let sheets = context.workbook.worksheets
      sheets.load("items");
      return context.sync()
        .then(function () {
            if (sheets.items.length === 1) {
              commit('log',"Unable to delete the only worksheet in the workbook")
            } else {
              let sheet = sheets.getItem(id);
              sheet.delete();
              return context.sync();
            };
        });
    })
    commit('deleteWorksheet',id)
  },
  async worksheetDeleted({commit},id){
    commit('deleteWorksheet',id)
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
      let sheet = context.workbook.worksheets.getItem(id)
      sheet.tabColor = color;
      return await context.sync()
    });
    commit('changeColorWorksheet', {id,color})
  },
  async selectWorksheet({dispatch, commit, state}, id){
    const oldId = state.activeSheetId; 
    if (id != oldId) {
      await Excel.run(async context => {
        const sheet = context.workbook.worksheets.getItem(id)
        sheet.activate();        
        return await context.sync()
      })
    commit('changeActiveWorksheet', {id})
    }
  },
  async worksheetActivated({commit,state},id){
    commit('changeActiveWorksheet', {id})
  },
  async reorderWorksheet ({dispatch, commit}, {id, position}){
    await Excel.run(async context => {
      let sheet;
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
