import { Basic } from "./Basic";

export class SheetElement extends Basic
  implements SheetElementsInterface.SheetElement {
  // #region Properties (8)

  private _excelSheetName: string;
  private _regExpNumeration: RegExp = /(.\d_\d.)/g;

  public color: string;
  public delimiter: string = "_";
  public elements: SheetElementsInterface.EMap;
  public id: string;
  public visibility: Excel.SheetVisibility;
  public positions: SheetElementsInterface.Positions = {
    first: 0,
    second: 0
  };

  // #endregion Properties (8)

  // #region Constructors (1)

  constructor({
    id,
    name,
    visibility,
    color,
    typeOfName,
    positions,
    delimiter,
    elements
  }: SheetElementsInterface.SheetElementConstructor) {
    super({
      typeOfName,
      _classTitle: "SheetElement"
    });
    this._excelSheetName = name;
    this.positions = positions;
    if (delimiter) this.delimiter = delimiter;
    this.elements = elements === undefined ? new Map() : elements;
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

  // #region Private Methods (2)

  private _doesNameIncludesNumerationPattern(): boolean {
    try {
      const result = this._excelSheetName.match(this._regExpNumeration);
      if (Array.isArray(result) && result.length > 0) return true;
      return false;
    } catch (error) {
      throw this.log.error("_doesNameIncludesNumerationPattern", error);
    }
  }

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

  // #endregion Private Methods (2)
}
