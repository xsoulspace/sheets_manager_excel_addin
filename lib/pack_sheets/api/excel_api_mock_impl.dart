import 'package:sheet_manager/pack_sheets/api/excel_api_i.dart';
import 'package:sheet_manager/pack_sheets/pack_sheets.dart';

class ExcelApiMockImpl implements ExcelApiI {
  final _sheets = <SheetModel>[
    const SheetModel(name: 'Products'),
    const SheetModel(name: 'Stock'),
    const SheetModel(name: 'Total'),
  ];
  @override
  Future<List<SheetModel>> getSheets() async {
    return _sheets;
  }

  @override
  Future<void> renameSheet({
    required final SheetModel sheet,
    required final String oldName,
  }) async {
    final index = _sheets.indexWhere((final el) => el.name == oldName);
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
