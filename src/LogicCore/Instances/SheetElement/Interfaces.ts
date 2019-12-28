/// <reference path="../index.d.ts"/>

namespace SheetElementsInterface {
  export interface Positions {
    first: number;
    second: number;
  }
  export type ClassTitle = "Basic" | "SheetElement" | "SheetElementsMap";
  export interface Basic {
    _classTitle: ClassTitle;
    typeOfName: NameType;
    log: LogInterface;
    delimiter: string;
  }
  export interface BasicConstructor {
    _classTitle: ClassTitle | undefined;
    typeOfName: NameType;
    delimiter: string | undefined;
  }
  export type NameType = "_excelSheetName" | "_decodedName" | "_encodedName";
  export type SheetVisibility = Excel.SheetVisibility | "Visible" | "Hidden" | "VeryHidden"
  export interface SheetElement extends Basic {
    id: string;
    name: string;
    visibility: SheetVisibility;
    color: string;
    elements: EMap;
    positions: Positions;
    _doesNameIncludesNumerationPattern():boolean
  }
  export interface SheetElementConstructor extends BasicConstructor {
    id: string;
    name: string;
    visibility: SheetVisibility;
    color: string;
    elements: EMap | undefined;
    positions: Positions;
  }
  export interface EMap extends Map<SheetElement["id"], SheetElement> {}
  export interface SheetElementsMap extends Basic{
    entries():IterableIterator<[string, SheetElementsInterface.SheetElement]>
  }
  export interface SheetElementsMapConstructor extends BasicConstructor{
    excelSheets: Excel.Worksheet[]
  }

}
