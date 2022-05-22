part of pack_app;

class SheetManagerApp extends StatelessWidget {
  const SheetManagerApp({
    final Key? key,
  }) : super(key: key);
  @override
  Widget build(final BuildContext context) {
    return AppStateProvider(
      builder: (final context) => const AppScaffoldScreen(),
    );
  }
}
