part of pack_sheets;

class SheetsScreen extends StatelessWidget {
  const SheetsScreen({final Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    return ScaffoldPage(
      content: ReorderableListView.builder(
        shrinkWrap: true,
        onReorder: (final a, final b) => debugPrint('reorder $a to $b'),
        itemBuilder: (final context, final index) {
          return SheetTile(
            key: ValueKey(index),
          );
        },
        itemCount: 2,
      ),
    );
  }
}
