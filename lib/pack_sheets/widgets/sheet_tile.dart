part of pack_sheets;

class SheetTile extends StatelessWidget {
  const SheetTile({super.key});

  @override
  Widget build(final BuildContext context) {
    return const ListTile(
      title: Text('This is an list tile'),
    );
  }
}
