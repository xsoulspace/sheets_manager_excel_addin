/// <reference path="Index.ts"/>
namespace Elements{
  export interface SheetElementInterface{
    id: string
    name: string
    isVisible: string
    color: string
    elements: SheetElementsInterface
    delimiter: string
    typeOfName: string 
    positions: {
      firstNumber: number
      secondNumber: number
    }
  }
  export interface SheetElementsMapInterface extends Map
    <SheetElementInterface["id"], SheetElementInterface
    >{}
  export interface SheetElementsInterface {
    entries(): IterableIterator<[string, SheetElementInterface]>
  }
}
