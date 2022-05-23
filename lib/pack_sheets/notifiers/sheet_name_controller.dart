part of pack_sheets;

typedef _SheetNameDiff = Diff<SheetModel, String>;

class SheetNameController implements ContextlessLoadable, Disposable {
  SheetNameController({
    required this.excelApi,
    required this.updateSheets,
    required this.getSheets,
  });
  final ExcelApiI excelApi;
  final ValueChanged<List<SheetModel>> updateSheets;
  List<SheetModel> Function() getSheets;
  final updatesController = StreamController<_SheetNameDiff>();
  Stream<_SheetNameDiff> get updatesStream => updatesController.stream;

  @override
  Future<void> onLoad() async {
    unawaited(
      updatesStream
          .sampleTime(
            const Duration(milliseconds: 700),
          )
          .forEach(
            _renameSheet,
          ),
    );
  }

  void addSheetNameUpdate(
    final SheetModel sheet,
    final String newName,
  ) =>
      updatesController.add(Diff(original: sheet, other: newName));

  Future<void> _renameSheet(
    final _SheetNameDiff diff,
  ) async {
    final sheet = diff.original;
    final newName = diff.other;
    final newSheet = sheet.copyWith(name: newName);
    final sheets = getSheets();
    final index = sheets.indexWhere((final el) => el.name == sheet.name);
    sheets
      ..removeAt(index)
      ..insert(index, sheet);
    updateSheets(sheets);
    unawaited(excelApi.renameSheet(sheet: newSheet, oldName: sheet.name));
  }

  @override
  void dispose() {
    updatesController.close();
  }
}
