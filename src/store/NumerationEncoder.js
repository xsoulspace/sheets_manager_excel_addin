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
    const sentenceWithoutNumbers = sentenceWithoutNumeration.replace(/(\d)/g,"")
    return sentenceWithoutNumbers
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

numerationEncoder.prototype.simplifySheetsHierarhy=function(sheets){
  try {
    let newSheets = []
    for(let sheet of sheets){
      newSheets.push(sheet)
      if(sheet.elements.length>0){
        for(let childSheet of sheet.elements){
          newSheets.push(childSheet)
        }
      }
    }
    return newSheets
  } catch (error) {
    console.log('numerationEncoder.simplifySheetsHierarhy',error)
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

export default numerationEncoder