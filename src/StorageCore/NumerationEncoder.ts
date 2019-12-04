/** Interfaces */
import {SheetElement, SheetElements} from "./Interfaces";
/** Classes */
import {ExcelBuilder} from "@/LogicCore/APIExcel/ExcelBuilder"

interface returnedNumbers {
  items: number[],
  status: boolean
}

export class numerationEncoder extends ExcelBuilder{
  public delimiter: string = "_"
  constructor(context?: Excel.RequestContext) {
    super(context)
  }

  encode(sentence: string, firstNumber: number =0, secondNumber: number =0): string{
    /** 1. extract possible pattern -> 00_00 but it can be e0_0uio,
     * so it is necessary to clean up after match and separate to two numbers
     * 2. to clean up pattern 0_0 and all numbers in name
     * 3. create new name 
     */
    const cleanSentence: string = sentence.replace(/(.\d_\d.)/g, "")
    
    const firstPart: string = returnPart(firstNumber)
    const secondPart: string = returnPart(secondNumber)
    const readyPattern: string = firstPart + this.delimiter + secondPart
    return cleanSentence + readyPattern
  
    function returnPart(draftValue: number): string{
      return draftValue > 9 ? draftValue.toString() : "0" + draftValue.toString()
    }
  }
  decode(sentence: string): returnedNumbers | undefined{
    try {
      const cleanPatternArray: Array<string> | null = sentence.match(/(.\d_\d.)/g)
      if(cleanPatternArray !== null){
        const cleanPattern: string | Number = cleanPatternArray[0]
        const positionsArray: Array<string | Number> = cleanPattern.split(this.delimiter)
        const newArr: Array<number> = positionsArray.map(el=>Number(el))
        return {items: newArr,status: true}
      } else {
        return {items: [], status:false}
      }
    } catch (error) {
      console.log('numerationEncoder.decode',error)
    }
  }
  decodeAndClean(sentence: string): string | undefined{
    try {
      const sentenceWithoutNumeration: string = sentence.replace(/(.\d_\d.)/g,"")
      // const sentenceWithoutNumbers = sentenceWithoutNumeration.replace(/(\d)/g,"")
      return sentenceWithoutNumeration
    } catch (error) {
      console.log('numerationEncoder.decode',error)
    }
  }
  /**
   * The main principle:
   * we create array and for each item starting to 
   * push old name or if its exists - corrected name
   * FIXME: Works only with no children elements!
   * @param sheets are sheetElements
   */
  _checkAndReturnWithoutDoubles(sheets: SheetElements): SheetElements | undefined{
    try {
      let newSheets: Map<SheetElement["id"],SheetElement> = new Map()
      let sheetNames: Array<string>= []
      let i: number = 1
      for(const [sheetId, sheet] of sheets){

        if(sheet === undefined) throw "some error";

        const sheetName: string = sheet.name
        let finalSheetName: string
        if(sheetNames.includes(sheetName)){
          const newSheetName:string = sheetName + String(i)
          sheet.name = newSheetName
          i++
          finalSheetName = newSheetName
        } else {
          finalSheetName = sheetName
        }
        sheetNames.push(finalSheetName)
        newSheets.set(sheetId,sheet)
      }
      return newSheets
    } catch (error) {
      console.log('numerationEncoder._checkAndReturnWithoutDoubles',error)
    }
  }
  createSheets(excelSheets: Excel.Worksheet[]): SheetElements | undefined{
    try {
      let allElements: SheetElements = new Map()
      for(const excelSheet of excelSheets){
        const element: SheetElement = {
          id: excelSheet.id,
          name: excelSheet.name,
          color: excelSheet.tabColor,
          orderNumber: "",
          isVisible: excelSheet.visibility,
          elements: {} as SheetElements
        }
        allElements.set(element.id,element)
      }
      return allElements
    } catch (error) {
      console.log('numerationEncoder.createSheets',error)
    }
  }
  createNumeratedSheets (excelSheets: Excel.Worksheet[]): 
  {items: SheetElements | undefined, status: boolean} | undefined{
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
    let elementProto: SheetElement = {
      id: "",
      name: "",
      color: "",
      orderNumber: "",
      isVisible: "",
      elements: new Map(),
    } 
    let areItemsWereShifted: boolean = false
    let maxFirstNumber: number = 0
    let allTempElements: Map<SheetElement['id'], SheetElement> = new Map()
    const DEL: string = "DEL"
    // console.log('sheets elements',elements)
    for(let sheet of excelSheets){
      let shiftNumber: number = 0
      let element: SheetElement = {
        id: sheet.id,
        name: sheet.name,
        color: sheet.tabColor,
        orderNumber: "",
        isVisible: sheet.visibility,
        elements: new Map() as SheetElements
      }
  
      let positions: returnedNumbers | undefined = this.decode(element.name)
      /** if positions failed, then we need to rename all sheets 
       * and then start process again
      */
      if(positions === undefined) return {items: undefined, status: false}
      if(positions.status == false){
        console.log("warn",element.name)
        return {items: this.createSheets(excelSheets), status: false}
      }
      
      /** Check is it in a group or not */
      let [firstPosition, secondPosition] = positions.items
  
      function setNewMaxFirstPosition(newOne: number): void{
        try {
          maxFirstNumber= newOne > maxFirstNumber ? newOne : maxFirstNumber        
        } catch (error) {
          console.log('setNewMaxFirstPosition',error)
        }
      }
      class ShiftedFirstPosition {
        constructor() {}
        static onlyNumber: number = firstPosition + shiftNumber
        static withKey: string = DEL+ ShiftedFirstPosition.onlyNumber   
      }

      let el: SheetElement | undefined
      const elementExists: boolean = allTempElements.has(ShiftedFirstPosition.withKey)
      if(elementExists){
        el = allTempElements.get(ShiftedFirstPosition.withKey)
      } else {
        el = elementProto
      }     
      if(el === undefined) throw "some error";
      const isItChildElement: boolean = Number(secondPosition)> 0

      if(isItChildElement){
        // console.log('child element',element)
        let maxChildrenNumber: number =0
        function childId():string{
          if(maxChildrenNumber>0){
            const max:number = (maxChildrenNumber+1 > secondPosition ? maxChildrenNumber : secondPosition)
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
        el.elements.set(childId(),element)
        allTempElements.set(ShiftedFirstPosition.withKey, el)
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
            allTempElements.set(DEL+firstPosition,element)
            break;
          case el.name == elementProto.name:
            // console.log('el.name == elementProto.name',element)
            let childElements = el.elements
            element.elements = childElements
            allTempElements.set(DEL+firstPosition,element)
            break;
          case el.id != element.id:
            /** need to shift element */
            // console.log('el.id != element.id',element)
            shiftNumber++
            areItemsWereShifted = true
            const newMaxNumber = maxFirstNumber+shiftNumber
            setNewMaxFirstPosition(newMaxNumber)
            allTempElements.set(DEL+newMaxNumber, element)
            break;
          default:
            console.log("what's going on? detailed loading worksheet", element)
            break;
        }
        setNewMaxFirstPosition(firstPosition + shiftNumber)
        
      }
      // console.log('el',el)
    }
  
    function cleanDelimiters(keys: string[]): number[] | undefined{
      try {
        let newKeys: number[] = []
        for(let key of keys){
          const newKey: number = Number(key.replace(DEL,""))
          newKeys.push(newKey)
        }
        return newKeys      
      } catch (error) {
        console.log('cleanDelimiters',error)
      }
    }
  
    /** let's reorder all items */
    function reordering(groupElements: Map<string, SheetElement>){
      try {
        let groupValues: SheetElement[] = []
        let groupKeys: number[] | undefined = cleanDelimiters(Object.keys(groupElements))
        if(groupKeys !== undefined){
          groupKeys.sort((a,b)=>a-b)
          for(let key of groupKeys){
            const el: SheetElement | undefined = groupElements.get(DEL+key)
            if(el !== undefined){
              /** if child elements >0 then we need to reorder them too*/
              let newEl = new Object()
              let childElements: SheetElement[] | undefined
              for(let [propKey,propValue] of Object.entries(el)){
                if(propKey == "elements"){
                  const childKeys: string[] = Object.keys(el.elements)
                  childElements = childKeys.length>0 ? reordering(el.elements) : []
                } else {
                  newEl[propKey]=propValue
                }
              }
              // Object.assign(newEl, el)
              // el.elements = childElements
              // groupValues.push(el)
            } else {
              /** throw error */
            }
          }
          return groupValues      
        } else {
          /** throw error */
        }
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
  async renameAllSheets(newlyNamedSheets){
    try {
      // console.log('rnm',Object.freeze(newlyNamedSheets))
      let context = await this._context
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
    } catch (error) {
      console.log('numerationEncoder.renameAllSheets',error)
    }
  }
  decodeAllSheets(sheets){
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
  encodeAllSheets({sheets,outerCounter}){
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
  encodeAllSheetsElements(sheets){
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
}

export default numerationEncoder