/// <reference path="Index.ts"/>
interface SheetElementsMapConfigInterface{
  typeOfName: string
}

namespace Elements{
  export class SheetElementsMap implements SheetElementsInterface  {
    constructor({typeOfName}:SheetElementsMapConfigInterface,excelSheets: Excel.Worksheet[]) {
      if(excelSheets !== undefined) this.createSheetElements(excelSheets)
      this.typeOfName = typeOfName
    }
    public typeOfName: string
    private _map= new Map() as SheetElementsMapInterface
    public entries(){
      try {
        return this._map.entries()
      } catch (error) {
        
      }
    }
    public rewriteItems(values: SheetElementsMapInterface): void{
      try {
        this._map = values
      } catch (error) {
        
      }
    }
    public createSheetElements(excelSheets: Excel.Worksheet[]): void{
      try {
        let allElements = new Map() as SheetElementsMapInterface
        for(const excelSheet of excelSheets){
          const element = new SheetElement()
          element.color = excelSheet.tabColor
          element.name = excelSheet.name
          element.typeOfName = this.typeOfName
          element.id = excelSheet.id
          element.isVisible = excelSheet.visibility
          allElements.set(element.id,element)
        }
        this.rewriteItems(allElements)
      } catch (error) {
        console.log('createSheetElements',error)
      }
    }
    public correctDoubles(): void{
      try {
        let newSheets = new Map() as SheetElementsMapInterface
        let sheetNames: Array<string>= []
        let i: number = 1
        for(const [sheetId, sheet] of this.entries()){
  
          if(sheet === undefined) throw "correctDoubles has sheet === undefined";
  
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
        this.rewriteItems(newSheets)
      } catch (error) {
        console.log('correctDoubles',error)
      }
    }
  }
}