/// <reference path="Index.ts"/>


namespace Elements{
  export class SheetElementsMap implements SheetElementsInterface  {
    constructor({typeOfName}:SheetElementsMapConfigInterface,excelSheets: Excel.Worksheet[]) {
      if(excelSheets !== undefined) this.firstOpenScenarioCreateSheetElements(excelSheets)
      this.typeOfName = typeOfName
    }
    public typeOfName: ExcelSheetNameType
    private _map= new Map() as SheetElementsMapInterface
    public entries(): SheetElementsMapEntriesInterface | undefined{
      try {
        const entries: SheetElementsMapEntriesInterface = this._map.entries()
        return entries;
      } catch (error) {
        
      }
    }
    public rewriteItems(values: SheetElementsMapInterface): void{
      try {
        this._map = values
      } catch (error) {
        
      }
    }
    /**
     * We need to check:
     * 1. Is it has numeration?
     * 1.1 It has, but not full - we need to show dialogue
     * restore all or go simple?
     * 1.2 Yes - Correct all numeration
     * 1.3 Reordering sheets
     * 1.4 Check for doubles
     * 1.4 Renaming
     * 1.5 No - go simple
     * 1.2 It has and all is correct
     * 1.3 Reordering sheets
     * 2. Go simple: load original names
     * @param excelSheets 
     */
    public firstOpenScenarioCreateSheetElements(excelSheets: Excel.Worksheet[]): void{
      try {
        for (let sheet of excelSheets) {
          
          
        }
      } catch (error) {
        console.log("createSheetElements", error)
      }
    }
    private _simpleSheetsLoading(excelSheets: Excel.Worksheet[]): void {
      try {
        let allElements = new Map() as SheetElementsMapInterface
        for(const [index,excelSheet] of Object.entries(excelSheets)){
          const element = new SheetElement({
            color : excelSheet.tabColor,
            name : excelSheet.name,
            typeOfName : this.typeOfName,
            positionFirst: Number(index),
            id : excelSheet.id,
            isVisible : excelSheet.visibility,
          })

          allElements.set(element.id,element)
        }
        this.rewriteItems(allElements)
      } catch (error) {
        console.log('simpleSheetsLoading',error)
      }
    }
    public correctDoubles(): void{
      try {
        let newSheets = new Map() as SheetElementsMapInterface
        let sheetNames: Array<string>= []
        let i: number = 1
        const entries= this.entries()
        
        if(entries === undefined) throw "correctDoubles entries error";
        
        for(const [sheetId, sheet] of entries){
  
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