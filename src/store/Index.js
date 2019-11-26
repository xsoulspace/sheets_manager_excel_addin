import enumPositioningOptions from "./EnumPositioningOptions";
import numerationEncoder from "./NumerationEncoder";
import {WorksheetsLoader} from "./WorksheetsLoader";
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
  getElementChildren: state=>id=>{
    const elements = state.elements
    return elements.filter(el=>el.id==id).elements
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
  updateElements: (state, elements) => {
    state.elements = elements;
  },
  updateSpecificElement: (state,{id, elements})=>{
    try {
      let oldElements = state.elements
      // console.log(oldElements)
      const elementIndex = oldElements.findIndex(el=>el.id == id)
      // console.log(elementIndex)
      let element = oldElements[elementIndex]
      // console.log('until',element)
      // console.log('childrenElements',elements)
      element.elements = elements
      // console.log('after',element)
      oldElements[elementIndex] = element
      state.elements = oldElements
      // console.log('state',state)   
    } catch (error) {
      console.log('updateSpecificElement',error)
    }
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

const actions = {
  async loadWorksheetsDetailed ({dispatch, commit},{allItems,activeItemId}){
    try {
      let sheetsEncoder = new numerationEncoder()
      await sheetsEncoder.init()
      let context = await sheetsEncoder.excelContext()
      let localAreItemsWereShifted = false
      const positioningType = state.appSettings.positioningType
      let allElements = []
      let localStatus = true
      switch (positioningType) {
        case enumPositioningOptions.default:
          allElements = sheetsEncoder.createSheets(allItems)
          break;
        case enumPositioningOptions.numeratedGroups:
          let {items, status, areItemsWereShifted} = sheetsEncoder.createNumeratedSheets(allItems)
          localAreItemsWereShifted = areItemsWereShifted
          localStatus = status
          allElements = items;
          break;
      }
      
      commit('loadWorksheets',{allElements,activeItemId})
      if(localStatus == false){
        // console.log('starting encoding')
        await dispatch('encodeAllSheets', allElements)
      }
      // console.log(localAreItemsWereShifted)
      if(localAreItemsWereShifted == true){
        await sheetsEncoder.renameAllSheets(allElements)
        const itemLoader = new WorksheetsLoader();
        await itemLoader.init(context)
        // console.log(allElements)
        await itemLoader.changeSheetsPositions(allElements)
      }
      await context.sync()
    } catch (error) {
      console.log("loadWorksheetsDetailed",error)
    }
  },
  async loadWorksheets ({commit,dispatch},payload){
    try {
      const itemLoader =  new WorksheetsLoader()
      await itemLoader.init()
      const allItems = await itemLoader.getItems()
      const activeItemId = await itemLoader.activeItemId;
      await itemLoader.syncExcelContext()
      await dispatch("loadWorksheetsDetailed",{allItems,activeItemId})      
    } catch (error) {
      console.log('loadWorksheets',error)
    }
  },
  async encodeAllSheets({dispatch, commit, state}, sheets){
    try {
      let nameEncoder = new numerationEncoder()
      await nameEncoder.init()
      let decodedNamedSheets = nameEncoder.decodeAllSheets(sheets)
      // console.log('decodedNamedSheets',decodedNamedSheets)
      let newlyNamedSheetsWithoutDoubles = nameEncoder._checkAndReturnWithoutDoubles(decodedNamedSheets)
      let encodedNamedSheets = nameEncoder.encodeAllSheetsElements(newlyNamedSheetsWithoutDoubles)
      // console.log('encodedNamedSheets',encodedNamedSheets)
      // const simplifiedSheets = nameEncoder.simplifySheetsHierarhy(encodedNamedSheets)
      // console.log('simplifiedSheets',simplifiedSheets)
      await nameEncoder.renameAllSheets(encodedNamedSheets)
      await nameEncoder.syncExcelContext()   
    } catch (error) {
      console.log('encodeAllSheets',error)
    }
  },
  async decodeAllSheets({dispatch, commit, state}, sheets){
    let nameEncoder = new numerationEncoder()
    await nameEncoder.init()
    let newlyNamedSheets = nameEncoder.decodeAllSheets(sheets)
    let newlyNamedSheetsWithoutDoubles = nameEncoder._checkAndReturnWithoutDoubles(newlyNamedSheets)
    await nameEncoder.renameAllSheets(newlyNamedSheetsWithoutDoubles)
    await nameEncoder.syncExcelContext()   
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
  async updateSpecificElement({dispatch, commit,state},{id,elements}){
    try {
      const currentElements = state.elements
      const el = currentElements.find(el=>el.id==id)
      // console.log('elements 22',elements)
      let sheetEncoder = new numerationEncoder()
      await sheetEncoder.init()
      let context = await sheetEncoder.excelContext()
      const [outerCounter,innerCounter] = sheetEncoder.decode(el.name)
      const newElements = sheetEncoder.encodeAllSheets({sheets:elements,outerCounter})
      // console.log('newElements 2',newElements)
      commit('updateSpecificElement',{id,elements:newElements})
      const itemPositioner = new WorksheetsLoader()
      itemPositioner.init(context)
      // console.log('newElementsUpdate',newElements)
      await sheetEncoder.renameAllSheets(newElements)
      await itemPositioner.changeSheetsPositions(newElements)
      await context.sync()
      // await dispatch('updateElements',state.elements)
      // console.log('elements 2',Object.freeze(state.elements))

    } catch (error) {
      console.log('updateSpecificElement',error)
    }

  },
  async updateElements ({dispatch, commit, state}, elements) {
    try {
      /** FIXME: strange problem - 
       * sheet does not move from root elements to children, 
       * it just creating a copy
       * also it causes error with numeration
       * */
      // await dispatch('loadWorksheetsDetailed',{allItems:elements,activeItemId: state.activeSheetId})
      console.log('__ elements',elements)
      /** old code */
      const positioningType = state.appSettings.positioningType
      let newSheetOrder = []
      let nameEncoder = new numerationEncoder()
      await nameEncoder.init()
      let context = await nameEncoder.excelContext()
      switch (positioningType) {
        case enumPositioningOptions.default:
          /** FIXME: refactor to simplify its */
          newSheetOrder = elements;
          break;
        case enumPositioningOptions.numeratedGroups:
          // changing names - adding numeration
          /** FIXME: refactor encodeAllSheets */
          newSheetOrder = nameEncoder.encodeAllSheetsElements(elements)
          console.log('newSheetOrder after encoder',newSheetOrder)
          // const simplifiedSheets = nameEncoder.simplifySheetsHierarhy(newSheetOrder)
          await nameEncoder.renameAllSheets(newSheetOrder)
          // console.log('1. simplifiedSheets',simplifiedSheets)

          break;
      }
      console.log('1. updateElements after switch',newSheetOrder)

      // check which sheet changed
      const itemLoader = new WorksheetsLoader();
      await itemLoader.init(context)
      /** FIXME: refactor changePositions if there is more then one level*/
      await itemLoader.changeSheetsPositions(newSheetOrder);   
      await context.sync()
      // console.log('2. updateElements after changeSheetsPositions',newSheetOrder)
      commit('updateElements',newSheetOrder);   
    } catch (error) {
      commit('log',error)
    }

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
    let itemLoader = new WorksheetsLoader()
    await itemLoader.init()
    console.log('dispatch reorder worksheet',{id, position})
    await itemLoader.reorderSheets({changedItems:[{id, position}]})
    await itemLoader.syncExcelContext()
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
