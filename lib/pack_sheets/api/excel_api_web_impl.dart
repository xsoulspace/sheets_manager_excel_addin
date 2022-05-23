import 'package:sheet_manager/pack_sheets/api/excel_api_i.dart';
import 'package:sheet_manager/pack_sheets/pack_sheets.dart';

class ExcelApiWebImpl implements ExcelApiI {
  @override
  Future<List<SheetModel>> getSheets() {
    // TODO: implement getSheets
    throw UnimplementedError();
  }

  @override
  Future<void> renameSheet(
      {required final SheetModel sheet, required final String oldName}) {
    // TODO: implement renameSheet
    throw UnimplementedError();
  }

  @override
  Future<void> reorderSheets(final List<SheetModel> sheets) {
    // TODO: implement reorderSheets
    throw UnimplementedError();
  }
}
