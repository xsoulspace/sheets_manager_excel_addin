import { checkAndTry, checkAndTryArr } from './CheckPositionAndTryNew'
import { Log } from '@/LogicCore/Debug/Log'
import { SheetElement } from '@/LogicCore/Instances/SheetElement/SheetElement'
import { MatrixElement } from '../MatrixElement/MatrixElement'
const sortKeys = (oldMap: SheetElementsInterface.EMap) => {
	const oldKeys = [...oldMap.keys()]
	const keys: SheetElementsInterface.SheetElement['id'][] = oldKeys.sort(
		(a, b) => {
			return Number(a) - Number(b)
		}
	)
	return keys
}

export const getKeysAndSort = (
	oldMap: SheetElementsInterface.EMap
): SheetElementsInterface.EMap => {
	const tempMap: SheetElementsInterface.EMap = new Map()
	const keys: SheetElementsInterface.SheetElement['id'][] = sortKeys(oldMap)
	for (let [i, key] of Object.entries(keys)) {
		const element:
			| SheetElementsInterface.SheetElement
			| undefined = oldMap.get(key)
		if (element) {
			const elementMap = element.elements
			element.elements = getKeysAndSort(elementMap)
			tempMap.set(key, element)
		}
	}
	return tempMap
}
export const getSortedArray = (emap: SheetElementsInterface.EMap) => {
	let arr: SheetElementsInterface.SheetElement[] = []
	const keys = sortKeys(emap)
	for (let key of keys) {
		const el = emap.get(key)
		if (el) arr.push(el)
	}
	return arr
}
/**
 * Method to group all items
 * Returns position based key map with elements
 * @param param0
 */
export const getPositionsAndGroupEMap = ({
	oldMap,
	requereToCorrectType,
	typeOfName,
}: SheetElementsInterface.getPositionsAndSortEMapOptions): SheetElementsInterface.EMap => {
	try {
		const NONEEXISTS = 'nonexists'
		let tempMap: SheetElementsInterface.EMap = new Map()
		for (let [key, sheet] of oldMap.entries()) {
			if (requereToCorrectType) sheet.typeOfName = typeOfName
			if (sheet.positions.second > 0) {
				/** if second position is > 0
				 * 	then we need to place it to elements
				 * */
				const changingSheet = sheet
				let tempElement = tempMap.get(
					String(changingSheet.positions.first)
				)
				const options: SheetElementsInterface.SheetElementConstructor = {
					color: '',
					name: NONEEXISTS,
					typeOfName: changingSheet.typeOfName,
					first: changingSheet.positions.first,
					second: 0,
					id: '',
					visibility: 'Visible',
					delimiter: changingSheet.delimiter,
					elements: undefined,
					_classTitle: undefined,
				}
				let finalElement = tempElement
					? tempElement
					: new SheetElement(options)
				let max: number =
					finalElement.elements.size == 0
						? 1
						: finalElement.elements.size
				const pos = checkAndTry(
					changingSheet.positions.second,
					finalElement.elements,
					max
				)
				changingSheet.positions.second = pos
				/**
				 * then we need to put new element in as an element
				 */
				finalElement.elements.set(
					String(changingSheet.positions.second),
					changingSheet
				)
				tempMap.set(String(finalElement.positions.first), finalElement)
			} else {
				let max: number = tempMap.size
				const pos = checkAndTry(sheet.positions.first, tempMap, max)
				sheet.positions.first = pos
				tempMap.set(String(sheet.positions.first), sheet)
			}
		}
		/** we need to check all first position
		 * sheets to delete empty one if children elements size <= 1
		 * or replace to one of children
		 * */
		let finalMap: SheetElementsInterface.EMap = new Map()
		for (let [firstPos, el] of tempMap.entries()) {
			if (el.decodedName == NONEEXISTS) {
				let newEl: SheetElementsInterface.SheetElement
				if (el.elements.size > 0) {
					let isFirstEl: boolean = true
					for (let [secondPos, child] of el.elements) {
						if (isFirstEl) {
							newEl = child
							newEl.positions.second = 0
							isFirstEl = false
						} else {
							//@ts-ignore
							newEl.elements.set(secondPos, child)
						}
					}
				} else {
					newEl = el
				}
				//@ts-ignore
				finalMap.set(firstPos, newEl)
			} else {
				finalMap.set(firstPos, el)
			}
		}
		return finalMap
	} catch (error) {
		throw Log.error('getPositionsAndSortEMap', error)
	}
}

/**
 * Method to group all items
 * Returns position based key map with elements
 * @param param0
 */
export const getPositionsAndGroupEArr = ({
	oldArr,
	requereToCorrectType,
	typeOfName,
}: MatrixElementInterface.getPositionsAndSortOptions): MatrixElementInterface.MEArr => {
	try {
		const NONEEXISTS = 'nonexists'
		let tempMap: MatrixElementInterface.MEMap= new Map()
		for (let sheet of oldArr) {
			if (requereToCorrectType) sheet.typeOfName = typeOfName
			if (sheet.positions.second > 0) {
				/** if second position is > 0
				 * 	then we need to place it to elements
				 * */
				const changingSheet = sheet
				let tempElement = tempMap.get(
					String(changingSheet.positions.first)
				)
				const options: MatrixElementInterface.MatrixElementConstructor = {
					color: '',
					name: NONEEXISTS,
					typeOfName: changingSheet.typeOfName,
					first: changingSheet.positions.first,
					second: 0,
					id: '',
					visibility: 'Visible',
					delimiter: changingSheet.delimiter,
					elements: [],
					_classTitle: undefined,
				}
				let finalElement = tempElement
					? tempElement
					: new MatrixElement(options)
				let max: number =
					finalElement.elements.length == 0
						? 1
						: finalElement.elements.length
				const pos = checkAndTryArr(
					changingSheet.positions.second,
					finalElement.elements.map(el=>el.positions.second),
					max
				)
				changingSheet.positions.second = pos
				/**
				 * then we need to put new element in as an element
				 */
				finalElement.elements.splice(pos,0,changingSheet)
				tempMap.set(String(finalElement.positions.first), finalElement)
			} else {
				let max: number = tempMap.size
				const pos = checkAndTry(sheet.positions.first, tempMap, max)
				sheet.positions.first = pos
				tempMap.set(String(sheet.positions.first), sheet)
			}
		}
		/** we need to check all first position
		 * sheets to delete empty one if children elements size <= 1
		 * or replace to one of children
		 * */
		let finalArr: MatrixElementInterface.MEArr = []
		for (let [firstPos, el] of tempMap.entries()) {
			if (el.decodedName == NONEEXISTS) {
				let newEl: MatrixElementInterface.MatrixElement = {} as MatrixElementInterface.MatrixElement
				if (el.elements.length > 0) {
					let isFirstEl: boolean = true
					for (let child of el.elements) {
						if (isFirstEl) {
							newEl = child
							newEl.positions.second = 0
							isFirstEl = false
						} else {
							newEl.elements.push(child)
						}
					}
				} else {
					newEl = el
				}

				finalArr.push(newEl)
			} else {
				finalArr.push(el)
			}
		}
		return finalArr
	} catch (error) {
		throw Log.error('getPositionsAndSortEArr', error)
	}
}
