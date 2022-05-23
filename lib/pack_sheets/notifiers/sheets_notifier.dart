part of pack_sheets;

class SheetsNotifier extends ChangeNotifier implements ContextfulLoadable {
  SheetsNotifier({
    required this.excelApi,
    required this.excelSubscritions,
  });
  final ExcelApiI excelApi;
  final ExcelSubscriptionsI excelSubscritions;
  final searchController = TextEditingController();

  final _sheets = <SheetModel>[];
  final _filteredSheets = <SheetModel>[];

  List<SheetModel> get sheets =>
      _filteredSheets.isEmpty ? _sheets : _filteredSheets;

  @override
  Future<void> onLoad(final BuildContext context) async {
    await reloadSheets();
    searchController.addListener(onSearchChanged);
  }

  @override
  void dispose() {
    searchController
      ..removeListener(onSearchChanged)
      ..dispose();
    super.dispose();
  }

  Future<void> reloadSheets() async {
    final sheets = await excelApi.getSheets();
    _sheets
      ..clear()
      ..addAll(sheets);
  }

  void onReorder(final int oldIndex, final int newIndex) {
    int effectiveNewIndex = newIndex;
    if (oldIndex < effectiveNewIndex) {
      effectiveNewIndex -= 1;
    }
    final item = _sheets.removeAt(oldIndex);
    _sheets.insert(effectiveNewIndex, item);
  }

  void onSearchChanged() {
    // TODO(arenukvern): add bouncer and improve search method
    if (searchController.text.isEmpty) {
      _filteredSheets.clear();
    } else {
      final filteredSheets = _sheets
          .where((final sheet) => sheet.name.contains(searchController.text));

      _filteredSheets
        ..clear()
        ..addAll(filteredSheets);
    }
    notifyListeners();
  }

  void onClearFiltered() {
    searchController.clear();
    _filteredSheets.clear();
    notifyListeners();
  }
}
