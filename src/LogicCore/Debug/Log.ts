export class Log{
    public classTitle: string
    constructor(classTitle: string){
        this.classTitle = classTitle
    }
    error(path:string,err: Error){
        console.error(`${this.classTitle}: ${path}`,err)
    }
    static error(path:string,err: Error){
        console.error(`${path}`,err)
    }
    log(message: string){
        console.log(`${this.classTitle}: ${message}`)
    }
    static log(message: string){
        console.log(`${message}`)
    }
}
