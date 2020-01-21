import { Basic } from "./Basic";

export class SheetElement extends Basic
  implements SheetElementsInterface.SheetElement {
  // #region Properties (7)

  private _excelSheetName: string;
  private _regExpNumeration: RegExp = /(.\d_\d.)/g;
  private _regExpPositions: RegExp = /\d\d/g;

  public color: string;
  public elements: SheetElementsInterface.EMap;
  public id: string;
  public positions: SheetElementsInterface.Positions = {
    first: 0,
    second: 0
  };
  public visibility: SheetElementsInterface.SheetVisibility;

  // #endregion Properties (7)

  // #region Constructors (1)

  constructor({
    id,
    name,
    visibility,
    color,
    typeOfName,
    first,second,
    delimiter,
    elements,
    _classTitle
  }: SheetElementsInterface.SheetElementConstructor) {
    super({
      typeOfName,
      delimiter,
      _classTitle: _classTitle ? _classTitle : "SheetElement"
    });
    this._excelSheetName = name;
    this.positions = {first,second};
    this.elements = elements ? elements : new Map();
    this.id = id;
    this.name = name;
    this.color = color;
    this.visibility = visibility;
  }

  // #endregion Constructors (1)

  // #region Public Accessors (2)

  public get name(): string {
    try {
      const name: string = this[this.typeOfName];
      return name;
    } catch (error) {
      throw this.log.error("name get", error);
    }
  }

  public set name(value: string) {
    try {
      this[this.typeOfName] = value;
    } catch (error) {
      throw this.log.error("name set", error);
    }
  }
  public get isInFirstLine(): boolean{
    return this.positions.second == 0
  }
  // #endregion Public Accessors (2)

  // #region Private Accessors (4)

  private get _decodedName(): string {
    try {
      const sentence = this._excelSheetName;
      const cleanSentence: string = sentence.replace(
        this._regExpNumeration,
        ""
      );
      return cleanSentence;
    } catch (error) {
      throw this.log.error("_decodedName get", error);
    }
  }

  private set _decodedName(value: string) {
    try {
      this._excelSheetName = value;
    } catch (error) {
      throw this.log.error("_decodedName set", error);
    }
  }

  /** 1. extract possible pattern -> 00_00 but it can be e0_0uio,
   * so it is necessary to clean up after match and separate to two numbers
   * 2. to clean up pattern 0_0 and all numbers in name
   * 3. create new name
   */
  private get _encodedName(): string {
    try {
      const cleanSentence: string = this._decodedName;
      const readyPattern: string = this._numerationPattern();

      return cleanSentence + readyPattern;
    } catch (error) {
      throw this.log.error("_encodedName get", error);
    }
  }

  private set _encodedName(value: string) {
    try {
      const readyPattern: string = this._numerationPattern();
      this._excelSheetName = value + readyPattern;
    } catch (error) {
      throw this.log.error("_encodedName set", error);
    }
  }

  // #endregion Private Accessors (4)

  // #region Public Methods (1)

  public _doesNameIncludesNumerationPattern(): boolean {
    try {
      const result = this._excelSheetName.match(this._regExpNumeration);
      if (Array.isArray(result) && result.length > 0) {
        const approxPositions = result[0].match(this._regExpPositions);
        if (approxPositions === null) return false;
        if (approxPositions.length == 2) {
          this.positions.first = Number(approxPositions[0]);
          this.positions.second = Number(approxPositions[1]);
          return true;
        }
      }
      return false;
    } catch (error) {
      throw this.log.error("_doesNameIncludesNumerationPattern", error);
    }
  }

  // #endregion Public Methods (1)

  // #region Private Methods (1)

  private _numerationPattern(): string {
    try {
      const returnPart = (draftValue: number): string => {
        return draftValue > 9 ? String(draftValue) : "0" + String(draftValue);
      };
      const firstPart: string = returnPart(this.positions.first);
      const secondPart: string = returnPart(this.positions.second);
      const readyPattern: string = firstPart + this.delimiter + secondPart;

      return readyPattern;
    } catch (error) {
      throw this.log.error("_numerationPattern", error);
    }
  }

  // #endregion Private Methods (1)
}
