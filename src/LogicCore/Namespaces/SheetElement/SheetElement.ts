/// <reference path="Index.ts"/>
namespace Elements{
  export class SheetElement implements SheetElementInterface{
    constructor() {}
    public id: string
    public set name(value: string){
      try {
        this[this.typeOfName] = value
      } catch (error) {
        
      }
    }
    public get name(): string{
      try {
        return this[this.typeOfName]
      } catch (error) {
        
      }
    }
    public isVisible: string
    public color: string
    public elements: SheetElementsInterface
    public delimiter: string = "_"
    public typeOfName: string 
    public positions: {
      firstNumber: 0
      secondNumber: 0
    }
    private _excelName: string
    private set _decodedName(value: string) {
      try {
        this._excelName = value
      } catch (error) {
        
      }
    }
    private get _decodedName(): string {
      try {
        const sentence = this._excelName
        const cleanSentence: string = sentence.replace(/(.\d_\d.)/g, "")
        return cleanSentence
      } catch (error) {
        
      }
    }
    private set _encodedName(value: string) {
      try {
        const readyPattern: string = this._numerationPattern()
        this._excelName = value + readyPattern
      } catch (error) {
        
      }
    }
    /** 1. extract possible pattern -> 00_00 but it can be e0_0uio,
     * so it is necessary to clean up after match and separate to two numbers
     * 2. to clean up pattern 0_0 and all numbers in name
     * 3. create new name 
     */
    private get _encodedName(): string {
      try {
        const cleanSentence: string = this._decodedName
        const readyPattern: string = this._numerationPattern()

        return cleanSentence + readyPattern
      } catch (error) {
        
      }
    }
    private _numerationPattern(): string {
      try {
        function returnPart(draftValue: number): string{
          return draftValue > 9 ? String(draftValue) : "0" + String(draftValue)
        }
        const firstPart: string = returnPart(this.positions.firstNumber)
        const secondPart: string = returnPart(this.positions.secondNumber)
        const readyPattern: string = firstPart + this.delimiter + secondPart

        return readyPattern
      
      } catch (error) {
        
      }
    }
  }
  
  export const SheetElementConfig = {
    typeOfName: {
      originalName: "_excelName", 
      simpleName: "_decodedName",
      numeratedName: "_encodedName",
    }
  }
}
