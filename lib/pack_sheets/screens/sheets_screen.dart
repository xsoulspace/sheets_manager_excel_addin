part of pack_sheets;

class SheetsScreen extends HookWidget {
  const SheetsScreen({final Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    final sheetsNotifier = context.watch<SheetsNotifier>();
    final dragEnabled = sheetsNotifier.filter.searchController.text.isEmpty;
    final scrollController = useScrollController();

    return ScaffoldPage(
      content: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (kDebugMode) const Expanded(child: DebugPane()),
          Expanded(
            child: ReorderableListView.builder(
              scrollController: scrollController,
              physics: const BouncingScrollPhysics(),
              buildDefaultDragHandles: false,
              shrinkWrap: true,
              onReorder: sheetsNotifier.onReorder,
              itemBuilder: (final context, final index) {
                final sheet = sheetsNotifier.sheets[index];

                return SheetTile(
                  key: ValueKey(sheet.id),
                  onSelected:
                      sheetsNotifier.selectedSheetController.onSheetSelected,
                  selected: sheetsNotifier.selectedSheetController
                      .checkIsSheetActive(sheet),
                  onNameChanged:
                      sheetsNotifier.sheetNameController.addSheetNameUpdate,
                  sheet: sheet,
                  index: index,
                  dragEnabled: dragEnabled,
                );
              },
              itemCount: sheetsNotifier.sheets.length,
            ),
          ),
        ],
      ),
    );
  }
}
