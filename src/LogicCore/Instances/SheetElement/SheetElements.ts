import { Basic } from "./Basic";

export class SheetElementsMap extends Basic
  implements SheetElementsInterface.SheetElementsMap {
  // #region Properties (2)

  private _map: SheetElementsInterface.EMap = new Map();

  public maintainerStatuses = {
    areSheetsHaveNumeration: false,
    isNumerationBroken: false,
    shouldWeRestoreNumeration: false
  };

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor({
    typeOfName,
    delimiter,
    _classTitle,
    excelSheets
  }: SheetElementsInterface.SheetElementsMapConstructor) {
    super({
      _classTitle: _classTitle ? _classTitle : "SheetElementsMap",
      typeOfName,
      delimiter
    });
    Promise.resolve(this.firstOpenScenarioCreateSheetElements(excelSheets));
  }

  // #endregion Constructors (1)

  // #region Public Methods (8)

  /**
   * @description
   * Names in excel cannot be same.
   * So, before we will write and make any changes,
   * we will need to be shure and check,
   * that all names are unique
   */
  public async correctDoubles(): Promise<void> {
    try {
      let newSheets: SheetElementsInterface.EMap = new Map();
      let sheetNames: string[] = [];
      let i: number = 1;
      const entries = this.entries();
      /** function to check and choose available name */
      const chooseName = (sheetName: string): string => {
        if (sheetNames.includes(sheetName)) {
          const newSheetName: string = sheetName + String(i);
          i++;
          return chooseName(newSheetName);
        } else {
          return sheetName;
        }
      };
      for (const [sheetId, sheet] of entries) {
        if (sheet === undefined) throw "correctDoubles has sheet === undefined";
        const sheetName: string = chooseName(sheet.name);
        sheet.name = sheetName;
        sheetNames.push(sheetName);
        newSheets.set(sheetId, sheet);
      }

      await this.writeSheets(newSheets);
    } catch (error) {
      throw this.log.error("correctDoubles", error);
    }
  }

  public entries() {
    try {
      const entries = this._map.entries();
      return entries;
    } catch (error) {
      throw this.log.error("entries", error);
    }
  }

  /**
   * @description
   * We need to check:
   * 1. Auto -> Is it has numeration?
   * 2. --! It has / has not full
   * 3. Human -> we need to show dialogue: restore all or go simple?
   * 4. -- Yes - Correct all numeration
   * 5. Reordering sheets
   * 6. Check for doubles
   * 7. Renaming
   * -
   * 2. -- No - go simple
   * 3. It has and all is correct
   * 4. Reordering sheets
   * 2. --! Go simple: load original names
   */
  public async firstOpenScenarioCreateSheetElements(
    excelSheets: Excel.Worksheet[]
  ): Promise<void> {
    try {
      /** firstly we conevert all sheets to elements map */
      await this._simpleSheetsLoading(excelSheets);
      await this._sheetsNumerationMaintainer();
      if (
        this.maintainerStatuses.areSheetsHaveNumeration &&
        !this.maintainerStatuses.isNumerationBroken
      ) {
        /** if numeration is ok,
         * then we need to reorder accordingly */
        /** TODO:call some method to reorder sheets */
      }
    } catch (error) {
      throw this.log.error("firstOpenScenarioCreateSheetElements", error);
    }
  }

  /**
   * @description
   *
   */
  public async numerateSheets() {
    /** first, we need to make correct hierarhy
     * second, we need to find doubles and correct names and positions
     * third, we need to rename all sheets
     * Making correct hierarhy:
     * 1. Element exists, but name == protoName
     * 1.1 No elements -> place is free
     * -> child elements can be placed
     * 1.2 Has elements -> place is free
     * -> child elements can be placed
     * 2. Element exists, but name != protoName
     * -> child elements can be placed
     * -> place is taken
     * -> find last number + 1
     * -> take this place
     * 3. Element not exists
     * -> place is free
     * -> place protoElement
     * -> child elements can be placed
     */
    try {
      let elementProto = {} as SheetElementsInterface.SheetElement;
      let areItemsWereShifted: boolean = false;
      let maxFirstNumber: number = 0;
      let allTempElements: SheetElementsInterface.EMap = new Map();
      const DEL: string = "DEL";
      // console.log('sheets elements',elements)
      for (let sheet of excelSheets) {
        let shiftNumber: number = 0;
        let element: SheetElement = {
          id: sheet.id,
          name: sheet.name,
          color: sheet.tabColor,
          orderNumber: "",
          isVisible: sheet.visibility,
          elements: new Map() as SheetElements
        };

        let positions: returnedNumbers | undefined = this.decode(element.name);
        /** if positions failed, then we need to rename all sheets
         * and then start process again
         */
        if (positions === undefined) return { items: undefined, status: false };
        if (positions.status == false) {
          console.log("warn", element.name);
          return { items: this.createSheets(excelSheets), status: false };
        }

        /** Check is it in a group or not */
        let [firstPosition, secondPosition] = positions.items;

        function setNewMaxFirstPosition(newOne: number): void {
          try {
            maxFirstNumber = newOne > maxFirstNumber ? newOne : maxFirstNumber;
          } catch (error) {
            console.log("setNewMaxFirstPosition", error);
          }
        }
        class ShiftedFirstPosition {
          constructor() {}
          static onlyNumber: number = firstPosition + shiftNumber;
          static withKey: string = DEL + ShiftedFirstPosition.onlyNumber;
        }

        let el: SheetElement | undefined;
        const elementExists: boolean = allTempElements.has(
          ShiftedFirstPosition.withKey
        );
        if (elementExists) {
          el = allTempElements.get(ShiftedFirstPosition.withKey);
        } else {
          el = elementProto;
        }
        if (el === undefined) throw "some error";
        const isItChildElement: boolean = Number(secondPosition) > 0;

        if (isItChildElement) {
          // console.log('child element',element)
          let maxChildrenNumber: number = 0;
          function childId(): string {
            if (maxChildrenNumber > 0) {
              const max: number =
                maxChildrenNumber + 1 > secondPosition
                  ? maxChildrenNumber
                  : secondPosition;
              return DEL + (max + 1);
            } else {
              return DEL + secondPosition;
            }
          }

          const isChildExists = childId() in el.elements;
          // console.log(isChildExists)
          if (isChildExists) {
            maxChildrenNumber = Object.values(el.elements).length;
            areItemsWereShifted = true;
          }
          // console.log('maxNumber',{id:childId(),maxChildrenNumber})
          el.elements.set(childId(), element);
          allTempElements.set(ShiftedFirstPosition.withKey, el);
          // console.log('children all elements',{all:(allTempElements),el})
        } else {
          /** check name of element, if it is not equal
           * and its not proto, then we need to
           * shift it down
           * */
          // console.log('el/element',{el,element})
          /** FIXME: algorithm of children and parents is broken */

          switch (true) {
            case !elementExists:
              // console.log('element not exists',element)
              allTempElements.set(DEL + firstPosition, element);
              break;
            case el.name == elementProto.name:
              // console.log('el.name == elementProto.name',element)
              let childElements = el.elements;
              element.elements = childElements;
              allTempElements.set(DEL + firstPosition, element);
              break;
            case el.id != element.id:
              /** need to shift element */
              // console.log('el.id != element.id',element)
              shiftNumber++;
              areItemsWereShifted = true;
              const newMaxNumber = maxFirstNumber + shiftNumber;
              setNewMaxFirstPosition(newMaxNumber);
              allTempElements.set(DEL + newMaxNumber, element);
              break;
            default:
              console.log(
                "what's going on? detailed loading worksheet",
                element
              );
              break;
          }
          setNewMaxFirstPosition(firstPosition + shiftNumber);
        }
        // console.log('el',el)
      }

      function cleanDelimiters(keys: string[]): number[] | undefined {
        try {
          let newKeys: number[] = [];
          for (let key of keys) {
            const newKey: number = Number(key.replace(DEL, ""));
            newKeys.push(newKey);
          }
          return newKeys;
        } catch (error) {
          console.log("cleanDelimiters", error);
        }
      }

      /** let's reorder all items */
      function reordering(groupElements: Map<string, SheetElement>) {
        try {
          let groupValues: SheetElement[] = [];
          let groupKeys: number[] | undefined = cleanDelimiters(
            Object.keys(groupElements)
          );
          if (groupKeys !== undefined) {
            groupKeys.sort((a, b) => a - b);
            for (let key of groupKeys) {
              const el: SheetElement | undefined = groupElements.get(DEL + key);
              if (el !== undefined) {
                /** if child elements >0 then we need to reorder them too*/
                let newEl = new Object();
                let childElements: SheetElement[] | undefined;
                for (let [propKey, propValue] of Object.entries(el)) {
                  if (propKey == "elements") {
                    const childKeys: string[] = Object.keys(el.elements);
                    childElements =
                      childKeys.length > 0 ? reordering(el.elements) : [];
                  } else {
                    newEl[propKey] = propValue;
                  }
                }
                // Object.assign(newEl, el)
                // el.elements = childElements
                // groupValues.push(el)
              } else {
                /** throw error */
              }
            }
            return groupValues;
          } else {
            /** throw error */
          }
        } catch (error) {
          console.log("reordering", error);
        }
      }

      let reorderedItems = reordering(allTempElements);
      // console.log(reorderedItems)
      // console.log('reorderedItems',reorderedItems)
      let encodedItems = self.encodeAllSheetsElements(reorderedItems);
      // console.log('encodedItems',encodedItems)
      // console.log(areItemsWereShifted)
      return { items: encodedItems, status: true, areItemsWereShifted };
    } catch (error) {
      console.log("numerationEncoder.createNumeratedSheets", error);
    }
  }
  /**
   * @description Extract all possible names
   */
  public async reorderSheets(): Promise<void> {
    try {
    } catch (error) {
      throw this.log.error("reorderSheets", error);
    }
  }

  public async repairSheetsNames(): Promise<void> {
    try {
    } catch (error) {
      throw this.log.error("repairSheetsNames", error);
    }
  }

  /**@description
   * if user will need
   * we will try to restore numeration */
  public async sheetsNumerationRepairer(): Promise<void> {
    if (this.maintainerStatuses.shouldWeRestoreNumeration) {
      /** TODO:write method to rewrite names sheets */
      await this.repairSheetsNames();
      /** TODO:call some method to reorder sheets */
      await this.reorderSheets();
    }
  }

  public async writeSheets(
    sheetsEMap: SheetElementsInterface.EMap
  ): Promise<void> {
    try {
      this._map = sheetsEMap;
    } catch (error) {
      throw this.log.error("writeSheets", error);
    }
  }

  // #endregion Public Methods (8)

  // #region Private Methods (2)

  private async _sheetsNumerationMaintainer(): Promise<void> {
    try {
      /** now we need to check every sheet - is it has encoded pattern */
      this.maintainerStatuses.areSheetsHaveNumeration = ((): boolean => {
        let hasNumeration: boolean = false;
        for (let sheet of this._map.values()) {
          if (!hasNumeration) {
            hasNumeration = sheet._doesNameIncludesNumerationPattern();
          } else if (hasNumeration) {
            /** if one sheet will have numeration,
             * then every sheet after it will be checked
             * for borken numeration condition
             *  */
            if (!sheet._doesNameIncludesNumerationPattern()) {
              this.maintainerStatuses.isNumerationBroken = true;
              return hasNumeration;
            }
          }
        }
        return hasNumeration;
      })();
    } catch (error) {
      throw this.log.error("_sheetsNumerationMaintainer", error);
    }
  }

  private async _simpleSheetsLoading(
    excelSheets: Excel.Worksheet[]
  ): Promise<void> {
    try {
      const { SheetElement } = await import("./SheetElement");
      let allElements: SheetElementsInterface.EMap = new Map();
      for (const [index, excelSheet] of Object.entries(excelSheets)) {
        const positions: SheetElementsInterface.Positions = {
          first: Number(index),
          second: 0
        };
        const options: SheetElementsInterface.SheetElementConstructor = {
          color: excelSheet.tabColor,
          name: excelSheet.name,
          typeOfName: this.typeOfName,
          positions,
          id: excelSheet.id,
          visibility: excelSheet.visibility,
          delimiter: this.delimiter,
          elements: undefined,
          _classTitle: undefined
        };

        const element = new SheetElement(options);

        allElements.set(element.id, element);
      }
      await this.writeSheets(allElements);
    } catch (error) {
      throw this.log.error("_simpleSheetsLoading", error);
    }
  }

  // #endregion Private Methods (2)
}
