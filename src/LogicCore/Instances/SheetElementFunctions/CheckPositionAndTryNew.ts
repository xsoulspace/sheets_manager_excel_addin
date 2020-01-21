import { Log } from '@/LogicCore/Debug/Log'

export const checkAndTry = (
	position: number,
	eMap: SheetElementsInterface.EMap,
	max: number
): number => {
	try {
		if (eMap.has(String(position))) {
			position = max
			max++
			return checkAndTry(position, eMap, max)
		} else {
			return position
		}
	} catch (error) {
		throw Log.error('checkAndTry', error)
	}
}
