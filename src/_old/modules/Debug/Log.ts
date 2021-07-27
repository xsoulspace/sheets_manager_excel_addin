export class Log {
  public classTitle: string

  constructor(classTitle: string) {
    this.classTitle = classTitle
  }

  public static error(path: string, err: Error): void {
    console.error(`${path}`, err)
  }

  public static log(message: string): void {
    console.log(`${message}`)
  }

  public error(path: string, err: Error): void {
    console.error(`${this.classTitle}: ${path}`, err)
  }

  public log(message: string): void {
    console.log(`${this.classTitle}: ${message}`)
  }
}
