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
  }
  export interface BasicConstructor {
    _classTitle: ClassTitle | undefined;
    typeOfName: NameType;
  }
  export type NameType = "_excelSheetName" | "_decodedName" | "_encodedName";
  export interface SheetElement extends Basic {
    id: string;
    name: string;
    visibility: Excel.SheetVisibility;
    color: string;
    delimiter: string;
    elements: EMap;
    positions: Positions;
  }
  export interface SheetElementConstructor extends BasicConstructor {
    id: string;
    name: string;
    visibility: Excel.SheetVisibility;
    color: string;
    delimiter: string | undefined;
    elements: EMap;
    positions: Positions;
  }
  export interface EMap extends Map<SheetElement["id"], SheetElement> {}
  export interface SheetElementsMap extends Basic{
    entries():IterableIterator<[string, SheetElementsInterface.SheetElement]>
  }
  export interface SheetElementsMapConstructor extends BasicConstructor{}

}
