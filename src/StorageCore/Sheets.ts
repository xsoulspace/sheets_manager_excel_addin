import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { SheetElementsMap } from '@/LogicCore/Instances/SheetElement/SheetElements'
import { WorksheetsBuilder } from '@/LogicCore/APIExcel/WorksheetsBuilder'
import { Log } from '@/LogicCore/Debug/Log'
import getMockSheets from './getMockSheets'

const iniOptions: SheetElementsInterface.SheetElementsMapConstructor = {
	typeOfName: '_excelSheetName',
	delimiter: '_',
	_classTitle: 'SheetElementsMap',
}

@Module({ name: 'Sheets', namespaced: true })
export default class Sheets extends VuexModule {
	elementsMap: SheetElementsInterface.SheetElementsMap = new SheetElementsMap(
		iniOptions
	)
	appContext: Excel.RequestContext | undefined = undefined

	get getSheets() {
		return this.elementsMap.arrElements
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
	async initializeStore(
		sourceApp: SheetElementsInterface.outsideApp
	): Promise<void> {
		try {
			/** first, we need to understand
			 * what we will use as data source
			 */
			let elementsMap: SheetElementsInterface.SheetElementsMap
			let sheets: SheetElementsInterface.sheetsSource
			let options: SheetElementsInterface.SheetElementsMapConstructor

			switch (sourceApp) {
				case 'browser':
					sheets = await getMockSheets()
					options = {
						typeOfName: '_excelSheetName',
						delimiter: '_',
						_classTitle: 'SheetElementsMap',
					}
					elementsMap = new SheetElementsMap(options)
					break

				case 'excelDesktop':
					/** creating worksheets class */
					const worksheetsClass = await WorksheetsBuilder.buildWorksheetsClass()
					sheets = await worksheetsClass.getWorksheets()
					/** getting context */
					const context = worksheetsClass.context
					await this.setExcelContext(context)
					/** preparing and pushing sheets to store */
					options = {
						typeOfName: '_excelSheetName',
						delimiter: '_',
						_classTitle: 'SheetElementsMap',
					}
					elementsMap = new SheetElementsMap(options)
					break
				default:
					throw Error('source is not defined')
			}
			await elementsMap.firstOpenScenarioCreateSheetElements(sheets)
			console.log('ini sheets',sheets)
			this.initializeStoreMutation(elementsMap)
		} catch (error) {
			throw Log.error('initializeStore', error)
		}
	}
}
