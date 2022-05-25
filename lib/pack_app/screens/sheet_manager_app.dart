part of pack_app;

class SheetManagerApp extends StatelessWidget {
  const SheetManagerApp({
    required this.settings,
    final Key? key,
  }) : super(key: key);
  final SettingsNotifier settings;
  @override
  Widget build(final BuildContext context) {
    return ChangeNotifierProvider(
      create: (final context) => settings,
      child: AppStateProvider(
        builder: (context) {
          return const AppScaffoldScreen();
        },
      ),
    );

    // return AppStateProvider(
    //   settings: settings,
    //   builder: (final context) =>const AppScaffoldScreen() ,
    // );
  }
}
