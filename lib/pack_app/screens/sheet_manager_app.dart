part of pack_app;

class SheetManagerApp extends StatelessWidget {
  const SheetManagerApp({
    required this.settings,
    required this.analytics,
    final Key? key,
  }) : super(key: key);
  final SettingsNotifier settings;
  final AnalyticsNotifier analytics;
  @override
  Widget build(final BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (final context) => settings,
        ),
        ChangeNotifierProvider(
          create: (final context) => analytics,
        ),
      ],
      builder: (final context, final child) {
        return AppStateProvider(
          builder: (final context) {
            return const AppScaffoldScreen();
          },
        );
      },
    );
  }
}
