import 'package:sheet_manager/pack_core/pack_core.dart';
import 'package:sheet_manager/pack_sheets/pack_sheets.dart';

export 'excel_api_mock.dart' if (dart.library.html) 'excel_api_web.dart';

abstract class ExcelApiI implements ContextlessLoadable {
  Future<List<SheetModel>> getSheets();
  Future<void> renameSheet({
    required final SheetModel sheet,
  });
  Future<void> reorderSheet({
    required final SheetModel sheet,
    required final int position,
  });
  Future<void> setActiveSheet(final SheetModel sheet);
  Future<SheetModel> getActiveSheet();
}
