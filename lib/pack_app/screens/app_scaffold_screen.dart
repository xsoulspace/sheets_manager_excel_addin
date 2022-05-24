part of pack_app;

class AppScaffoldScreen extends StatelessWidget {
  const AppScaffoldScreen({final Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    final settings = context.read<SettingsNotifier>();

    return AnimatedBuilder(
      animation: settings,
      builder: (final context, final child) {
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
          localizationsDelegates: const [
            S.delegate,
            DefaultFluentLocalizations.delegate,
            GlobalMaterialLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
            GlobalCupertinoLocalizations.delegate,
          ],
          // localeListResolutionCallback:
          //     (final locales, final supportedLocales) {
          //   final locale = settings.locale;
          //   if (locale == null) return null;
          //   if (S.delegate.isSupported(locale)) return locale;

          //   return null;
          // },
          supportedLocales: Locales.values,
          locale: settings.locale,
          theme: ThemeData(
            // accentColor: appTheme.color,
            visualDensity: VisualDensity.standard,
            focusTheme: FocusThemeData(
              glowFactor: is10footScreen() ? 2.0 : 0.0,
            ),
          ),
          themeMode: settings.themeMode,
          home: const NavigationScreen(),
          builder: (final context, final child) {
            return AppThemeBuilder(
              child: Directionality(
                textDirection: TextDirection.ltr,
                child: NavigationPaneTheme(
                  data: const NavigationPaneThemeData(),
                  child: child!,
                ),
              ),
            );
          },
        );
      },
    );
  }
}
