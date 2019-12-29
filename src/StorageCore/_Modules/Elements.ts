import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
@Module
export default class Elements extends VuexModule {
  elementsMap: SheetElementsInterface.SheetElementsMap;


	/** function to assign updated elements to state */
	@Mutation
	setElementsMutation(sheets: SheetElementsInterface.EMap){
		this.elementsMap.writeSheets(sheets);
	}
  @Action
  async setElements(sheets: SheetElementsInterface.EMap): Promise<void> {
    this.setElementsMutation(sheets)
	}

	@Mutation
	initializeStoreMutation(elementsMap: SheetElementsInterface.SheetElementsMap){
		this.elementsMap = elementsMap
	}
  @Action
  async initializeStore(): Promise<void> {
    const { SheetElementsMap } = await import(
      "@/LogicCore/Instances/SheetElement/SheetElements"
    );
    const options: SheetElementsInterface.SheetElementsMapConstructor = {
      typeOfName: "_excelSheetName",
      delimiter: "_",
      _classTitle: "SheetElementsMap",
      excelSheets: []
    };
    const elementsMap: SheetElementsInterface.SheetElementsMap = new SheetElementsMap(
      options
		);
		this.initializeStoreMutation(elementsMap) 
  }
}
