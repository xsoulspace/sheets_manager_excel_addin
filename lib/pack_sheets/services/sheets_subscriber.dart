import 'package:officejs/office_typedefs.dart';
import 'package:sheet_manager/pack_core/pack_core.dart';
import 'package:sheet_manager/pack_sheets/api/excel_api_i.dart';
import 'package:sheet_manager/pack_sheets/pack_sheets.dart';
import 'package:sheet_manager/pack_sheets/services/excel_subscriptions_i.dart';

class SheetsSubscriber implements ContextlessLoadable {
  SheetsSubscriber({
    required this.excelSubscriptions,
    required this.sheetsNotifier,
    required this.excelApi,
  });
  final ExcelSubscriptions excelSubscriptions;
  final ExcelApiImpl excelApi;
  final SheetsNotifier sheetsNotifier;
  @override
  Future<void> onLoad() async {
    excelSubscriptions
      ..subscribeToSheetCreated(_onCreated)
      ..subscribeToSheetDeleted(_onDeleted)
      ..subscribeToSheetMoved(_onMoved)
      ..subscribeToSheetRenamed(_onRenamed)
      ..subscribeToSheetSelected(_onSelected);
    await excelSubscriptions.sync();
  }

  Future<void> sync() async => excelApi.sync();

  Future<void> _onCreated(final WorksheetAddedEventArgs args) async {
    final id = args.worksheetId;
    final sheet = await excelApi.getSheetById(id);
    sheetsNotifier.addSheet(sheet);
  }

  Future<void> _onMoved(final WorksheetMovedEventArgs args) async {
    sheetsNotifier.onReorder(args.positionBefore, args.positionAfter);
  }

  Future<void> _onRenamed(final WorksheetNameChangedEventArgs args) async {
    final sheet = await _getSheetById(args.worksheetId);
    sheetsNotifier.sheetNameController
        .addSheetNameUpdate(sheet, args.nameAfter);
  }

  Future<void> _onSelected(final WorksheetActivatedEventArgs args) async {
    final sheet = await _getSheetById(args.worksheetId);
    await sheetsNotifier.selectedSheetController.onSheetSelected(sheet);
  }

  Future<void> _onDeleted(final WorksheetDeletedEventArgs args) async {
    sheetsNotifier.deleteSheetById(args.worksheetId);
  }

  Future<SheetModel> _getSheetById(final String id) async {
    SheetModel? sheet = sheetsNotifier.getSheetById(id);
    return sheet ??= await excelApi.getSheetById(id);
  }
}
