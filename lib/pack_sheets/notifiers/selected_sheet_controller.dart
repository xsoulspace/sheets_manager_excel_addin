part of pack_sheets;

class SelectedSheetController implements ContextlessLoadable, Disposable {
  SelectedSheetController({
    required this.excelApi,
  });
  final ExcelApiI excelApi;
  final selectedSheetModel = ValueNotifier(const SheetModel(name: ''));

  bool checkIsSheetActive(final SheetModel sheet) {
    return selectedSheetModel.value.name == sheet.name;
  }

  Future<void> onSheetSelected(final SheetModel sheet) async {
    selectedSheetModel.value = sheet;
    unawaited(excelApi.setActiveSheet(sheet));
  }

  Future<void> getActiveSheet() async {
    final sheet = await excelApi.getActiveSheet();
    selectedSheetModel.value = sheet;
  }

  @override
  void dispose() {
    // TODO: implement dispose
  }

  @override
  Future<void> onLoad() {
    // TODO: implement onLoad
    throw UnimplementedError();
  }
}
