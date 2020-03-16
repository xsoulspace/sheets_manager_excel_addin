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

	public outsideApp: MatrixElementInterface.outsideApp = 'browser'
	@Mutation
	public setOutsideApp(state: MatrixElementInterface.outsideApp) {
		this.outsideApp = state
	}

	// #endregion Properties (3)

	// #region Public Accessors (2)
	public elements: MatrixElementInterface.MatrixController = new MatrixController(
		iniOptions
	)
	public get getExcelSheets() {
		return this.elements.getExcelSheets()
	}

	public get getSheets() {
		if (this.filterWord != '') {
			return this.filteredSheets
		}
		return this.elements.arrElements
	}

	// #endregion Public Accessors (2)

	// #region Public Methods (13)

	/** function to assign updated elements to state */
	@Mutation
	public setSheetsMutation(sheets: MatrixElementInterface.MEArr) {
		this.elements.writeSheets(sheets)
	}

	@Action
	public async setSheets(
		sheets: MatrixElementInterface.MEArr
	): Promise<void> {
		this.setSheetsMutation(sheets)
	}

	@Mutation
	public changeElementsMutation(
		elements: MatrixElementInterface.MatrixController
	): void {
		this.elements = elements
	}
	/** Filtering */
	filteredSheets: MatrixElementInterface.MEArr = []
	filterWord: string = ''
	get isInFiltering() {
		return this.filterWord != ''
	}
	@Mutation
	async setFilteredElements({
		elements,
		word,
	}: {
		elements: MatrixElementInterface.MEArr
		word: string
	}) {
		this.filteredSheets = elements
		this.filterWord = word
	}
	@Action
	async filterSheetsByWord(word: string) {
		let elements: MatrixElementInterface.MEArr = []
		if (word.length > 0) {
			elements = await this.elements.filterElements(word)
		}
		this.setFilteredElements({ elements, word })
	}
	/** Filtering end */

	/** NAME FUNCTIONS START*/
	@Action
	public async changeExcelNames(sheets: MatrixElementInterface.MEArr) {
		try {
			const worksheetsClass = await WorksheetsBuilder.buildWorksheetsClass()
			const maintainerStatuses: MatrixElementInterface.maintainerStatuses = this
				.context.rootGetters['AppSettings/getMaintainerStatuses']

			if (maintainerStatuses.areSheetsHaveNumeration) {
				for (let [pos, sheet] of sheets.entries()) {
					// console.log(sheet)
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
	public async renameSheet(el: MatrixElementInterface.MatrixElement) {
		const elements = this.elements
		await elements.changeElement(el)
		this.changeElementsMutation(elements)
		switch (this.outsideApp) {
			case 'browser':
				break
			case 'excelDesktop':
				const sheetsHasNumeration: MatrixElementInterface.maintainerStatuses['areSheetsHaveNumeration'] = this
					.context.rootGetters['AppSettings/getMaintainerStatuses']
					.default.areSheetsHaveNumeration
				const sh = await WorksheetsBuilder.buildWorksheetsClass()

				if (sheetsHasNumeration) {
					await sh.renameWorksheet(el.sourceId, el.name)
				} else {
					await sh.renameWorksheet(el.sourceId, el.decodedName)
				}

				break
		}
	}
	/** NAME FUNCTIONS END*/

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
	public async changeExcelPositions(sheets: MatrixElementInterface.MEArr) {
		const worksheetsClass = await WorksheetsBuilder.buildWorksheetsClass()
		for (let [pos, sheet] of sheets.entries()) {
			await worksheetsClass.reorderWorksheet(sheet.sourceId, pos, false)
		}
		await worksheetsClass.context.sync()
	}

	@Action
	async addNewSheet(
		sheetId: string,
		name?: string,
		first?: number,
		second?: number
	) {
		try {
			console.log('sheetId', sheetId)
			switch (this.outsideApp) {
				case 'excelDesktop':
					/** get new sheet position */
					const worksheetsClass = await WorksheetsBuilder.buildWorksheetsClass()
					const item = await worksheetsClass.getWorksheet(sheetId)
					item.load(['position', 'name', 'tabColor', 'visibility'])
					await worksheetsClass.context.sync()
					let fixFirst: number = first ? first : item.position
					let fixSecond: number = second ? second : 0
					/** need to get current item in this position
					 * to set new positiong correctly*/

					let oldItem = this.getExcelSheets[item.position]
					if (oldItem === undefined) {
						oldItem = this.getExcelSheets[item.position - 1]
						if (oldItem.positions.second > 0) {
							fixFirst = oldItem.positions.first
							fixSecond = oldItem.positions.second + 1
						} else {
							fixFirst = oldItem.positions.first + 1
						}
					} else {
						if (oldItem.positions.second > 0) {
							fixFirst = oldItem.positions.first
							fixSecond = oldItem.positions.second
						} else {
							fixFirst = oldItem.positions.first
						}
					}

					const elements = this.elements

					const el = await elements.createNewSheetElement(
						sheetId,
						name ? name : item.name,
						fixFirst,
						fixSecond,
						item.tabColor,
						<Excel.SheetVisibility>item.visibility
					)

					await elements.insertElement(el)
					await elements.usualSheetChange(elements.arrElements)
					this.changeElementsMutation(elements)
					await this.saveSheetsTo()
					break

				default:
					break
			}
		} catch (error) {
			throw Log.error('addNewSheet', error)
		}
	}

	@Action
	async removeElementFromStore(
		idOrName?: string,
		el?: MatrixElementInterface.MatrixElement
	) {
		const elements = this.elements

		switch (this.outsideApp) {
			case 'excelDesktop':
				await elements.deleteElement(idOrName, el)
				break
		}
		const maintainerStatuses: MatrixElementInterface.maintainerStatuses = this
			.context.rootGetters['AppSettings/getMaintainerStatuses']
		if (maintainerStatuses.areSheetsHaveNumeration) {
			await elements.usualSheetChange(elements.arrElements)
		}
		this.changeElementsMutation(elements)

		switch (this.outsideApp) {
			case 'excelDesktop':
				await this.saveSheetsTo()
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
			await elements.usualSheetChange(items)
			this.changeElementsMutation(elements)

			await this.saveSheetsTo()
		}
	}

	@Mutation
	public initializeStoreMutation(
		elements: MatrixElementInterface.MatrixController
	) {
		this.elements = elements
	}
	@Action
	async cleanNumerationIni(newSourceApp?: MatrixElementInterface.outsideApp) {
		try {
			const sourceApp = newSourceApp ? newSourceApp : this.outsideApp

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

			await elements._simpleSheetsLoading(sheets)

			this.initializeStoreMutation(elements)
			this.setOutsideApp(sourceApp)
			await this.saveSheetsTo()
			await this.getActiveSheet()
		} catch (error) {
			throw Log.error('cleanNumerationIni', error)
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
			const isLoaded = await elements.firstOpenScenarioCreateMatrixElements(
				sheets
			)
			if (!isLoaded) {
				return false
			}

			this.initializeStoreMutation(elements)
			this.setOutsideApp(sourceApp)
			await this.getActiveSheet()

			await this.saveSheetsTo()

			return true
		} catch (error) {
			throw Log.error('initializeStore', error)
		}
	}

	@Action
	async saveSheetsTo() {
		switch (this.outsideApp) {
			case 'browser':
				break
			case 'excelDesktop':
				const shts = this.getExcelSheets
				await this.changeExcelPositions(shts)
				await this.changeExcelNames(shts)
				break
		}
	}

	public appContext: Excel.RequestContext | undefined = undefined
	/** function to assign updated elements to state */
	@Mutation
	public setExcelContextMutation(context: Excel.RequestContext) {
		this.appContext = context
	}
	@Action
	public async setExcelContext(context: Excel.RequestContext) {
		this.setExcelContextMutation(context)
	}

	/** ACTIVE SHEET START*/
	public activeSheetId: string = ''
	public get getActiveSheetId() {
		return this.activeSheetId
	}
	@Mutation
	public selectSheetMut(elId: string) {
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
	/** ACTIVE SHEET END*/

	// #endregion Public Methods (13)
}
