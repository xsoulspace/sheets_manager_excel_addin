export class Basic implements SheetElementsInterface.Basic {
  // #region Properties (7)

  public _classTitle: SheetElementsInterface.ClassTitle;
  public color: string;
  public id: string;
  public isVisible: boolean;
  public log!: LogInterface;
  public name: string;
  public typeOfName: SheetElementsInterface.NameType;

  // #endregion Properties (7)

  // #region Constructors (1)

  constructor(options: SheetElementsInterface.BasicConstructor) {
    const { id, name, typeOfName, color, isVisible, _classTitle } = options;
    this.id = id;
    this.name = name;
    this.typeOfName = typeOfName;
    this.color = color;
    this.isVisible = isVisible;
    Promise.resolve(import("@/LogicCore/Debug/Log")).then(
      ({ Log }) => (this.log = new Log(_classTitle))
    );
    this._classTitle = _classTitle ? _classTitle : "Basic";
  }

  // #endregion Constructors (1)
}
