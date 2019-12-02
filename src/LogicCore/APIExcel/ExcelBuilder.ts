const _requestContext = async (): Promise<Excel.RequestContext | undefined> => {
  try {
    let ctx: Excel.RequestContext =  await Excel.run(async context=> context)
    return ctx
  } catch (error) {
    console.log(error)
  }
}

export class ExcelBuilder {
  _context?: Excel.RequestContext
  constructor(context?: Excel.RequestContext) {
    this._context = context
  }
  static async buildStatic(): Promise<void>{
    try {
      this.prototype._context = await _requestContext()
    } catch (error) {
      
    }
  }
  async build(context?: Excel.RequestContext): Promise<void>{
    try {
      if(context === undefined){
        this._context = await _requestContext()
      } else {
        this._context = context
      }
    } catch (error) {
      
    }
  }
  static async initStatic(): Promise<Excel.RequestContext | undefined>{
    try {
      if(this.prototype._context === undefined){
        await this.buildStatic()
      } else {
        return this.prototype._context
      }
    } catch (error) {
      
    }
  }
  async init(): Promise<Excel.RequestContext | undefined>{
    try {
      if(this._context === undefined){
        await this.build()
      }
      return this._context
    } catch (error) {
      
    }
  }
  async sync(): Promise<void> {
    try {
      if(this._context === undefined){
        await this.build()
      }
      if(this._context !== undefined){
        await this._context.sync()
      } else {
       /** throw error */ 
      }
    } catch (error) {
      
    }
  }
}
