import { checkAndTry, checkAndTryArr } from './CheckPositionAndTryNew'
import { Log } from '@/LogicCore/Debug/Log'
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


export const rewritePositions = async (
	arr: MatrixElementInterface.MEArr,
	level: number = 0,
	upperLevel: number = 0
): Promise<MatrixElementInterface.MEArr> => {
	let newArr: MatrixElementInterface.MEArr = []
	for (let [i, el] of arr.entries()) {
		let newEl = el
		if (level == 0) {
			newEl.positions.first = i
			newEl.positions.second = 0
		} else {
			newEl.positions.first = upperLevel
			newEl.positions.second = i + 1
		}
		if (newEl.elements.length > 0) {
			newEl.elements = await rewritePositions(
				newEl.elements,
				1,
				newEl.positions.first
			)
		}
		newArr.push(newEl)
	}
	return newArr
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
		let tempMap: MatrixElementInterface.MEMap = new Map()
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
				let pos: number =
					finalElement.elements.length == 0
						? 1
						: finalElement.elements.length
				changingSheet.positions.second = pos
				/**
				 * then we need to put new element in as an element
				 */
				finalElement.elements.splice(pos, 0, changingSheet)
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
