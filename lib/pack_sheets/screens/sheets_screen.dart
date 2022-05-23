part of pack_sheets;

class SheetsScreen extends StatelessWidget {
  const SheetsScreen({final Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    final sheetsNotifier = context.watch<SheetsNotifier>();

    return ScaffoldPage(
      content: ReorderableListView.builder(
        shrinkWrap: true,
        onReorder: sheetsNotifier.onReorder,
        itemBuilder: (final context, final index) {
          final sheet = sheetsNotifier.sheets[index];

          return SheetTile(
            key: ValueKey(sheet),
            sheet: sheet,
          );
        },
        itemCount: sheetsNotifier.sheets.length,
      ),
    );
  }
}
