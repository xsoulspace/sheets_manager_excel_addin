
declare interface LogInterface {
    classTitle: string;
    error(path: string, err: Error): void;
    log(message: string): void;
}
  