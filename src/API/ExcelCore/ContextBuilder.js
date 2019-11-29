
export class Builder{
  static async build({context}){
    if(context===undefined){
      this._context = await Excel.run(async context => context)
    } else {
      this._context = context
    }
  }
  static async init(){
    if(this._context===undefined){
      return await Excel.run(async context => context)
    } else {
      return this._context
    }
  }
}
