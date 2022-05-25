part of pack_sheets;

class SelectedSheetController implements ContextlessLoadable, Disposable {
  SelectedSheetController({
    required this.notifyListeners,
    required this.excelApi,
  });
  final ExcelApiI excelApi;

  final VoidCallback notifyListeners;
  SheetModel selectedSheetModel = const SheetModel.mockSheetModel(
    name: '',
    id: '',
    position: 0,
  );

  bool checkIsSheetActive(final SheetModel sheet) {
    return selectedSheetModel.name == sheet.name;
  }

  Future<void> onSheetSelected(
    final SheetModel sheet, {
    final bool syncWithExcel = true,
  }) async {
    selectedSheetModel = sheet;
    notifyListeners();
    if (syncWithExcel) unawaited(excelApi.setActiveSheet(sheet));
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
  Future<void> onLoad() async {
    await getActiveSheet();
  }
}
