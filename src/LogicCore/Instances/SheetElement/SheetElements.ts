import { Basic } from './Basic'
import { checkAndTry } from '@/LogicCore/Instances/SheetElementFunctions/CheckPositionAndTryNew'
import { getKeysAndSort } from '@/LogicCore/Instances/SheetElementFunctions/GetKeysAndSort'
export class SheetElementsMap extends Basic
	implements SheetElementsInterface.SheetElementsMap {
	// #region Properties (2)

	private _map: SheetElementsInterface.EMap = new Map()

	public maintainerStatuses = {
		areSheetsHaveNumeration: false,
		isNumerationBroken: false,
		shouldWeRestoreNumeration: false,
	}

	// #endregion Properties (2)

	// #region Constructors (1)

	constructor({
		typeOfName,
		delimiter,
		_classTitle,
	}: SheetElementsInterface.SheetElementsMapConstructor) {
		super({
			_classTitle: _classTitle ? _classTitle : 'SheetElementsMap',
			typeOfName,
			delimiter,
		})
	}

	// #endregion Constructors (1)

	// #region Public Methods (6)

	public entries() {
		try {
			const entries = this._map.entries()
			return entries
		} catch (error) {
			throw this.log.error('entries', error)
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
	public async firstOpenScenarioCreateSheetElements(
		excelSheets: SheetElementsInterface.sheetsSource
	): Promise<void> {
		try {
			/** firstly we conevert all sheets to elements map */
			// console.log('simple sheet loading starts', this._map)
			await this._simpleSheetsLoading(excelSheets)
			// console.log('sheet numeration maint starts', this._map)
			await this._sheetsNumerationMaintainer()
			// console.log('sheet numeration maint ends', this._map)
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
			} else {
				// console.log('numeration is exists and not broken')
				/** we will reorder all sheets accordingly to type */
				await this.reorderSheets({ requereToCorrectType: false })
			}
			// console.log('process end', this._map)
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
				/** TODO:call some method to reorder sheets */
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
					const tempMap: SheetElementsInterface.EMap = new Map()
					for (let sheet of this._map.values()) {
						if (requereToCorrectType)
							sheet.typeOfName = this.typeOfName
						// const el = {} as SheetElementsInterface.SheetElement;
						/** chec if elements exists */
						if (sheet.positions.second > 0) {
							let max: number =
								sheet.elements.size == 0
									? 1
									: sheet.elements.size
							const el = tempMap.get(
								String(sheet.positions.second)
							)
							const newElement = el
								? el
								: ({} as SheetElementsInterface.SheetElement)
							const pos = checkAndTry(
								sheet.positions.second,
								newElement.elements,
								max
							)
							sheet.positions.second = pos
							newElement.elements.set(
								String(sheet.positions.second),
								sheet
							)
							tempMap.set(
								String(newElement.positions.first),
								newElement
							)
						} else {
							let max: number = tempMap.size
							const pos = checkAndTry(
								sheet.positions.first,
								tempMap,
								max
							)
							sheet.positions.first = pos
							tempMap.set(String(sheet.positions.first), sheet)
						}
					}
					/** resort elements */
					await this.writeSheets(getKeysAndSort(tempMap))
					break;
				default:
					/** simple loading */
					// console.log('reorder simple loading starts', this._map)
					await this.correctDoubles()
					// console.log('reorder correct doubles ends', this._map)
					await this.writeSheets(getKeysAndSort(this._map))
					// console.log('write sheets ends', this._map)

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
			let newSheets: SheetElementsInterface.EMap = new Map()
			let sheetNames: Map<string, string> = new Map()
			let i: number = 1
			const entries = this.entries()
			/** function to check and choose available name */
			const { checkNameAndTryNew } = await import(
				'../SheetElementFunctions/CheckNameAndTryNew'
			)

			for (const [sheetId, sheet] of entries) {
				if (sheet === undefined)
					throw 'correctDoubles has sheet === undefined'
				const sheetName: string = checkNameAndTryNew(
					sheet.name,
					sheetNames,
					i
				)
				sheet.name = sheetName
				sheetNames.set(sheetName, sheetName)
				newSheets.set(sheetId, sheet)
			}

			await this.writeSheets(newSheets)
		} catch (error) {
			throw this.log.error('correctDoubles', error)
		}
	}
	public get eMap(): SheetElementsInterface.EMap {
		return this._map
	}
	public writeSheets(sheetsEMap: SheetElementsInterface.EMap): void {
		try {
			this._map = sheetsEMap
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
				for (let sheet of this._map.values()) {
					if (!hasNumeration) {
						hasNumeration = sheet._doesNameIncludesNumerationPattern()
					} else if (hasNumeration) {
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

	private async _simpleSheetsLoading(
		excelSheets: SheetElementsInterface.sheetsSource
	): Promise<void> {
		try {
			const { SheetElement } = await import('./SheetElement')
			let allElements: SheetElementsInterface.EMap = new Map()
			for (const [index, excelSheet] of Object.entries(excelSheets)) {
				const positions: SheetElementsInterface.Positions = {
					first: Number(index),
					second: 0,
				}
				const options: SheetElementsInterface.SheetElementConstructor = {
					color: excelSheet.tabColor,
					name: excelSheet.name,
					typeOfName: this.typeOfName,
					positions,
					id: excelSheet.id,
					visibility: excelSheet.visibility,
					delimiter: this.delimiter,
					elements: undefined,
					_classTitle: undefined,
				}

				const element = new SheetElement(options)

				allElements.set(element.id, element)
			}
			await this.writeSheets(allElements)
		} catch (error) {
			throw this.log.error('_simpleSheetsLoading', error)
		}
	}

	// #endregion Private Methods (2)
}
