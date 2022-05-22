part of pack_app;

class AppScaffold extends StatelessWidget {
  const AppScaffold({final Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    return FluentApp(
      debugShowCheckedModeBanner: false,
      darkTheme: ThemeData(
        // accentColor: appTheme.color,
        brightness: Brightness.dark,
        visualDensity: VisualDensity.standard,
        focusTheme: FocusThemeData(
          glowFactor: is10footScreen() ? 2.0 : 0.0,
        ),
      ),
      theme: ThemeData(
        // accentColor: appTheme.color,
        visualDensity: VisualDensity.standard,
        focusTheme: FocusThemeData(
          glowFactor: is10footScreen() ? 2.0 : 0.0,
        ),
      ),
      home: const NavigationScreen(),
      builder: (final context, final child) => NavigationPaneTheme(
        data: const NavigationPaneThemeData(),
        child: child!,
      ),
    );
  }
}
