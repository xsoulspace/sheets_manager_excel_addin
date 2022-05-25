part of pack_sheets;

class SheetsScreen extends StatelessWidget {
  const SheetsScreen({final Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    final sheetsNotifier = context.watch<SheetsNotifier>();
    final settings = context.watch<SettingsNotifier>();
    final dragEnabled = sheetsNotifier.filter.searchController.text.isEmpty;

    return ScaffoldPage(
      content: Column(
        children: [
          if (kDebugMode) ...[
            Text(
              'excelAvailable ${settings.excelAvailable.value} '
              '\ndevinfo ${settings.devinfo.value}',
            ),
            material.Switch.adaptive(
              value: settings.useMockData.value,
              onChanged: (final newValue) {
                settings.useMockData.value = newValue;
              },
            ),
          ],
          Expanded(
            child: ReorderableListView.builder(
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
