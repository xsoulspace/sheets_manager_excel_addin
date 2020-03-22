interface SheetElementBasic{
  id: string,
  name: string,
  isVisible: string,
  color: string,
  orderNumber: string,
}
interface SheetElement extends SheetElementBasic{
  elements: Map<string, SheetElement>
}
interface SheetElements extends Map<SheetElement["id"], SheetElement>{}
export {SheetElement, SheetElements}
