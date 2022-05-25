part of pack_sheets;

typedef _SheetNameDiff = Diff<SheetModel, String>;

class SheetNameController implements ContextlessLoadable, Disposable {
  SheetNameController({
    required this.updateSheets,
    required this.getSheets,
    required this.excelApi,
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
    final String newName, {
    final bool syncWithExcel = true,
  }) =>
      updatesController.add(
        Diff(
          original: sheet,
          other: newName,
          syncWithExcel: syncWithExcel,
        ),
      );

  Future<void> _renameSheet(
    final _SheetNameDiff diff,
  ) async {
    final sheet = diff.original;
    final newName = diff.other;
    final newSheet = sheet.copyWith(name: newName);
    final newSheets = getSheets();
    final index = newSheets.indexWhere((final el) => el.id == sheet.id);
    if (index < 0) return;
    newSheets
      ..removeAt(index)
      ..insert(index, newSheet);
    updateSheets(newSheets);
    if (diff.syncWithExcel) unawaited(excelApi.renameSheet(sheet: newSheet));
  }

  @override
  void dispose() {
    updatesController.close();
  }
}
