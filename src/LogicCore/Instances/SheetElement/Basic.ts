export class Basic implements SheetElementsInterface.Basic {
  // #region Properties (3)

  public _classTitle: SheetElementsInterface.ClassTitle;
  public log!: LogInterface;
  public typeOfName: SheetElementsInterface.NameType;

  // #endregion Properties (3)

  // #region Constructors (1)

  constructor(options: SheetElementsInterface.BasicConstructor) {
    const { typeOfName, _classTitle } = options;
    this.typeOfName = typeOfName;
    this._classTitle = _classTitle ? _classTitle : "Basic";

    Promise.resolve(import("@/LogicCore/Debug/Log")).then(
      ({ Log }) => (this.log = new Log(this._classTitle))
    );
  }

  // #endregion Constructors (1)
}
