export class Basic implements SheetElementsInterface.Basic {
  // #region Properties (5)

  public color: string;
  public id: string;
  public isVisible: boolean;
  public name: string;
  public typeOfName: SheetElementsInterface.NameType;

  // #endregion Properties (5)

  // #region Constructors (1)

  constructor(options: SheetElementsInterface.BasicConstructor) {
    const { id, name, typeOfName, color, isVisible } = options;
    this.id = id;
    this.name = name;
    this.typeOfName = typeOfName;
    this.color = color;
    this.isVisible = isVisible;
  }

  // #endregion Constructors (1)
}
