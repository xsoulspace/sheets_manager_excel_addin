import { SheetElement } from '@/LogicCore/Instances/SheetElement/SheetElement'

const getMockSheets = async function(): Promise<SheetElementsInterface.sheetsSource> {

	const options: SheetElementsInterface.SheetElementConstructor = {
		color: '',
		name: 'test00_01',
		typeOfName: '_excelSheetName',
		first: 1,
		second: 1,
		id: 'testingID',
		visibility: 'Visible',
		delimiter: '_',
		elements: undefined,
		_classTitle: undefined,
	}
	const options2: SheetElementsInterface.SheetElementConstructor = {
		color: '',
		name: 'test',
		typeOfName: '_excelSheetName',
		first: 1,
		second: 0,
		id: 'testing',
		visibility: 'Visible',
		delimiter: '_',
		elements: undefined,
		_classTitle: undefined,
	}
	const element = new SheetElement(options)
	const copyObject = new SheetElement(options)
	copyObject.name = 'te'
	const copyObject1 = new SheetElement(options2)
	
	const copyObject2 = new SheetElement(options)
	
	copyObject2.id = 'testing2'
	copyObject2.name = 'testing2'
	copyObject1.id = 'testing1'
	copyObject1.name = 'testing1'

	return [element,copyObject, copyObject1, copyObject2]
}
export default getMockSheets
