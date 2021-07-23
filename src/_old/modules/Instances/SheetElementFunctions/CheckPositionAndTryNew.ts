import { Log } from '@/LogicCore/Debug/Log'

export const checkAndTry = (
  position: number,
  eMap: SheetElementsInterface.EMap | MatrixElementInterface.MEMap,
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
export const checkAndTryArr = (
  position: number,
  eArr: number[],
  max: number
): number => {
  try {
    if (eArr.includes(position)) {
      position = max
      max++
      return checkAndTryArr(position, eArr, max)
    } else {
      return position
    }
  } catch (error) {
    throw Log.error('checkAndTry', error)
  }
}
