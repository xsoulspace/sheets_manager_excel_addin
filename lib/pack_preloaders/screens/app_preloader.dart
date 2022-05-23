part of pack_preloaders;

class AppStateProvider extends StatelessWidget {
  const AppStateProvider({
    required final this.builder,
    final Key? key,
  }) : super(key: key);
  final WidgetBuilder builder;
  SettingsNotifier get _settings => GlobalStateNotifiers.settings;
  @override
  Widget build(final BuildContext context) {
    final child = MultiProvider(
      providers: [
        /// Keep _settings is global is important as it will not lose all
        /// changes during global rebuild
        ChangeNotifierProvider(create: (final context) => _settings),
        Provider(
          create: (final context) => AppThemeData.regular(
            excelAvailable: false,
          ),
        ),
        Provider<ExcelApiI>(
          create: (final context) {
            final appDataTheme = context.read<AppThemeData>();
            if (appDataTheme.useMockData) return ExcelApiMockImpl();

            return ExcelApiWebImpl();
          },
        ),
        Provider<ExcelSubscriptionsI>(
          create: (final context) {
            final appDataTheme = context.read<AppThemeData>();
            if (appDataTheme.useMockData) return ExcelSubscriptionMockImpl();

            return ExcelSubscriptionWebImpl();
          },
        ),
        ChangeNotifierProvider(
          create: (final context) => SheetsNotifier(
            excelApi: context.read(),
            excelSubscritions: context.read(),
          ),
        )
      ],
      child: Builder(
        builder: (final context) {
          return StateLoader(
            initializer: GlobalStateInitializer(),
            loader: const AppLoadingScreen(),
            child: builder(context),
          );
        },
      ),
    );

    return child;
  }
}
