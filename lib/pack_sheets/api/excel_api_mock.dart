import 'package:sheet_manager/pack_sheets/api/excel_api_i.dart';
import 'package:sheet_manager/pack_sheets/pack_sheets.dart';

class ExcelApiMock extends ExcelApi {}

class ExcelApi implements ExcelApiI {
  final _sheets = <SheetModel>[
    const SheetModel(name: 'Products', id: '1'),
    const SheetModel(name: 'Stock', id: '2'),
    const SheetModel(name: 'Total', id: '3'),
  ];
  @override
  Future<List<SheetModel>> getSheets() async {
    return _sheets;
  }

  @override
  Future<void> renameSheet({
    required final SheetModel sheet,
  }) async {
    final index = _sheets.indexWhere((final el) => el.id == sheet.id);
    if (index < 0) return;
    _sheets
      ..removeAt(index)
      ..insert(index, sheet);
  }

  @override
  Future<void> reorderSheets(final List<SheetModel> sheets) async {
    _sheets
      ..clear()
      ..addAll(sheets);
  }

  @override
  Future<SheetModel> getActiveSheet() async {
    return _sheets.first;
  }

  @override
  Future<void> setActiveSheet(final SheetModel sheet) async {
    return;
  }
}
