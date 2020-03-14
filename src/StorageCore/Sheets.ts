import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { WorksheetsBuilder } from '@/LogicCore/APIExcel/WorksheetsBuilder'
import { Log } from '@/LogicCore/Debug/Log'
import getMockSheets from './getMockSheets'
import { MatrixController } from '@/LogicCore/Instances/MatrixElement/MatrixController'
import { MaintainerStatuses } from '@/LogicCore/Instances/MatrixElement/Maintainer'

const iniOptions: MatrixElementInterface.MatrixControllerConstructor = {
	typeOfName: '_excelSheetName',
	delimiter: '_',
	_classTitle: 'SheetElementsMap',
	maintainerStatuses: {} as MaintainerStatuses,
}

@Module({ name: 'Sheets', namespaced: true })
export default class Sheets extends VuexModule {
	// #region Properties (3)

	public appContext: Excel.RequestContext | undefined = undefined
	public elements: MatrixElementInterface.MatrixController = new MatrixController(
		iniOptions
	)
	public outsideApp: MatrixElementInterface.outsideApp = 'browser'
	public activeSheetId: string = ''
	// #endregion Properties (3)

	// #region Public Accessors (2)

	public get getExcelSheets() {
		return this.elements.getExcelSheets()
	}

	public get getSheets() {
		return this.elements.arrElements
	}

	public get getActiveSheetId() {
		return this.activeSheetId
	}

	// #endregion Public Accessors (2)

	// #region Public Methods (13)

	@Mutation
	public changeElementsMutation(
		elements: MatrixElementInterface.MatrixController
	): void {
		this.elements = elements
	}

	@Action
	public async changeExcelNames(sheets: MatrixElementInterface.MEArr) {
		try {
			const worksheetsClass = await WorksheetsBuilder.buildWorksheetsClass()
			const maintainerStatuses: MatrixElementInterface.maintainerStatuses = this
				.context.rootGetters['AppSettings/getMaintainerStatuses']

			if (maintainerStatuses.areSheetsHaveNumeration) {
				for (let [pos, sheet] of sheets.entries()) {
					console.log(sheet)
					await worksheetsClass.renameWorksheet(
						sheet.sourceId,
						sheet.name,
						false
					)
				}
			} else {
				for (let [pos, sheet] of sheets.entries()) {
					await worksheetsClass.renameWorksheet(
						sheet.sourceId,
						sheet.decodedName,
						false
					)
				}
			}

			await worksheetsClass.context.sync()
		} catch (error) {
			throw Log.error('changeExcelNames', error)
		}
	}

	@Action
	public async changeExcelPositions(sheets: MatrixElementInterface.MEArr) {
		const worksheetsClass = await WorksheetsBuilder.buildWorksheetsClass()
		for (let [pos, sheet] of sheets.entries()) {
			await worksheetsClass.reorderWorksheet(sheet.sourceId, pos, false)
		}
		await worksheetsClass.context.sync()
	}

	@Action
	public async changeSheetColor(el: MatrixElementInterface.MatrixElement) {
		const elements = this.elements
		await elements.changeElement(el)
		this.changeElementsMutation(elements)
		switch (this.outsideApp) {
			case 'browser':
				break
			case 'excelDesktop':
				const sh = await WorksheetsBuilder.buildWorksheetsClass()
				await sh.setWorksheetTabColor(el.sourceId, el.color)
				break
		}
	}

	@Action
	public async changeSheetPosition({
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
	public async initializeStore(
		newSourceApp?: MatrixElementInterface.outsideApp
	): Promise<boolean> {
		try {
			/** first, we need to understand
			 * what we will use as data source
			 */
			let elements: MatrixElementInterface.MatrixController
			let sheets: MatrixElementInterface.sheetsSource
			const maintainerStatuses: MatrixElementInterface.maintainerStatuses = this
				.context.rootGetters['AppSettings/getMaintainerStatuses']
			let options: MatrixElementInterface.MatrixControllerConstructor = {
				typeOfName: '_excelSheetName',
				delimiter: '_',
				_classTitle: 'SheetElementsMap',
				maintainerStatuses,
			}

			const sourceApp = newSourceApp ? newSourceApp : this.outsideApp
			switch (sourceApp) {
				case 'browser':
					sheets = await getMockSheets()
					elements = new MatrixController(options)
					break

				case 'excelDesktop':
					/** creating worksheets class */
					const worksheetsClass = await WorksheetsBuilder.buildWorksheetsClass()
					sheets = await worksheetsClass.getWorksheets()
					/** getting context */
					// await this.setExcelContext(context)
					/** preparing and pushing sheets to store */

					elements = new MatrixController(options)
					break
				default:
					throw Error('source is not defined')
			}
			const isLoaded = await elements.firstOpenScenarioCreateMatrixElements(sheets)
			if(!isLoaded){
				return false
			}
			this.initializeStoreMutation(elements)
			this.setOutsideApp(sourceApp)
			switch (sourceApp) {
				case 'browser':
					break
				case 'excelDesktop':
					await this.getActiveSheet()
					if (maintainerStatuses.areSheetsHaveNumeration) {
						await elements.correctDoubles()
					}
					const shts = elements.getExcelSheets()
					await this.changeExcelPositions(shts)
					await this.changeExcelNames(shts)
					break
			}
			return true
		} catch (error) {
			throw Log.error('initializeStore', error)
		}
	}

	@Mutation
	public initializeStoreMutation(
		elements: MatrixElementInterface.MatrixController
	) {
		this.elements = elements
	}

	@Action
	public async renameSheet(el: MatrixElementInterface.MatrixElement) {
		const elements = this.elements
		await elements.changeElement(el)
		this.changeElementsMutation(elements)
		switch (this.outsideApp) {
			case 'browser':
				break
			case 'excelDesktop':
				const sheetsHasNumeration: MatrixElementInterface.maintainerStatuses['shouldWeRestoreNumeration'] = this
					.context.rootGetters[
					'AppSettings/shouldWeRestoreNumeration'
				]
				const sh = await WorksheetsBuilder.buildWorksheetsClass()

				if (sheetsHasNumeration) {
					await sh.renameWorksheet(el.sourceId, el.name)
				} else {
					await sh.renameWorksheet(el.sourceId, el.decodedName)
				}

				break
		}
	}

	@Action
	public async setExcelContext(context: Excel.RequestContext) {
		this.setExcelContextMutation(context)
	}

	/** function to assign updated elements to state */
	@Mutation
	public setExcelContextMutation(context: Excel.RequestContext) {
		this.appContext = context
	}

	@Mutation
	public setOutsideApp(state: MatrixElementInterface.outsideApp) {
		this.outsideApp = state
	}

	@Action
	public async setSheets(
		sheets: MatrixElementInterface.MEArr
	): Promise<void> {
		this.setSheetsMutation(sheets)
	}

	/** function to assign updated elements to state */
	@Mutation
	public setSheetsMutation(sheets: MatrixElementInterface.MEArr) {
		this.elements.writeSheets(sheets)
	}
	@Mutation
	async selectSheetMut(elId: string) {
		this.activeSheetId = elId
	}

	@Action
	async selectSheet(elId: string) {
		switch (this.outsideApp) {
			case 'excelDesktop':
				const sh = await WorksheetsBuilder.buildWorksheetsClass()
				await sh.setActiveWorksheet(elId)

				break

			default:
				break
		}
		this.selectSheetMut(elId)
	}
	@Action
	async getActiveSheet() {
		switch (this.outsideApp) {
			case 'excelDesktop':
				const sh = await WorksheetsBuilder.buildWorksheetsClass()
				const sheet = await sh.getActiveWorksheet()
				sheet.load('id')
				await sh.context.sync()
				this.selectSheetMut(sheet.id)
				break

			default:
				break
		}
	}
	// #endregion Public Methods (13)
}
