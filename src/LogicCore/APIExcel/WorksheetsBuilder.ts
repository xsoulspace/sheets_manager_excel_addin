import { ExcelWorksheets } from './ExcelWorksheets';

export class WorksheetsBuidler{
    static async buildWorksheetsClass(context?: Excel.RequestContext){
        const worksheetsClass = new ExcelWorksheets()
        await worksheetsClass.init(context)
        return worksheetsClass
    }
}