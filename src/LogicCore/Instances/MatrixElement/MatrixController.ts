import { Basic } from '@/LogicCore/Instances/SheetElement/Basic'
import {
	getKeysAndSort,
	getPositionsAndGroupEMap,
	getPositionsAndGroupEArr,
} from '@/LogicCore/Instances/SheetElementFunctions/GetKeysAndSort'
export class MatrixController extends Basic
	implements MatrixElementInterface.MatrixController {
	// #region Properties (2)

	private _arr: MatrixElementInterface.MEArr = []
	public get arrElements(): MatrixElementInterface.MEArr {
		return this._arr
	}
	// public set arrElements(arr: MatrixElementInterface.MEArr) {
	// 	this.firstOpenScenarioCreateMatrixElements(arr)
	// }
	public maintainerStatuses = {
		areSheetsHaveNumeration: false,
		isNumerationBroken: false,
		shouldWeRestoreNumeration: true,
	}

	// #endregion Properties (2)

	// #region Constructors (1)

	constructor({
		typeOfName,
		delimiter,
		_classTitle,
	}: MatrixElementInterface.MatrixControllerConstructor) {
		super({
			_classTitle: _classTitle ? _classTitle : 'SheetElementsMap',
			typeOfName,
			delimiter,
		})
	}
	// #endregion Constructors (1)

	// #region Public Methods (6)
	public async changeSheetPosition(
		items: MatrixElementInterface.MEArr
	): Promise<void> {
		try {
			await this.writeSheets(items)
			await this.usualSheetChange()
		} catch (error) {
			this.log.error('changeSheetPosition', error)
		}
	}

	public async usualSheetChange() {
		this._arr = await this.ReWriteNames(this._arr)
		await this._sheetsNumerationMaintainer()
		const {
			areSheetsHaveNumeration,
			isNumerationBroken,
		} = this.maintainerStatuses
		console.log('xx', this.maintainerStatuses)
		if (areSheetsHaveNumeration && !isNumerationBroken) {
			/** if numeration is ok, then we need to switch numeration type */
			// console.log('numeration is exists and not broken')
			await this.sheetsNumerationRepairer()
		} else if (areSheetsHaveNumeration && isNumerationBroken) {
			/** we need to show ui messgae to user do we need to restore  */
			await this.sheetsNumerationRepairer()
		} else {
			// console.log('numeration is exists and not broken')
			/** we will reorder all sheets accordingly to type */
			await this.reorderSheets({ requereToCorrectType: false })
		}
	}

	/**@description
	 * We need to check:
	 * 1. Auto -> Is it has numeration?
	 * 2. --! It has / has not full
	 * 3. Human -> we need to show dialogue: restore all or go simple?
	 * 4. -- Yes - Correct all numeration
	 * 5. Reordering sheets
	 * 6. Check for doubles
	 * 7. Renaming
	 * -
	 * 2. -- No - go simple
	 * 3. It has and all is correct
	 * 4. Reordering sheets
	 * 2. --! Go simple: load original names
	 */
	public async firstOpenScenarioCreateMatrixElements(
		excelSheets: MatrixElementInterface.sheetsSource
	): Promise<void> {
		try {
			/** firstly we conevert all sheets to elements map */
			// console.log('simple sheet loading starts', excelSheets)
			await this._simpleSheetsLoading(excelSheets)
			// console.log('sheet numeration maint starts', this._arr)
			await this._sheetsNumerationMaintainer()
			console.log('sheet numeration maint ends', this._arr)
			const {
				areSheetsHaveNumeration,
				isNumerationBroken,
			} = this.maintainerStatuses
			if (areSheetsHaveNumeration && !isNumerationBroken) {
				/** if numeration is ok, then we need to switch numeration type */
				// console.log('numeration is exists and not broken')
				await this.sheetsNumerationRepairer()
			} else if (areSheetsHaveNumeration && isNumerationBroken) {
				/** we need to show ui messgae to user do we need to restore  */
				await this.sheetsNumerationRepairer()
			} else {
				// console.log('numeration is exists and not broken')
				/** we will reorder all sheets accordingly to type */
				await this.reorderSheets({ requereToCorrectType: false })
			}
			// console.log('process end', this._arr)
		} catch (error) {
			throw this.log.error('firstOpenScenarioCreateSheetElements', error)
		}
	}

	/**@description
	 * if user will need
	 * we will try to restore numeration */
	public async sheetsNumerationRepairer(): Promise<void> {
		try {
			if (this.maintainerStatuses.shouldWeRestoreNumeration) {
				/** switch global type to numeration */
				this.typeOfName = '_encodedName'
				/** call method to reorder sheets */
				await this.reorderSheets({ requereToCorrectType: true })
			}
		} catch (error) {
			throw this.log.error('writeSheets', error)
		}
	}

	/**@description
	 * Reorder all sheets by requered type
	 */
	public async reorderSheets({
		requereToCorrectType,
	}: {
		requereToCorrectType: boolean
	}): Promise<void> {
		try {
			switch (this.typeOfName) {
				case '_encodedName':
					/** numeration loading */
					const options: MatrixElementInterface.getPositionsAndSortOptions = {
						requereToCorrectType,
						oldArr: this._arr,
						typeOfName: this.typeOfName,
					}
					const tempArr: MatrixElementInterface.MEArr = await getPositionsAndGroupEArr(
						options
					)
					/** resort elements */
					await this.writeSheets(tempArr)
					break
				default:
					/** simple loading */
					// console.log('reorder simple loading starts', this._arr)
					await this.correctDoubles()
					// console.log('reorder correct doubles ends', this._arr)
					await this.writeSheets(this._arr)
				// console.log('write sheets ends', this._arr)
			}
		} catch (error) {
			throw this.log.error('reorderSheets', error)
		}
	}

	/**@description
	 * Names in excel cannot be same.
	 * So, before we will write and make any changes,
	 * we will need to be shure and check,
	 * that all names are unique
	 */
	public async correctDoubles(): Promise<void> {
		try {
			let newSheets: MatrixElementInterface.MEArr = []
			let sheetNames: Map<string, string> = new Map()
			let i: number = 1
			const entries = this._arr
			/** function to check and choose available name */
			const { checkNameAndTryNew } = await import(
				'../SheetElementFunctions/CheckNameAndTryNew'
			)

			for (const sheet of entries) {
				if (sheet === undefined)
					throw 'correctDoubles has sheet === undefined'
				const sheetName: string = checkNameAndTryNew(
					sheet.name,
					sheetNames,
					i
				)
				sheet.name = sheetName
				sheetNames.set(sheetName, sheetName)
				newSheets.push(sheet)
			}

			await this.writeSheets(newSheets)
		} catch (error) {
			throw this.log.error('correctDoubles', error)
		}
	}
	public writeSheets(sheetsEMap: MatrixElementInterface.MEArr): void {
		try {
			this._arr = sheetsEMap
		} catch (error) {
			throw this.log.error('writeSheets', error)
		}
	}

	// #endregion Public Methods (6)

	// #region Private Methods (2)

	private async _sheetsNumerationMaintainer(): Promise<void> {
		try {
			/** now we need to check every sheet - is it has encoded pattern */
			this.maintainerStatuses.areSheetsHaveNumeration = ((): boolean => {
				let hasNumeration: boolean = false
				for (let sheet of this._arr) {
					if (hasNumeration === false) {
						hasNumeration = sheet._doesNameIncludesNumerationPattern()
						console.log('sheet', hasNumeration)
					} else if (hasNumeration) {
						console.log('hasNumeration', hasNumeration)

						/** if one sheet will have numeration,
						 * then every sheet after it will be checked
						 * for borken numeration condition
						 *  */
						if (!sheet._doesNameIncludesNumerationPattern()) {
							this.maintainerStatuses.isNumerationBroken = true
							return hasNumeration
						}
					}
				}
				return hasNumeration
			})()
		} catch (error) {
			throw this.log.error('_sheetsNumerationMaintainer', error)
		}
	}
	async ReWriteNames(arr: any[]){
		let newArr= []
		for (const i of arr) {
			console.log(i.name)
			i.decodedName = i.name
			console.log(i)
			if(i.elements.length> 0){
				i.elements = await this.ReWriteNames(i.elements)
			}
			newArr.push(i)
		}
		return newArr
	}
	private async _simpleSheetsLoading(
		sheets: MatrixElementInterface.sheetsSource
	): Promise<void> {
		try {
			const { MatrixElement } = await import('./MatrixElement')
			let allElements: MatrixElementInterface.MEArr = []
			for (let [index, sheet] of Object.entries(sheets)) {
				const { first, second } =
					'positions' in sheet
						? sheet.positions
						: { first: Number(index), second: 0 }
				const name = sheet.name
				const color = sheet.tabColor
				const visibility = sheet.visibility
				const id = sheet.id
				const options: MatrixElementInterface.MatrixElementConstructor = {
					color,
					name,
					typeOfName: this.typeOfName,
					first,
					second,
					id,
					visibility,
					delimiter: this.delimiter,
					elements: [],
					_classTitle: undefined,
				}

				const element = new MatrixElement(options)

				allElements.push(element)
			}
			await this.writeSheets(allElements)
		} catch (error) {
			throw this.log.error('_simpleSheetsLoading', error)
		}
	}

	// #endregion Private Methods (2)
}
