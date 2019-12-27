import { Basic } from "./Basic";

export class SheetElementsMap extends Basic
  implements SheetElementsInterface.SheetElementsMap {
  // #region Properties (1)

  private _map: SheetElementsInterface.EMap = new Map();

  // #endregion Properties (1)

  // #region Constructors (1)

  constructor({
    typeOfName
  }: SheetElementsInterface.SheetElementsMapConstructor) {
    super({ _classTitle: "SheetElementsMap", typeOfName });
    Promise.resolve(this.firstOpenScenarioCreateSheetElements());
  }

  // #endregion Constructors (1)

  // #region Public Methods (4)

  public correctDoubles(): void {
    try {
      let newSheets: SheetElementsInterface.EMap = new Map();
      let sheetNames: string[] = [];
      let i: number = 1;
      const entries = this.entries();
      for (const [sheetId, sheet] of entries) {
        if (sheet === undefined) throw "correctDoubles has sheet === undefined";

        const sheetName: string = sheet.name;
        let finalSheetName: string;
        if (sheetNames.includes(sheetName)) {
          const newSheetName: string = sheetName + String(i);
          sheet.name = newSheetName;
          i++;
          finalSheetName = newSheetName;
        } else {
          finalSheetName = sheetName;
        }
        sheetNames.push(finalSheetName);
        newSheets.set(sheetId, sheet);
      }

      this.writeSheets(newSheets);
    } catch (error) {
      throw this.log.error("correctDoubles", error);
    }
  }

  public entries() {
    try {
      const entries = this._map.entries();
      return entries;
    } catch (error) {
      throw this.log.error("entries", error);
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
   */
  public async firstOpenScenarioCreateSheetElements(): Promise<void> {
    try {

    } catch (error) {
      throw this.log.error("firstOpenScenarioCreateSheetElements", error);
    }
  }

  public writeSheets(sheetsEMap: SheetElementsInterface.EMap): void {
    try {
      this._map = sheetsEMap;
    } catch (error) {
      throw this.log.error("writeSheets", error);
    }
  }

  // #endregion Public Methods (4)

  // #region Private Methods (1)

  private _simpleSheetsLoading(excelSheets: Excel.Worksheet[]): void {
    try {
      let allElements: SheetElementsInterface.EMap = new Map();
      for (const [index, excelSheet] of Object.entries(excelSheets)) {
        const positions: SheetElementsInterface.Positions ={
          first: Number(index),
          second: 0,
        }
        const options: SheetElementsInterface.SheetElementConstructor ={
          color: excelSheet.tabColor,
          name: excelSheet.name,
          typeOfName: this.typeOfName,
          positions,
          id: excelSheet.id,
          visibility: excelSheet.visibility
        }
  
        const element = new SheetElement({
          
        });

        allElements.set(element.id, element);
      }
      this.writeSheets(allElements);
    } catch (error) {
      console.log("simpleSheetsLoading", error);
    }
  }

  // #endregion Private Methods (1)
}
