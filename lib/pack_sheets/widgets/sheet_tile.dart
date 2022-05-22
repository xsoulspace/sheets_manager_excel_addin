part of pack_sheets;

class SheetTile extends StatelessWidget {
  const SheetTile({super.key});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text('This is an list tile'),
    );
  }
}
