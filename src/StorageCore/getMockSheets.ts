import { SheetElement } from '@/LogicCore/Instances/SheetElement/SheetElement';

const getMockSheets = async function(): Promise<SheetElementsInterface.sheetsSource>{
    const positions: SheetElementsInterface.Positions = {
        first: Number(0),
        second: 0
      };
    const options: SheetElementsInterface.SheetElementConstructor = {
        color: '',
        name: 'test',
        typeOfName: '_excelSheetName',
        positions,
        id: 'testingID',
        visibility: 'Visible',
        delimiter: '_',
        elements: undefined,
        _classTitle: undefined
      };

    const element = new SheetElement(options);
    return [element]
}
export default getMockSheets
