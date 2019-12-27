/** to get context without class initialization
 * this function must be used as mixin
 */
const _requestContext = async (): Promise<Excel.RequestContext> => {
  let ctx: Excel.RequestContext = await Excel.run(async context => context);
  return ctx;
};

export class ExcelContextBuilder {
  public _context!: Excel.RequestContext;
  constructor(context?: Excel.RequestContext) {
    Promise.resolve(this.build(context));
  }
  /** @description
   * Method to write context inside class
   * */
  public async build(context?: Excel.RequestContext): Promise<void> {
    this._context =
      context === undefined
        ? await _requestContext()
        : (this._context = context);
  }
  /** @description
   * Method to get context from not initialized class
   * */
  public static async init(): Promise<Excel.RequestContext> {
    return await _requestContext();
  }
  /** @description
   * Method to get context from class
   * */
  public async context(): Promise<Excel.RequestContext> {
    return this._context;
  }
  /** @description
   * Method to sync context
   * */
  public async sync(): Promise<void> {
    this._context.sync();
  }
}
