import enumPositioningOptions from "./EnumPositioningOptions";
import numerationEncoder from "./NumerationEncoder";
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
  await Excel.run(async context=>{
    let sheets = context.workbook.worksheets;
    sheets.load('items');
    let activeItem = context.workbook.worksheets.getActiveWorksheet()
    activeItem.load('id')
    await context.sync()
    this.activeItemId = activeItem.id; 
    this.sheets = sheets.items
    return context.sync();
  }).catch(error=>console.log('loadWorksheetsItems.load',error))
}
loadWorksheetsItems.prototype.getAll = async function(){
  await this.load()
  return this.all;
}
loadWorksheetsItems.prototype.getSheetsIds = async function(){
  await this.load()
  const ids = this.sheets.map(el=>{
    return el.id
  })
  return ids
}
loadWorksheetsItems.prototype.getItems = async function(){
  await this.load()
  return this.sheets;
}
loadWorksheetsItems.prototype.changePositions = async function(changedValues){
  try {
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
  } catch (error) {
    console.log('loadWorksheetsItems.changePositions',error)
  }
}
loadWorksheetsItems.prototype.changeSheetsPositions = async function(changedValues){
  try {
    /** getting sheets */
    const sheetsIds =await this.getSheetsIds()
    /** getting current positions */
    const simplifiedItemsIds = []
    for(let item of changedValues){
      simplifiedItemsIds.push(item.id)
      if(item.elements.length>0){
        for(let childElement of item.elements){
          simplifiedItemsIds.push(childElement.id)
        }
      }
    }
    /** finding changes */
    const changedItems = simplifiedItemsIds.filter((item,index)=>{
      const currentIndexOfItem = sheetsIds.indexOf(item.id)
      return (index != currentIndexOfItem)
    })
    /** making new array to change positions */
    if (changedItems.length>0){
      for(let [key,values] of Object.entries(changedItems)){
        await this.reorderSheet({id:values,position:key})
      }
      
    }   
  } catch (error) {
    console.log('loadWorksheetsItems.changeSheetsPositions',error)
  }
}
loadWorksheetsItems.prototype.reorderSheet=async function({id,position}){
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
    sheet.position = Number(position)
    return await context.sync()
  }).catch(error=>console.log('loadWorksheetsItems.reorderSheet',error))
}


const actions = {
  async updateSpecificElement({dispatch, commit},{id,elements}){
    commit('updateSpecificElement',{id,elements})
    await dispatch('updateElements',state.elements)
    // console.log('elements 2',Object.freeze(state.elements))
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
      const DEL = "DEL"
      let numbersHadBeenShifted = false
      
      function createNumeratedSheets(elements){
        /** first, we need to make correct hierarhy 
         * second, we need to find doubles and correct names and positions
         * third, we need to rename all sheets
         * Making correct hierarhy:
         * 1. Element exists, but name == protoName
         * 1.1 No elements -> place is free
         * -> child elements can be placed
         * 1.2 Has elements -> place is free
         * -> child elements can be placed
         * 2. Element exists, but name != protoName
         * -> child elements can be placed
         * -> place is taken
         * -> find last number + 1
         * -> take this place
         * 3. Element not exists 
         * -> place is free
         * -> place protoElement
         * -> child elements can be placed
        */
        const elementProto = {
          id: "",
          name: "",
          color: "",
          isVisible: "",
          elements: {}
        }      
        let maxFirstNumber = 0
        let allTempElements ={}
        let sheetPositionEncoder = new numerationEncoder()
        
        for(let sheet of Object.values(elements)){
          let shiftNumber = 0
          const element = {
            id: sheet.id,
            name: sheet.name,
            color: sheet.tabColor,
            isVisible: sheet.visibility,
            elements: {}
          }
          let positions = sheetPositionEncoder.decode(element.name)
          /** if positions failed, then we need to rename all sheets 
           * and then start process again
          */
          if(positions == false){
            console.log("warn",element.name)
            return {items: createSheets(elements), status: false}
          }
          
          /** Check is it in a group or not */
          let [firstPosition, secondPosition] = positions
          
          function setNewMaxFirstPosition(newOne){
            maxFirstNumber= newOne > maxFirstNumber ? newOne : maxFirstNumber
          }

          function newFirstPosition(){
            return firstPosition + shiftNumber
          }
          function shiftedFirstPosition(){
            return DEL+newFirstPosition()
          }
          let shiftedFirstPositionWithKey = shiftedFirstPosition()
          
          function encodeShiftedName(innerElement){
            if(shiftNumber>0){
              const oldName = innerElement.name
              const newName = sheetPositionEncoder.encode(oldName,newFirstPosition(),secondPosition)
              innerElement.name = newName
            }
            return innerElement
          }
          let el
          const elementExists = shiftedFirstPositionWithKey in allTempElements
          if(elementExists){
            el = allTempElements[shiftedFirstPositionWithKey]
          } else {
            el = elementProto
          }
          const isItChildElement = secondPosition> 0
          function getChildrenAndPutThemToNewElement(){
            const childElements = el.elements
            element.elements = childElements
          }
          function shiftToNewPosition(){
            const newMaxNumber = maxFirstNumber+shiftNumber
            setNewMaxFirstPosition(newMaxNumber)
            allTempElements[DEL+(newMaxNumber)] = element
          }
          if(isItChildElement){
            el.elements[DEL+secondPosition] = element
            allTempElements[shiftedFirstPositionWithKey] = el
          } else {
            /** check name of element, if it is not equal 
             * and its not proto, then we need to 
             * shift it down
             * */
            switch (true) {
              case !elementExists:
                allTempElements[DEL+firstPosition] = element
                break;
              case el.name == elementProto.name:
                getChildrenAndPutThemToNewElement()
                break;
              case el.id != element.id:
                /** need to shift element */
                shiftNumber++
                shiftToNewPosition()
                numbersHadBeenShifted = true
                break;
              default:
                console.log("what's going on? detailed loading worksheet", element)
                break;
            }
            setNewMaxFirstPosition(firstPosition + shiftNumber)
          }
        }
        function prepareToSort(keys){
          let newKeys= []
          for(let key of keys){
            const newKey = key.replace(DEL,"")
            newKeys.push(newKey)
          }
          return newKeys
        }
        /** let's reorder all items */
        function reordering(groupElements){
          let groupValues = []
          let groupKeys = prepareToSort(Object.keys(groupElements))
          groupKeys.sort((a,b)=>a-b)
          for(let key of groupKeys){
            const el = groupElements[DEL+key]
            
            /** if child elements >0 then we need to reorder them too*/
            let childElements = Object.keys(el.elements).length>0 ? reordering(el.elements) : []
            el.elements = childElements
            groupValues.push(el)
          }
          return groupValues
        }
        let reorderedItems = reordering(allTempElements)
        let encodedItems = sheetPositionEncoder.encodeAllSheetsElements(reorderedItems)
        return {items: encodedItems, status: true}
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
      if(numbersHadBeenShifted){
        let nameEncoder = new numerationEncoder()
        const simplifiedSheets = nameEncoder.simplifySheetsHierarhy(allElements)
        await nameEncoder.renameAllSheets(simplifiedSheets)
      }
    } catch (error) {
      console.log("loadWorksheetsDetailed",error)
    }
  },
  async encodeAllSheets({dispatch, commit, state}, sheets){
    let nameEncoder = new numerationEncoder()
    let decodedNamedSheets = nameEncoder.decodeAllSheets(sheets)
    let encodedNamedSheets = nameEncoder.encodeAllSheetsElements(decodedNamedSheets)
    await nameEncoder.renameAllSheets(encodedNamedSheets)
  },
  async decodeAllSheets({dispatch, commit, state}, sheets){
    let nameEncoder = new numerationEncoder()
    let newlyNamedSheets = nameEncoder.decodeAllSheets(sheets)
    let newlyNamedSheetsWithoutDoubles = nameEncoder._checkAndReturnWithoutDoubles(newlyNamedSheets)
    await nameEncoder.renameAllSheets(newlyNamedSheetsWithoutDoubles)
  },
  async clearSheetsNumeration({dispatch, commit, state}){
    await dispatch('decodeAllSheets',state.elements)
  },
  async changePositioningType({dispatch, commit, state}, newType){
    switch (newType) {
      case enumPositioningOptions.default:
        await dispatch('decodeAllSheets', state.elements)
        break;
      case enumPositioningOptions.numeratedGroups:
        await dispatch('encodeAllSheets', state.elements)
        break;
    }
    commit('changePositioningType',newType)
    await dispatch('loadWorksheets')
  },
  async updateElements ({dispatch, commit, state}, payload) {
    try {

      const positioningType = state.appSettings.positioningType
      let newSheetOrder = []
      switch (positioningType) {
        case enumPositioningOptions.default:
          /** FIXME: refactor to simplify its */
          newSheetOrder = payload;
          break;
        case enumPositioningOptions.numeratedGroups:
          // changing names - adding numeration
          let nameEncoder = new numerationEncoder()
          /** FIXME: refactor encodeAllSheets */
          newSheetOrder = nameEncoder.encodeAllSheetsElements(payload)
          const simplifiedSheets = nameEncoder.simplifySheetsHierarhy(newSheetOrder)
          await nameEncoder.renameAllSheets(simplifiedSheets)
          break;
      }
      console.log('updateElements',newSheetOrder)

      // check which sheet changed
      const itemLoader = new loadWorksheetsItems();
      /** FIXME: refactor changePositions if there is more then one level*/
      await itemLoader.changeSheetsPositions(newSheetOrder);
      commit('updateElements',newSheetOrder);      
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
    await dispatch('reorderWorksheet', {id, position});
    await dispatch("changeColorWorksheet",{id,color});    
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
    let encoderSheet = new numerationEncoder()
    await encoderSheet.reorderSheet({id, position})
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
