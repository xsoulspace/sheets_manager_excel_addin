part of pack_sheets;

class SheetsNotifier extends ChangeNotifier implements ContextlessLoadable {
  SheetsNotifier({
    required this.excelApi,
    required this.settingsNotifier,
    required this.analyticsNotifier,
  });
  final SettingsNotifier settingsNotifier;
  final ExcelApiI excelApi;
  final AnalyticsNotifier analyticsNotifier;

  final _sheets = <SheetModel>[];
  List<SheetModel> get sheets =>
      filter.filteredSheets.isEmpty ? _sheets : filter.filteredSheets;
  List<SheetModel> getSheets() => [...sheets];
  void updateSheets(final List<SheetModel> newSheets) {
    _sheets
      ..clear()
      ..addAll(newSheets);
    notifyListeners();
  }

  void addSheet(final SheetModel sheet) {
    _sheets.insert(sheet.position, sheet);
    notifyListeners();
  }

  SheetModel? getSheetById(final String id) {
    return _sheets.firstWhereOrNull((final sheet) => sheet.id == id);
  }

  void deleteSheetById(final String id) {
    final index = _sheets.indexWhere((final sheet) => sheet.id == id);
    _sheets.removeAt(index);
  }

  late final filter = SheetsFilter(
    notifyListeners: notifyListeners,
    sheets: _sheets,
  );
  late final sheetNameController = SheetNameController(
    updateSheets: updateSheets,
    getSheets: getSheets,
    excelApi: excelApi,
  );
  late final selectedSheetController = SelectedSheetController(
    notifyListeners: notifyListeners,
    excelApi: excelApi,
  );
  @override
  Future<void> onLoad() async {
    await sheetNameController.onLoad();
    await selectedSheetController.onLoad();
    await filter.onLoad();
    await reloadSheets();
  }

  @override
  void dispose() {
    sheetNameController.dispose();
    selectedSheetController.dispose();
    filter.dispose();
    super.dispose();
  }

  Future<void> reloadSheets() async {
    final newSheets = await excelApi.getSheets();
    updateSheets(newSheets);
  }

  void onReorder(final int oldIndex, final int newIndex) {
    int effectiveNewIndex = newIndex;
    if (oldIndex < effectiveNewIndex) {
      effectiveNewIndex -= 1;
    }
    final item = _sheets.removeAt(oldIndex);
    _sheets.insert(effectiveNewIndex, item);
    excelApi.reorderSheet(
      position: effectiveNewIndex,
      sheet: item,
    );
    notifyListeners();
  }
}
