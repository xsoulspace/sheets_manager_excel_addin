/// <reference path="../index.d.ts"/>

namespace MatrixElementInterface {
	export type outsideApp = 'browser' | 'excelDesktop'
	export type sheetsSource = Excel.Worksheet[] | any[]
	export type ClassTitle = 'Basic' | 'MatrixElement'
	export interface Basic extends SheetElementsInterface.Basic {}
	export interface Positions extends SheetElementsInterface.Positions {}
	export interface BasicConstructor
		extends SheetElementsInterface.BasicConstructor {}
	export type NameType = '_excelSheetName' | '_decodedName' | '_encodedName'
	export type SheetVisibility =
		| Excel.SheetVisibility
		| 'Visible'
		| 'Hidden'
		| 'VeryHidden'
	export interface MatrixElement extends Basic {
		id: string
		name: string
		visibility: SheetVisibility
		color: string
		elements: MatrixElement[]
		positions: Positions
		_doesNameIncludesNumerationPattern(): boolean
		decodedName: string
	}
	export interface MatrixElementConstructor extends BasicConstructor {
		id: string
		name: string
		visibility: SheetVisibility
		color: string
		elements: []
		first: number
		second: number
	}
	export interface MEMap extends Map<MatrixElement['id'], MatrixElement> {}
	export interface MEArr extends Array<MatrixElement> {}
	export interface getPositionsAndSortOptions {
		oldArr: MEArr
		requereToCorrectType: boolean
		typeOfName: NameType
	}
	export interface MatrixController extends Basic {
		maintainerStatuses: {
			areSheetsHaveNumeration: boolean
			isNumerationBroken: boolean
			shouldWeRestoreNumeration: boolean
		}
		arrElements: MEArr
		firstOpenScenarioCreateMatrixElements(
			excelSheets: sheetsSource
		): Promise<void>
		changeSheetPosition(items: MEArr): Promise<void>
		sheetsNumerationRepairer(): Promise<void>
		reorderSheets({
			requereToCorrectType,
		}: {
			requereToCorrectType: boolean
		}): Promise<void>
		correctDoubles(): Promise<void>
		writeSheets(sheetsArr: MEArr): void
	}
	export interface MatrixControllerConstructor extends BasicConstructor {}
}