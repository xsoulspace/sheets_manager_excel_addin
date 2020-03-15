import { MatrixElement } from '@/LogicCore/Instances/MatrixElement/MatrixElement'

const getMockSheets = async function(): Promise<SheetElementsInterface.sheetsSource> {

	const options: MatrixElementInterface.MatrixElementConstructor = {
		color: '',
		name: 'test00_01',
		typeOfName: '_excelSheetName',
		first: 1,
		second: 1,
		id: 'testingID',
		visibility: 'Visible',
		delimiter: '_',
		elements: [],
		_classTitle: undefined,
	}
	const options2: MatrixElementInterface.MatrixElementConstructor = {
		color: '',
		name: 'test',
		typeOfName: '_excelSheetName',
		first: 1,
		second: 0,
		id: 'testing',
		visibility: 'Visible',
		delimiter: '_',
		elements: [],
		_classTitle: undefined,
	}
	const element = new MatrixElement(options)
	const copyObject = new MatrixElement(options)
	copyObject.name = 'te'
	const copyObject1 = new MatrixElement(options2)
	
	const copyObject2 = new MatrixElement(options)
	
	copyObject2.id = 'testing2'
	copyObject2.name = 'testing00_01'
	copyObject1.id = 'testing1'
	copyObject1.name = 'testing1'

	return [element,copyObject, copyObject1, copyObject2]
}
export default getMockSheets
