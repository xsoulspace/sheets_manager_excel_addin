import 'package:sheet_manager/pack_sheets/api/excel_api_i.dart';
import 'package:sheet_manager/pack_sheets/api/excel_api_mock.dart'
    as excel_api_mock;
import 'package:sheet_manager/pack_sheets/pack_sheets.dart';

class ExcelApiMock extends excel_api_mock.ExcelApi {}

class ExcelApi implements ExcelApiI {
  @override
  Future<List<SheetModel>> getSheets() async {
    return [];
  }

  @override
  Future<void> renameSheet({
    required final SheetModel sheet,
  }) async {
    // TODO: implement renameSheet
    throw UnimplementedError();
  }

  @override
  Future<void> reorderSheets(final List<SheetModel> sheets) async {
    // TODO: implement reorderSheets
    throw UnimplementedError();
  }

  @override
  Future<SheetModel> getActiveSheet() async {
    return const SheetModel(name: '', id: '');
  }

  @override
  Future<void> setActiveSheet(final SheetModel sheet) async {
    // TODO: implement setActiveSheet
    throw UnimplementedError();
  }
}
