export const checkAndTry = (
  position: number,
  eMap: SheetElementsInterface.EMap,
  max: number
): number => {
  if (eMap.has(String(position))) {
    position = max;
    max++;
    return checkAndTry(position, eMap, max);
  } else {
    return position;
  }
};
