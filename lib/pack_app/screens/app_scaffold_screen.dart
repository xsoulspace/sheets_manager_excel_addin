part of pack_app;

class AppScaffoldScreen extends StatelessWidget {
  const AppScaffoldScreen({final Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    final settings = context.watch<SettingsNotifier>();
    return AnimatedBuilder(
      animation: settings,
      builder: (final context, final child) {
        return FluentApp(
          debugShowCheckedModeBanner: false,
          localizationsDelegates: const [
            S.delegate,
            FluentLocalizations.delegate,
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
          theme: ThemeData.light().copyWith(
            visualDensity: VisualDensity.standard,
            focusTheme: FocusThemeData(
              glowFactor: is10footScreen() ? 2.0 : 0.0,
            ),
          ),
          darkTheme: ThemeData.dark().copyWith(
            resources: const ResourceDictionary.dark(
              cardStrokeColorDefault: Color(0x15ffffff),
            ),
            visualDensity: VisualDensity.standard,
            focusTheme: FocusThemeData(
              glowFactor: is10footScreen() ? 2.0 : 0.0,
            ),
          ),
          themeMode: settings.themeMode,
          home: const NavigationScreen(),
          initialRoute: '/',
          builder: (final context, final child) {
            return AppThemeBuilder(
              child: Directionality(
                textDirection: TextDirection.ltr,
                child: AppStateProvider(
                  builder: (final context) {
                    return NavigationPaneTheme(
                      data: const NavigationPaneThemeData(),
                      child: child!,
                    );
                  },
                ),
              ),
            );
          },
        );
      },
    );
  }
}
