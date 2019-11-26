let ExcelBuilder = function(){
  this._context = undefined
}

ExcelBuilder.prototype.buildExcelContext = async function(){
  this._context = await Excel.run(async context => context)
}
ExcelBuilder.prototype.excelContext = async function(){
  return await this._context
}
ExcelBuilder.prototype.syncExcelContext = async function(){
  await this._context.sync()
}
ExcelBuilder.prototype._iniExcel = async function(excelContext){
  if(excelContext === undefined){
    await this.buildExcelContext()
  } else {
    this._context = excelContext
  }
}

export default ExcelBuilder
