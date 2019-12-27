export class SheetElement extends Basic implements SheetElementsInterface.SheetElement{
    // #region Properties (9)

    private _excelSheetName: string
    private _regExpNumeration: RegExp = /(.\d_\d.)/g

    public color: string
    public delimiter: string = "_"
    public elements: SheetElementsMapInterface
    public id: string
    public isVisible: string
    public positions = {} as SheetElementPositionsInterface
    public typeOfName: ExcelSheetNameType

    // #endregion Properties (9)

    // #region Constructors (1)

    constructor(
      {
        id, name, isVisible, color,
        typeOfName, positionFirst, positionSecond,
        delimiter, elements,
      }: SheetElementConstructorInterface
    ) {
      this.id = id
      this.name = name
      this._excelSheetName = name
      this.isVisible = isVisible
      this.color =color
      this.typeOfName = typeOfName
      this.positions.firstNumber = positionFirst === undefined? 0 : positionFirst
      this.positions.secondNumber = positionSecond === undefined? 0 : positionSecond
      this.delimiter = delimiter === undefined? this.delimiter : delimiter
      this.elements = elements === undefined? new Map() as SheetElementsMapInterface : elements
    }

    // #endregion Constructors (1)

    // #region Public Accessors (2)

    public get name(): string{
      try {
        const name: string = this[this.typeOfName]
        return name
      } catch (error) {
        return ""
      }
    }

    public set name(value: string){
      try {
        this[this.typeOfName] = value
      } catch (error) {
      }
    }

    // #endregion Public Accessors (2)

    // #region Private Accessors (4)

    private get _decodedName(): string {
      try {
        const sentence = this._excelSheetName
        const cleanSentence: string = sentence.replace(this._regExpNumeration, "")
        return cleanSentence
      } catch (error) {
        return ""
      }
    }

    private set _decodedName(value: string) {
      try {
        this._excelSheetName = value
      } catch (error) {
        this._excelSheetName = ""
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
        return  ""
      }
    }

    private set _encodedName(value: string) {
      try {
        const readyPattern: string = this._numerationPattern()
        this._excelSheetName = value + readyPattern
      } catch (error) {
        this._excelSheetName =''
      }
    }

    // #endregion Private Accessors (4)

    // #region Private Methods (2)

    private _doesNameIncludesNumerationPattern(): boolean {
      try {
        const result = this._excelSheetName.match(this._regExpNumeration)
        if(Array.isArray(result) && result.length>0) return true
        return false
      } catch (error) {
        console.log("_doesNameIncludesNumerationPattern", error)
        return false
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
        return ""
      }
    }

    // #endregion Private Methods (2)
}
  export const SheetElementConfig = {
    typeOfName: {
      originalName: "_excelSheetName", 
      simpleName: "_decodedName",
      numeratedName: "_encodedName",
    }
  }
}
