import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { WorksheetsBuilder } from '@/LogicCore/APIExcel/WorksheetsBuilder'
import { Log } from '@/LogicCore/Debug/Log'
import getMockSheets from './getMockSheets'
import { MatrixController } from '@/LogicCore/Instances/MatrixElement/MatrixController'
import { MatrixElement } from '@/LogicCore/Instances/MatrixElement/MatrixElement'

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
	outsideApp: MatrixElementInterface.outsideApp = 'browser'
	get getSheets() {
		return this.elements.arrElements
	}
	get getExcelSheets() {
		return this.elements.getExcelSheets()
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
	initializeStoreMutation(elements: MatrixElementInterface.MatrixController) {
		this.elements = elements
	}
	@Mutation
	changeElementsMutation(
		elements: MatrixElementInterface.MatrixController
	): void {
		this.elements = elements
	}

	@Action
	async renameSheet(el: MatrixElementInterface.MatrixElement) {
		const elements = this.elements
		await elements.changeElement(el)
		this.changeElementsMutation(elements)
		switch (this.outsideApp) {
			case 'browser':
				break
			case 'excelDesktop':
				const sh = await WorksheetsBuilder.buildWorksheetsClass()
				await sh.renameWorksheet(el.sourceId, el.name)
				break
		}
	}
	@Action
	async changeSheetPosition({
		items,
	}: {
		items: MatrixElementInterface.MEArr
	}): Promise<void> {
		if (items.length > 0) {
			const elements = this.elements
			await elements.changeSheetPosition(items)
			this.changeElementsMutation(elements)
			switch (this.outsideApp) {
				case 'browser':
					//nothing to do
					break
				case 'excelDesktop':
					const shts = elements.getExcelSheets()
					await this.changeExcelPositions(shts)
					await this.changeExcelNames(shts)

					break
			}
		}
	}
	@Action
	async changeExcelPositions(sheets: MatrixElementInterface.MEArr) {
		const worksheetsClass = await WorksheetsBuilder.buildWorksheetsClass()
		for (let [pos, sheet] of sheets.entries()) {
			await worksheetsClass.reorderWorksheet(sheet.sourceId, pos, false)
		}
		await worksheetsClass.context.sync()
	}
	@Action
	async changeExcelNames(sheets: MatrixElementInterface.MEArr) {
		try {
			const worksheetsClass = await WorksheetsBuilder.buildWorksheetsClass()
			for (let [pos, sheet] of sheets.entries()) {
				await worksheetsClass.renameWorksheet(
					sheet.sourceId,
					sheet.name,
					false
				)
			}
			await worksheetsClass.context.sync()
		} catch (error) {
			throw Log.error('changeExcelNames', error)
		}
	}
	@Mutation
	setOutsideApp(state: MatrixElementInterface.outsideApp) {
		this.outsideApp = state
	}
	@Action
	async initializeStore(
		newSourceApp?: MatrixElementInterface.outsideApp
	): Promise<void> {
		try {
			/** first, we need to understand
			 * what we will use as data source
			 */
			let elements: MatrixElementInterface.MatrixController
			let sheets: MatrixElementInterface.sheetsSource
			let options: MatrixElementInterface.MatrixControllerConstructor
			const sourceApp = newSourceApp ? newSourceApp : this.outsideApp
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
					// await this.setExcelContext(context)
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
			this.initializeStoreMutation(elements)
			this.setOutsideApp(sourceApp)
			switch (sourceApp) {
				case 'browser':
					break
				case 'excelDesktop':
					const shts = elements.getExcelSheets()
					await this.changeExcelPositions(shts)
					await this.changeExcelNames(shts)
					break
			}
		} catch (error) {
			throw Log.error('initializeStore', error)
		}
	}
}
