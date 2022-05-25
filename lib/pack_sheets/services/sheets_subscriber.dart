import 'package:officejs/office_typedefs.dart';
import 'package:sheet_manager/pack_analytics/analytics/notifiers/analytics_notifier.dart';
import 'package:sheet_manager/pack_core/pack_core.dart';
import 'package:sheet_manager/pack_sheets/api/excel_api_i.dart';
import 'package:sheet_manager/pack_sheets/pack_sheets.dart';
import 'package:sheet_manager/pack_sheets/services/excel_subscriptions_i.dart';

class SheetsSubscriber implements ContextlessLoadable {
  SheetsSubscriber({
    required this.excelSubscriptions,
    required this.sheetsNotifier,
    required this.excelApi,
    required this.analyticsNotifier,
  });
  final ExcelSubscriptionsI excelSubscriptions;
  final ExcelApiI excelApi;
  final SheetsNotifier sheetsNotifier;
  final AnalyticsNotifier analyticsNotifier;
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
    analyticsNotifier.log('_onCreated $args');
    final id = args.worksheetId;
    final sheet = await excelApi.getSheetById(id);
    sheetsNotifier.addSheetToCache(sheet);
    await sheetsNotifier.selectedSheetController.onSheetSelected(
      sheet,
      syncWithExcel: false,
    );
  }

  Future<void> _onMoved(final WorksheetMovedEventArgs args) async {
    analyticsNotifier.log('_onMoved $args');
    await sheetsNotifier.reloadSheets();
  }

  Future<void> _onRenamed(final WorksheetNameChangedEventArgs args) async {
    analyticsNotifier.log('_onRenamed $args');
    final sheet = await _getSheetById(args.worksheetId);
    sheetsNotifier.sheetNameController.addSheetNameUpdate(
      sheet,
      args.nameAfter,
      syncWithExcel: false,
    );
  }

  Future<void> _onSelected(final WorksheetActivatedEventArgs args) async {
    analyticsNotifier.log('_onSelected $args');
    final sheet = await _getSheetById(args.worksheetId);
    await sheetsNotifier.selectedSheetController.onSheetSelected(
      sheet,
      syncWithExcel: false,
    );
  }

  Future<void> _onDeleted(final WorksheetDeletedEventArgs args) async {
    analyticsNotifier.log('_onDeleted $args');
    sheetsNotifier.deleteCachedSheetById(args.worksheetId);
  }

  Future<SheetModel> _getSheetById(final String id) async {
    SheetModel? sheet = sheetsNotifier.getCachedSheetById(id);
    return sheet ??= await excelApi.getSheetById(id);
  }
}
