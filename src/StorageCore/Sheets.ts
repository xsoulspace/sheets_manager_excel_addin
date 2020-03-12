import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { WorksheetsBuilder } from '@/LogicCore/APIExcel/WorksheetsBuilder'
import { Log } from '@/LogicCore/Debug/Log'
import getMockSheets from './getMockSheets'
import { MatrixController } from '@/LogicCore/Instances/MatrixElement/MatrixController'

const iniOptions: MatrixElementInterface.MatrixControllerConstructor = {
	typeOfName: '_excelSheetName',
	delimiter: '_',
	_classTitle: 'SheetElementsMap',
}

@Module({ name: 'Sheets', namespaced: true })
export default class Sheets extends VuexModule {
	elements: MatrixElementInterface.MatrixController = new MatrixController(
		iniOptions
	)
	appContext: Excel.RequestContext | undefined = undefined

	get getSheets() {
		return this.elements.arrElements
	}

	/** function to assign updated elements to state */
	@Mutation
	setSheetsMutation(sheets: MatrixElementInterface.MEArr) {
		this.elements.writeSheets(sheets)
	}
	@Action
	async setSheets(sheets: MatrixElementInterface.MEArr): Promise<void> {
		this.setSheetsMutation(sheets)
	}
	/** function to assign updated elements to state */
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
		elements: MatrixElementInterface.MatrixController
	) {
		this.elements = elements
	}
	@Mutation
	changeSheetPositionMutation(
		elements: MatrixElementInterface.MatrixController
	): void {
		this.elements = elements
	}

	@Action
	async changeSheetPosition({
		items,
	}: {
		items: MatrixElementInterface.MEArr
	}): Promise<void> {
		if(items.length>0){
			const elements = this.elements
			await elements.changeSheetPosition(items)
			this.changeSheetPositionMutation(elements)	
		}
	}

	@Action
	async initializeStore(
		sourceApp: MatrixElementInterface.outsideApp
	): Promise<void> {
		try {
			/** first, we need to understand
			 * what we will use as data source
			 */
			let elements: MatrixElementInterface.MatrixController
			let sheets: MatrixElementInterface.sheetsSource
			let options: MatrixElementInterface.MatrixControllerConstructor

			switch (sourceApp) {
				case 'browser':
					sheets = await getMockSheets()
					options = {
						typeOfName: '_excelSheetName',
						delimiter: '_',
						_classTitle: 'SheetElementsMap',
					}
					elements = new MatrixController(options)
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
					elements = new MatrixController(options)
					break
				default:
					throw Error('source is not defined')
			}
			await elements.firstOpenScenarioCreateMatrixElements(sheets)
			console.log('ini sheets', sheets)
			this.initializeStoreMutation(elements)
		} catch (error) {
			throw Log.error('initializeStore', error)
		}
	}
}
