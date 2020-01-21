export const checkNameAndTryNew = (
  sheetName: string,
  namesMap: Map<string,string>,
  max: number
): string => {
  if (namesMap.has(sheetName)) {
    const newSheetName: string = sheetName + String(max);
    if(!namesMap.has(newSheetName)) return newSheetName
    max++;
    return checkNameAndTryNew(sheetName, namesMap, max);
  } else {
    return sheetName;
  }
};
