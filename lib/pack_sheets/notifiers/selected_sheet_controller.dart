part of pack_sheets;

class SelectedSheetController implements ContextlessLoadable, Disposable {
  SelectedSheetController({
    required this.excelApi,
    required this.notifyListeners,
  });
  final ExcelApiI excelApi;
  final VoidCallback notifyListeners;
  SheetModel selectedSheetModel = const SheetModel(name: '', id: '');

  bool checkIsSheetActive(final SheetModel sheet) {
    return selectedSheetModel.name == sheet.name;
  }

  Future<void> onSheetSelected(final SheetModel sheet) async {
    selectedSheetModel = sheet;
    notifyListeners();
    unawaited(excelApi.setActiveSheet(sheet));
  }

  Future<void> getActiveSheet() async {
    final sheet = await excelApi.getActiveSheet();
    selectedSheetModel = sheet;
    notifyListeners();
  }

  @override
  void dispose() {
    // TODO: implement dispose
  }

  @override
  Future<void> onLoad() async {}
}
