part of pack_app;

class AppScaffold extends StatelessWidget {
  const AppScaffold({final Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    return FluentApp(
      home: const NavigationScreen(),
      builder: (final context, final child) => NavigationPaneTheme(
        data: const NavigationPaneThemeData(),
        child: child!,
      ),
    );
  }
}
