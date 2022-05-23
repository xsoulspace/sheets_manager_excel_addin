part of pack_sheets;

class SheetsFilter implements ContextlessLoadable, Disposable {
  SheetsFilter({
    required this.notifyListeners,
    required this.sheets,
  });
  final VoidCallback notifyListeners;
  final List<SheetModel> sheets;
  final filteredSheets = <SheetModel>[];
  final searchController = TextEditingController();

  @override
  void dispose() {
    searchController
      ..removeListener(onSearchChanged)
      ..dispose();
  }

  @override
  Future<void> onLoad() async {
    searchController.addListener(onSearchChanged);
  }

  void onSearchChanged() {
    // TODO(arenukvern): add bouncer and improve search method
    if (searchController.text.isEmpty) {
      filteredSheets.clear();
    } else {
      final newFilteredSheets = sheets.where(
        (final sheet) => sheet.name.contains(searchController.text),
      );

      filteredSheets
        ..clear()
        ..addAll(newFilteredSheets);
    }
    notifyListeners();
  }

  void onClear() {
    searchController.clear();
    filteredSheets.clear();
    notifyListeners();
  }
}
