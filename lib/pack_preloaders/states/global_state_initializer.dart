part of pack_preloaders;

class GlobalStateInitializer extends StateInitializer {
  @override
  Future<void> onPostBindingLoad(final BuildContext context) {
    final completer = Completer();
    final SheetsNotifier sheetsNotifier = context.read();
    final SettingsNotifier settings = context.read();
    final ExcelApiI excelApi = context.read();
    final SheetsSubscriber sheetsSubscriber = context.read();
    final ExcelSubscriptionsI excelSubscriptions = context.read();
    WidgetsBinding.instance.addPostFrameCallback((final timeStamp) async {
      try {
        Future<void> check() async {
          settings.excelAvailable.value =
              await ExcelHelper.checkIsExcelAvailable();
        }

        for (var i = 0; i < 4; i++) {
          await Future.delayed(const Duration(milliseconds: 300));
          await check();
          if (settings.excelAvailable.value) break;
        }
        await excelApi.onLoad();
        await sheetsNotifier.onLoad();
        await excelSubscriptions.onLoad();
        await sheetsSubscriber.onLoad();
      } finally {
        completer.complete();
      }
    });

    return completer.future;
  }
}
