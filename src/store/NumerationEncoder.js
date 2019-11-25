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
numerationEncoder.prototype._checkAndReturnWithoutDoubles = function(sheets){
  try {
    let newSheets = {}
    let i = 1
    for(let sheet of Object.values(sheets)){
      const sheetName = sheet.name
      if(sheetName in newSheets){
        const newSheetName = sheetName + String(i)
        sheet.name = newSheetName
        i++
        newSheets[newSheetName]=sheet
      } else {
        newSheets[sheetName]=sheet
      }
    }
    return Object.values(newSheets)
  } catch (error) {
    console.log('numerationEncoder._checkAndReturnWithoutDoubles',error)
  }
}

numerationEncoder.prototype.createSheets=function(elements){
  try {
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
  } catch (error) {
    console.log('numerationEncoder.createSheets',error)
  }
}

numerationEncoder.prototype.createNumeratedSheets = function (elements){
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
 try {
  let elementProto = {
    id: "",
    name: "",
    color: "",
    isVisible: "",
    elements: {}
  } 
  let areItemsWereShifted = false
  let maxFirstNumber = 0
  let allTempElements ={}
  const DEL = "DEL"
  // console.log('sheets elements',elements)
  let self = this
  for(let sheet of Object.values(elements)){
    let shiftNumber = 0
    let element = {
      id: sheet.id,
      name: sheet.name,
      color: sheet.tabColor,
      isVisible: sheet.visibility,
      elements: {}
    }

    let positions = self.decode(element.name)
    /** if positions failed, then we need to rename all sheets 
     * and then start process again
    */
    if(positions == false){
      console.log("warn",element.name)
      return {items: self.createSheets(elements), status: false}
    }
    
    /** Check is it in a group or not */
    let [firstPosition, secondPosition] = positions

    function setNewMaxFirstPosition(newOne){
      try {
        maxFirstNumber= newOne > maxFirstNumber ? newOne : maxFirstNumber        
      } catch (error) {
        console.log('setNewMaxFirstPosition',error)
      }
    }
    function newFirstPosition(){
      try {
        return (firstPosition + shiftNumber)        
      } catch (error) {
        console.log('newFirstPosition',error)
      }
    }
    function shiftedFirstPosition(){
      try {
        return DEL+newFirstPosition()        
      } catch (error) {
        console.log('shiftedFirstPosition',error)
      }
    }
    let shiftedFirstPositionWithKey = shiftedFirstPosition()
    let el
    const elementExists = shiftedFirstPositionWithKey in allTempElements
    if(elementExists){
      el = allTempElements[shiftedFirstPositionWithKey]
    } else {
      el = elementProto
    }
    
    const isItChildElement = Number(secondPosition)> 0
    if(isItChildElement){
      // console.log('child element',element)
      let maxChildrenNumber =0
      function childId(){
        if(maxChildrenNumber>0){
          const max = (maxChildrenNumber+1 > secondPosition ? maxChildrenNumber : secondPosition)
          return DEL+(max+1)
        } else {
          return DEL+secondPosition
        } 
      }
      const isChildExists = childId() in el.elements
      // console.log(isChildExists)
      if(isChildExists){
        maxChildrenNumber = Object.values(el.elements).length
        areItemsWereShifted = true
      }
      // console.log('maxNumber',{id:childId(),maxChildrenNumber})
      el.elements[childId()] = element
      allTempElements[shiftedFirstPositionWithKey] = el
      // console.log('children all elements',{all:(allTempElements),el})
    } else {
      /** check name of element, if it is not equal 
       * and its not proto, then we need to 
       * shift it down
       * */
      // console.log('el/element',{el,element})
      /** FIXME: algorithm of children and parents is broken */
      switch (true) {
        case !elementExists:
          // console.log('element not exists',element)
          allTempElements[DEL+firstPosition] = element
          break;
        case el.name == elementProto.name:
          // console.log('el.name == elementProto.name',element)
          let childElements = el.elements
          element.elements = childElements
          allTempElements[DEL+firstPosition] = element
          break;
        case el.id != element.id:
          /** need to shift element */
          // console.log('el.id != element.id',element)
          shiftNumber++
          areItemsWereShifted = true
          const newMaxNumber = maxFirstNumber+shiftNumber
          setNewMaxFirstPosition(newMaxNumber)
          allTempElements[DEL+(newMaxNumber)] = element
          break;
        default:
          console.log("what's going on? detailed loading worksheet", element)
          break;
      }
      setNewMaxFirstPosition(firstPosition + shiftNumber)
    }
    // console.log('el',el)
  }

  function cleanDelimiters(keys){
    try {
      let newKeys= []
      for(let key of keys){
        const newKey = key.replace(DEL,"")
        newKeys.push(newKey)
      }
      return newKeys      
    } catch (error) {
      console.log('cleanDelimiters',error)
    }
  }

  /** let's reorder all items */
  function reordering(groupElements){
    try {
      let groupValues = []
      let groupKeys = cleanDelimiters(Object.keys(groupElements))
      groupKeys.sort((a,b)=>a-b)
      for(let key of groupKeys){
        const el = groupElements[DEL+key]
        /** if child elements >0 then we need to reorder them too*/
        let childElements = Object.keys(el.elements).length>0 ? reordering(el.elements) : []
        el.elements = childElements
        groupValues.push(el)
      }
      return groupValues      
    } catch (error) {
      console.log('reordering',error)
    }
  }

  let reorderedItems = reordering(allTempElements)
  // console.log(reorderedItems)
  // console.log('reorderedItems',reorderedItems)
  let encodedItems = self.encodeAllSheetsElements(reorderedItems)
  // console.log('encodedItems',encodedItems)
  // console.log(areItemsWereShifted)
  return {items: encodedItems, status: true, areItemsWereShifted}
 } catch (error) {
   console.log('numerationEncoder.createNumeratedSheets',error)
 } 
}

numerationEncoder.prototype.renameAllSheets = async function(newlyNamedSheets){
  await Excel.run(async context=>{
    try {
      // console.log('rnm',Object.freeze(newlyNamedSheets))
      let sheets = context.workbook.worksheets;
      for(let newSheet of Object.values(newlyNamedSheets)){
        let sheet = sheets.getItem(newSheet.id)
        // console.log('parentname',newSheet.name)
        sheet.name = newSheet.name
        const elements = Object.values(newSheet.elements)
        if(elements.length>0){
          for(let childSheet of elements){
            let realSheet = sheets.getItem(childSheet.id)
            // console.log('childname',childSheet.name)
            realSheet.name = childSheet.name
          }
        }
      }
      return await context.sync()      
    } catch (error) {
      console.log('numerationEncoder.renameAllSheets.context',error)
    }
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

numerationEncoder.prototype.encodeAllSheets = function({sheets,outerCounter}){
  try {
    let newSheetOrder = []
    let innerCounter = 1
    let self =this
    function encodeSheetName(innerSheet){
      const newSheet = innerSheet
      let nameEncoder = new numerationEncoder()
      let [outerCounterDecoded,innerCounterDecoded] = self.decode(innerSheet.name)
      newSheet.name = nameEncoder.encode(
        innerSheet.name,
        outerCounter==undefined ? outerCounterDecoded : outerCounter,
        innerCounter
      )
      return newSheet
    }
    
    for(let sheet of Object.values(sheets)){
      const newSheet = encodeSheetName(sheet)
      newSheetOrder.push(newSheet)      
      innerCounter++
    }
    return newSheetOrder
  } catch (error) {
    console.log('numerationEncoder.encodeAllSheets',error)
  }
}

numerationEncoder.prototype.encodeAllSheetsElements = function(sheets){
  try {
    // console.log('encodeAllSheetsElements',sheets)
    let outerCounter = 0
    let innerCounter = 0
    let self = this
    function encodeSheetName(innerSheet){
      const newSheet = innerSheet
      newSheet.name = self.encode(
        innerSheet.name,outerCounter,innerCounter
      )
      return newSheet
    }
    // console.log('sheets inside',sheets)
    let newSheetOrder = Object.values(sheets).map(sheet=>{
      const newSheet = encodeSheetName(sheet)
      const newSheetElements = Object.values(newSheet.elements)
      // console.log(newSheet)
      // console.log('newSheetElements until',newSheetElements)
      if(newSheetElements.length>0){
        const newElements = newSheetElements.map(childSheet=>{
          innerCounter++
          const newChildSheet = encodeSheetName(childSheet)
          return newChildSheet
        })
        newSheet.elements = newElements
      }
      // console.log('newSheetElements after',newSheetElements)      
      outerCounter++
      innerCounter = 0
      return newSheet
    })
    // console.log('newSheetOrderInside',newSheetOrder)
    return newSheetOrder
  } catch (error) {
    console.log('numerationEncoder.encodeAllSheetsElements',error)
  }
}

export default numerationEncoder