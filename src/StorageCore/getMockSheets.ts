import { SheetElement } from '@/LogicCore/Instances/SheetElement/SheetElement'

const getMockSheets = async function(): Promise<SheetElementsInterface.sheetsSource> {
	const positions: SheetElementsInterface.Positions = {
		first: Number(0),
		second: 0,
	}
	const options: SheetElementsInterface.SheetElementConstructor = {
		color: '',
		name: 'test',
		typeOfName: '_excelSheetName',
		positions,
		id: 'testingID',
		visibility: 'Visible',
		delimiter: '_',
		elements: undefined,
		_classTitle: undefined,
	}

	const element = new SheetElement(options)
	const copyObject = new SheetElement(options)
	const copyObject1 = new SheetElement(options)
	const copyObject2 = new SheetElement(options)
	copyObject.id = 'testing2'
	copyObject1.id = 'testing3'
	copyObject1.positions.first=2
	copyObject2.id = 'testing4'
	copyObject2.positions.first = 1
	copyObject2.positions.second = 2
	return [element,copyObject, copyObject1, copyObject2]
}
export default getMockSheets
