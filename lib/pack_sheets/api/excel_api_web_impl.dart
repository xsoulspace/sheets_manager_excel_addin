import 'package:sheet_manager/pack_sheets/api/excel_api_i.dart';
import 'package:sheet_manager/pack_sheets/pack_sheets.dart';

class ExcelApiWebImpl implements ExcelApiI {
  @override
  Future<List<SheetModel>> getSheets() async {
    // TODO: implement getSheets
    throw UnimplementedError();
  }

  @override
  Future<void> renameSheet({
    required final SheetModel sheet,
    required final String oldName,
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
    // TODO: implement getActiveSheet
    throw UnimplementedError();
  }

  @override
  Future<void> setActiveSheet(final SheetModel sheet) async {
    // TODO: implement setActiveSheet
    throw UnimplementedError();
  }
}
