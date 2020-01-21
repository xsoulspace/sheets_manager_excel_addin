export const getKeysAndSort = (
  oldMap: SheetElementsInterface.EMap
): SheetElementsInterface.EMap => {
  const tempMap: SheetElementsInterface.EMap = new Map();
  const oldKeys = [...oldMap.keys()]
  const keys: SheetElementsInterface.SheetElement["id"][] = 
    (oldKeys).sort((a, b) => {
    return Number(a) - Number(b);
  });
  for (let [i, key] of Object.entries(keys)) {
    const element: SheetElementsInterface.SheetElement | undefined = oldMap.get(
      key
    );
    if (element) {
      const elementMap = element.elements;
      element.elements = getKeysAndSort(elementMap);
      tempMap.set(key, element);
    }
  }
  return tempMap;
};
