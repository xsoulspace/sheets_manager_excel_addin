part of pack_sheets;

class SheetsNotifier extends ChangeNotifier {
  final sheets = ValueNotifier<List<SheetModel>>([]);
  final filteredSheets = ValueNotifier<List<SheetModel>>([]);
}
