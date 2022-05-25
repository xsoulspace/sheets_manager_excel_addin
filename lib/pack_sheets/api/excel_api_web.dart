import 'package:officejs/officejs.dart';
import 'package:sheet_manager/pack_analytics/analytics/notifiers/analytics_notifier.dart';
import 'package:sheet_manager/pack_sheets/api/excel_api_i.dart';
import 'package:sheet_manager/pack_sheets/api/excel_api_mock.dart'
    as excel_api_mock;
import 'package:sheet_manager/pack_sheets/pack_sheets.dart';

class ExcelApiMock extends excel_api_mock.ExcelApi {
  ExcelApiMock({required final super.analyticsNotifier});
}

class ExcelApi implements ExcelApiI {
  ExcelApi({
    required this.analyticsNotifier,
  });
  final AnalyticsNotifier analyticsNotifier;
  late RequestContext context;
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
    analyticsNotifier
        .log('items length: ${context.workbook.worksheets.items.length}');
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
  Future<SheetModel> getActiveSheet() async {
    final sheetModel = context.workbook.worksheets.getActiveWorksheet();
    await sync();
    return sheetModel.toSheetModel();
  }

  @override
  Future<void> setActiveSheet(final SheetModel sheet) async {
    final excelSheet = checkSheetType(sheet);
    excelSheet.worksheet.activate();
    await sync();
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
  SheetModel toSheetModel() => SheetModel.excelSheetModel(
        name: name,
        id: id,
        worksheet: this,
      );
}
