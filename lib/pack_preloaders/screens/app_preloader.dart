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
                create: (final context) => ExcelApiMock(
                  analyticsNotifier: analyticsNotifier,
                ),
              )
            else
              Provider<ExcelApiI>(
                key: const ValueKey('ExcelApi'),
                create: (final context) => ExcelApi(
                  analyticsNotifier: analyticsNotifier,
                ),
              ),
            if (useMockData)
              Provider<ExcelSubscriptionsI>(
                key: const ValueKey('ExcelSubscriptionMock'),
                create: (final context) => ExcelSubscriptionMock(),
              )
            else
              Provider<ExcelSubscriptionsI>(
                key: const ValueKey('ExcelSubscription'),
                create: (final context) => ExcelSubscriptions(),
              ),
            ChangeNotifierProvider(
              create: (final context) => SheetsNotifier(
                analyticsNotifier: analyticsNotifier,
                settingsNotifier: settings,
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
      },
    );
  }
}
