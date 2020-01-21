import { checkAndTry } from './CheckPositionAndTryNew'
const sortKeys = (oldMap: SheetElementsInterface.EMap)=>{
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
	const keys: SheetElementsInterface.SheetElement['id'][] =sortKeys(oldMap)
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



export const getPositionsAndSortEMap = ({
	oldMap,
	requereToCorrectType,
	typeOfName,
}: SheetElementsInterface.getPositionsAndSortEMapOptions): SheetElementsInterface.EMap => {
	let tempMap = new Map()
	for (let [key, sheet] of oldMap.entries()) {
		if (requereToCorrectType) sheet.typeOfName = typeOfName
		if (sheet.positions.second > 0) {
			let max: number = sheet.elements.size == 0 ? 1 : sheet.elements.size
			const el = tempMap.get(String(sheet.positions.second))
			const newElement = el
				? el
				: ({} as SheetElementsInterface.SheetElement)
			const pos = checkAndTry(
				sheet.positions.second,
				newElement.elements,
				max
			)
			sheet.positions.second = pos
			newElement.elements.set(String(sheet.positions.second), sheet)
			tempMap.set(String(newElement.positions.first), newElement)
		} else {
			let max: number = tempMap.size
			const pos = checkAndTry(sheet.positions.first, tempMap, max)
			sheet.positions.first = pos
			tempMap.set(String(sheet.positions.first), sheet)
		}
	}
	return tempMap
}
export const getSortedArray = (emap: SheetElementsInterface.EMap) => {
	let arr: SheetElementsInterface.SheetElement[] = []
	const keys = sortKeys(emap)
	for(let key of keys){
		const el = emap.get(key)
		if(el) arr.push(el)
	}
	return arr
}
