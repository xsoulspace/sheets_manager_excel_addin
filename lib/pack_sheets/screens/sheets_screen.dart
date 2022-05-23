part of pack_sheets;

class SheetsScreen extends StatelessWidget {
  const SheetsScreen({final Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    final sheetsNotifier = context.watch<SheetsNotifier>();
    final dragEnabled = sheetsNotifier.searchController.text.isEmpty;
    return ScaffoldPage(
      content: ReorderableListView.builder(
        physics: const BouncingScrollPhysics(),
        buildDefaultDragHandles: false,
        shrinkWrap: true,
        onReorder: sheetsNotifier.onReorder,
        itemBuilder: (final context, final index) {
          final sheet = sheetsNotifier.sheets[index];

          return SheetTile(
            key: ValueKey(sheet.name),
            sheet: sheet,
            index: index,
            dragEnabled: dragEnabled,
          );
        },
        itemCount: sheetsNotifier.sheets.length,
      ),
    );
  }
}
