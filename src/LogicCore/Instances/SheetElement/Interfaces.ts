/// <reference path="../index.d.ts"/>

namespace SheetElementsInterface {
  export interface Positions {
    firstNumber: number;
    secondNumber: number;
  }
  export interface Basic {
    id: string;
    name: string;
    isVisible: boolean;
    color: string;
    typeOfName: NameType;
  }
  export interface BasicConstructor extends Basic {}
  export type NameType = "_excelSheetName" | "_decodedName" | "_encodedName";
  export interface MapConfig {
    typeOfName: NameType;
  }

  export interface SheetElementConstructor extends BasicConstructor {
    delimiter: string | undefined;
    elements: EMap;
  }
  export interface SheetElement extends Basic {
    delimiter: string;
    elements: EMap;
    positions: Positions;
  }
  export interface EMap
    extends Map<SheetElement["id"], SheetElement> {}
}
