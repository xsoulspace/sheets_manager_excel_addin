part of pack_sheets;

class SheetTile extends StatelessWidget {
  const SheetTile({
    required this.sheet,
    final super.key,
  });
  final SheetModel sheet;
  @override
  Widget build(final BuildContext context) {
    return ListTile(
      title: Text(sheet.name),
    );
  }
}
