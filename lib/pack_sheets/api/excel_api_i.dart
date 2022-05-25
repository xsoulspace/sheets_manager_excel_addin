import 'package:sheet_manager/pack_sheets/pack_sheets.dart';

export 'excel_api_mock.dart' if (dart.library.html) 'excel_api_web.dart';

abstract class ExcelApiI {
  Future<List<SheetModel>> getSheets();
  Future<void> renameSheet({
    required final SheetModel sheet,
  });
  Future<void> reorderSheets(final List<SheetModel> sheets);
  Future<void> setActiveSheet(final SheetModel sheet);
  Future<SheetModel> getActiveSheet();
}
