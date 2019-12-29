export const checkNameAndTryNew = (
  sheetName: string,
  namesMap: Map<string,string>,
  max: number
): string => {
  if (namesMap.has(sheetName)) {
    const newSheetName: string = sheetName + String(max);
    max++;
    return checkNameAndTryNew(newSheetName, namesMap, max);
  } else {
    return sheetName;
  }
};
