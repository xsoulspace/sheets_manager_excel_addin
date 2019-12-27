/// <reference path="../index.d.ts"/>

namespace SheetElementsInterface {
  export interface Positions {
    first: number;
    second: number;
  }
  export type ClassTitle = "Basic" | "SheetElement";
  export interface Basic {
    _classTitle: ClassTitle;
    id: string;
    name: string;
    isVisible: boolean;
    color: string;
    typeOfName: NameType;
    log: LogInterface;
  }
  export interface BasicConstructor {
    _classTitle: ClassTitle | undefined;
    id: string;
    name: string;
    isVisible: boolean;
    color: string;
    typeOfName: NameType;
  }
  export type NameType = "_excelSheetName" | "_decodedName" | "_encodedName";
  export interface MapConfig {
    typeOfName: NameType;
  }

  export interface SheetElementConstructor extends BasicConstructor {
    delimiter: string | undefined;
    elements: EMap;
    positions: Positions;
  }
  export interface SheetElement extends Basic {
    delimiter: string;
    elements: EMap;
    positions: Positions;
  }
  export interface EMap extends Map<SheetElement["id"], SheetElement> {}
}
