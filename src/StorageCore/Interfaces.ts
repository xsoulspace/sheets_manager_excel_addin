interface SheetElementBasic{
  id: string,
  name: string,
  isVisible: string,
  color: string,
}
interface SheetElementObject extends SheetElementBasic{
  elements: Map<string, SheetElementObject>
}
interface SheetElement extends SheetElementBasic{
  elements: SheetElement[] | []
}
export {SheetElement, SheetElementObject}