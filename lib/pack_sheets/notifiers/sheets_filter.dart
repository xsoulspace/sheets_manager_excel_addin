part of '../pack_sheets.dart';

class SheetsFilter implements ContextlessLoadable, Disposable {
  SheetsFilter({
    required this.notifyListeners,
    required this.settingsNotifier,
    required this.sheets,
  });
  final VoidCallback notifyListeners;
  final SettingsNotifier settingsNotifier;
  final List<SheetModel> sheets;
  final filteredSheets = <SheetModel>[];
  String searchText = '';
  @override
  void dispose() {
    // TODO: implement dispose
  }
  @override
  Future<void> onLoad() async {}

  void onSearchChanged(final String value) {
    if (value == 'show debug') {
      settingsNotifier.debugPaneEnabled.value = true;
    } else if (value == 'hide debug') {
      settingsNotifier.debugPaneEnabled.value = false;
    }
    searchText = value;
    if (value.isEmpty) {
      filteredSheets.clear();
    } else {
      final newFilteredSheets = sheets.where(
        (final sheet) => sheet.name.clear().contains(value.clear()),
      );

      filteredSheets
        ..clear()
        ..addAll(newFilteredSheets);
    }
    notifyListeners();
  }

  void onClear() {
    searchText = '';
    filteredSheets.clear();
    notifyListeners();
  }
}

extension StringExt on String {
  String clear() => toLowerCase();
}
