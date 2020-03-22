export class Log implements LogInterface {
  // #region Properties (1)

  public classTitle: string;

  // #endregion Properties (1)

  // #region Constructors (1)

  constructor(classTitle: string) {
    this.classTitle = classTitle;
  }

  // #endregion Constructors (1)

  // #region Public Static Methods (2)

  public static error(path: string, err: Error): void {
    console.error(`${path}`, err);
  }

  public static log(message: string): void {
    console.log(`${message}`);
  }

  // #endregion Public Static Methods (2)

  // #region Public Methods (2)

  public error(path: string, err: Error): void {
    console.error(`${this.classTitle}: ${path}`, err);
  }

  public log(message: string): void {
    console.log(`${this.classTitle}: ${message}`);
  }

  // #endregion Public Methods (2)
}
