import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { SheetElementsMap } from '@/LogicCore/Instances/SheetElement/SheetElements'
import { WorksheetsBuilder } from '@/LogicCore/APIExcel/WorksheetsBuilder'

@Module({ name: 'Sheets', namespaced: true })
export default class Sheets extends VuexModule {
	elementsMap!: SheetElementsInterface.SheetElementsMap
    appContext!: Excel.RequestContext
    
    get sheets() {
		return this.elementsMap.eMap
	}

	/** function to assign updated elements to state */
	@Mutation
	setSheetsMutation(sheets: SheetElementsInterface.EMap) {
		this.elementsMap.writeSheets(sheets)
	}
	@Action
	async setSheets(sheets: SheetElementsInterface.EMap): Promise<void> {
		this.setSheetsMutation(sheets)
	}
	@Mutation
	setExcelContextMutation(context: Excel.RequestContext) {
		this.appContext = context
	}
	@Action
	async setExcelContext(context: Excel.RequestContext) {
		this.setExcelContextMutation(context)
	}

	@Mutation
	initializeStoreMutation(
		elementsMap: SheetElementsInterface.SheetElementsMap
	) {
		this.elementsMap = elementsMap
	}
	@Action
	async initializeStore(): Promise<void> {
        /** creating worksheets class */
        const worksheetsClass = await WorksheetsBuilder.buildWorksheetsClass()
        const sheets = await worksheetsClass.getWorksheets()
        /** getting context */
        const context = worksheetsClass.context
        await this.setExcelContext(context)
        /** preparing and pushing sheets to store */
        const options: SheetElementsInterface.SheetElementsMapConstructor = {
			typeOfName: '_excelSheetName',
			delimiter: '_',
			_classTitle: 'SheetElementsMap',
		}
		const elementsMap: SheetElementsInterface.SheetElementsMap = new SheetElementsMap(
			options
        )
        await elementsMap.firstOpenScenarioCreateSheetElements(sheets)
		this.initializeStoreMutation(elementsMap)
	}
}
