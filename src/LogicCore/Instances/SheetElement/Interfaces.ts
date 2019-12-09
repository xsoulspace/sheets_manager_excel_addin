/// <reference path="Index.ts"/>
namespace Elements{
  export interface SheetElementPositionsInterface{
    firstNumber: number
    secondNumber: number
  }
  interface SheetElementBasicInterface {
    id: string
    name: string
    isVisible: string
    color: string
    typeOfName: ExcelSheetNameType 
  }
  export type ExcelSheetNameType = "_excelSheetName" | "_decodedName" | "_encodedName"
  export interface SheetElementsMapConfigInterface{
    typeOfName: ExcelSheetNameType
  }
  
  export interface SheetElementConstructorInterface extends SheetElementBasicInterface{
    positionFirst?:number
    positionSecond?:number
    delimiter?:string
    elements?:SheetElementsMapInterface,
  }
  export interface SheetElementInterface extends SheetElementBasicInterface{
    delimiter: string
    elements: SheetElementsInterface
    positions: SheetElementPositionsInterface
  }
  export interface SheetElementsMapInterface extends Map
    <SheetElementInterface["id"], SheetElementInterface
    >{}
  export interface SheetElementsMapEntriesInterface extends IterableIterator<[string, SheetElementInterface]>{}
  export interface SheetElementsInterface {
    entries(): SheetElementsMapEntriesInterface | undefined
  }
}
