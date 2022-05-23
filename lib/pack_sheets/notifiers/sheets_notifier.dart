part of pack_sheets;

class SheetsNotifier extends ChangeNotifier implements ContextfulLoadable {
  SheetsNotifier({
    required this.excelApi,
    required this.excelSubscritions,
  });
  final ExcelApiI excelApi;
  final ExcelSubscriptionsI excelSubscritions;

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

  late final filter = SheetsFilter(
    notifyListeners: notifyListeners,
    sheets: _sheets,
  );
  late final sheetNameController = SheetNameController(
    excelApi: excelApi,
    updateSheets: updateSheets,
    getSheets: getSheets,
  );
  late final selectedSheetController = SelectedSheetController(
    excelApi: excelApi,
    notifyListeners: notifyListeners,
  );
  @override
  Future<void> onLoad(final BuildContext context) async {
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
    excelApi.reorderSheets(_sheets);
    notifyListeners();
  }
}
