/// <reference path="../index.d.ts"/>

namespace SheetElementsInterface {
  export interface Positions {
    first: number;
    second: number;
  }
  export type sheetsSource = Excel.Worksheet[] | any[]
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
  export type SheetVisibility =
    | Excel.SheetVisibility
    | "Visible"
    | "Hidden"
    | "VeryHidden";
  export interface SheetElement extends Basic {
    id: string;
    name: string;
    visibility: SheetVisibility;
    color: string;
    elements: EMap;
    positions: Positions;
    _doesNameIncludesNumerationPattern(): boolean;
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
  export interface SheetElementsMap extends Basic {
    maintainerStatuses: {
      areSheetsHaveNumeration: boolean;
      isNumerationBroken: boolean;
      shouldWeRestoreNumeration: boolean;
    };
    firstOpenScenarioCreateSheetElements(
      excelSheets: sheetsSource
    ): Promise<void>;
    sheetsNumerationRepairer(): Promise<void>;
    reorderSheets({
      requereToCorrectType
    }: {
      requereToCorrectType: boolean;
    }): Promise<void>;
    correctDoubles(): Promise<void>;
    writeSheets(sheetsEMap: SheetElementsInterface.EMap): void;
    entries(): IterableIterator<[string, SheetElementsInterface.SheetElement]>;
  }
  export interface SheetElementsMapConstructor extends BasicConstructor {
    excelSheets: sheetsSource
  }
}
