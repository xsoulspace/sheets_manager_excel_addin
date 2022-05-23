import 'package:sheet_manager/pack_sheets/pack_sheets.dart';

abstract class ExcelApiI {
  Future<List<SheetModel>> getSheets();
  Future<void> renameSheet({
    required final SheetModel sheet,
    required final String oldName,
  });
  Future<void> reorderSheets(final List<SheetModel> sheets);
}
