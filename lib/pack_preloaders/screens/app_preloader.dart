part of pack_preloaders;

class AppStateProvider extends StatelessWidget {
  const AppStateProvider({
    required final this.builder,
    final Key? key,
  }) : super(key: key);
  final WidgetBuilder builder;
  @override
  Widget build(final BuildContext context) {
    final settings = context.read<SettingsNotifier>();
    final analyticsNotifier = context.read<AnalyticsNotifier>();

    return ValueListenableBuilder<bool>(
      valueListenable: settings.useMockData,
      builder: (final context, final useMockData, final child) {
        return MultiProvider(
          providers: [
            if (useMockData)
              Provider<ExcelApiI>(
                key: const ValueKey('ExcelApiMock'),
                create: (final context) => ExcelApiMockImpl(
                  analyticsNotifier: analyticsNotifier,
                ),
              )
            else
              Provider<ExcelApiI>(
                key: const ValueKey('ExcelApi'),
                create: (final context) => ExcelApiImpl(
                  analyticsNotifier: analyticsNotifier,
                ),
              ),
            if (useMockData)
              ChangeNotifierProvider<ExcelSubscriptionsI>(
                key: const ValueKey('ExcelSubscriptionMock'),
                create: (final context) => ExcelSubscriptionMock(),
              )
            else
              ChangeNotifierProvider<ExcelSubscriptionsI>(
                key: const ValueKey('ExcelSubscription'),
                create: (final context) => ExcelSubscriptions(),
              ),
            ChangeNotifierProvider(
              create: (final context) => SheetsNotifier(
                analyticsNotifier: analyticsNotifier,
                settingsNotifier: settings,
                excelApi: context.read(),
              ),
            ),
            Provider(
              create: (final context) => SheetsSubscriber(
                excelSubscriptions: context.read(),
                excelApi: context.read(),
                sheetsNotifier: context.read(),
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
      },
    );
  }
}
