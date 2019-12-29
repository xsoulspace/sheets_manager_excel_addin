import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
@Module
export default class Elements extends VuexModule {
  elementsMap!: SheetElementsInterface.SheetElementsMap;

	get sheets(){
		return this.elementsMap.eMap
	}

	/** function to assign updated elements to state */
	@Mutation
	setSheetsMutation(sheets: SheetElementsInterface.EMap){
		this.elementsMap.writeSheets(sheets);
	}
  @Action
  async setSheets(sheets: SheetElementsInterface.EMap): Promise<void> {
    this.setSheetsMutation(sheets)
	}
	@Mutation
	setExcelContextMutation(context: Excel.RequestContext){
		this.appSettings.excelContext = context
	}
	@Action
	async setExcelContext(context: Excel.RequestContext){
		this.setExcelContextMutation(context)
	}

	@Mutation
	initializeStoreMutation(elementsMap: SheetElementsInterface.SheetElementsMap){
		this.elementsMap = elementsMap
	}
  @Action
  async initializeStore(sheets: SheetElementsInterface.sheetsSource): Promise<void> {
    const { SheetElementsMap } = await import(
      "@/LogicCore/Instances/SheetElement/SheetElements"
    );
    const options: SheetElementsInterface.SheetElementsMapConstructor = {
      typeOfName: "_excelSheetName",
      delimiter: "_",
      _classTitle: "SheetElementsMap",
      excelSheets: sheets
    };
    const elementsMap: SheetElementsInterface.SheetElementsMap = new SheetElementsMap(
      options
		);
		this.initializeStoreMutation(elementsMap) 
  }
}
