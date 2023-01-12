import 'package:officejs/officejs.dart';
import 'package:sheet_manager/pack_analytics/analytics/notifiers/analytics_notifier.dart';
import 'package:sheet_manager/pack_sheets/api/excel_api_i.dart';
import 'package:sheet_manager/pack_sheets/api/excel_api_mock.dart'
    as excel_api_mock;
import 'package:sheet_manager/pack_sheets/pack_sheets.dart';

class ExcelApiMockImpl extends excel_api_mock.ExcelApiImpl {
  ExcelApiMockImpl({required super.analyticsNotifier});
}

class ExcelApiImpl implements ExcelApiI {
  ExcelApiImpl({
    required this.analyticsNotifier,
  });
  final AnalyticsNotifier analyticsNotifier;
  late RequestContext context;
  @override
  Future<void> sync() async => context.sync();

  @override
  Future<void> onLoad() async {
    context = await Excel.run();

    analyticsNotifier.log('ExcelApi onLoaded');
  }

  @override
  Future<List<SheetModel>> getSheets() async {
    context.workbook.worksheets.load(['items']);
    await sync();
    final sheets = context.workbook.worksheets.items;
    for (final sheet in sheets) {
      sheet.loadProperties();
    }
    await sync();
    analyticsNotifier
        .log('getSheets - length: ${context.workbook.worksheets.items.length}');
    return context.workbook.worksheets.items
        .map(
          (final sheet) => sheet.toSheetModel(),
        )
        .toList();
  }

  @override
  Future<void> renameSheet({
    required final SheetModel sheet,
  }) async {
    final excelSheet = checkSheetType(sheet);
    excelSheet.worksheet.name = sheet.name;
    await sync();
  }

  @override
  Future<void> reorderSheet({
    required final SheetModel sheet,
    required final int position,
  }) async {
    final excelSheet = checkSheetType(sheet);
    excelSheet.worksheet.position = position;
    await sync();
  }

  @override
  Future<void> reorderSheets({required final List<SheetModel> sheets}) async {
    for (int i = 0; i < sheets.length; i++) {
      final sheet = sheets[i];
      final excelSheet = checkSheetType(sheet);
      excelSheet.worksheet.position = i;
    }
    await sync();
  }

  @override
  Future<SheetModel> getActiveSheet() async {
    final sheetModel = context.workbook.worksheets.getActiveWorksheet()
      ..loadProperties();
    await sync();
    return sheetModel.toSheetModel();
  }

  @override
  Future<void> setActiveSheet(final SheetModel sheet) async {
    final excelSheet = checkSheetType(sheet);
    excelSheet.worksheet.activate();
    await sync();
  }

  @override
  Future<SheetModel> getSheetById(final String id) async {
    final sheet = context.workbook.worksheets.getItem(id)..loadProperties();
    await sync();
    return sheet.toSheetModel();
  }
}

ExcelSheetModel<Worksheet> checkSheetType(
  final SheetModel sheet,
) {
  if (sheet is ExcelSheetModel<Worksheet>) {
    return sheet;
  } else if (sheet is MockSheetModel) {
    throw ArgumentError.value(
      'Workheet must be provided for web implementation',
    );
  } else {
    throw ArgumentError('unknown sheet type $sheet');
  }
}

extension WorksheetExt on Worksheet {
  void loadProperties() {
    load(SheetModel.excelProps);
  }

  SheetModel<Worksheet> toSheetModel() => SheetModel<Worksheet>.excelSheetModel(
        name: name,
        id: id,
        worksheet: this,
        position: position,
      );
}
