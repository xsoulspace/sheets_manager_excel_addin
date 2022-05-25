part of pack_preloaders;

class GlobalStateInitializer extends StateInitializer {
  @override
  Future<void> onPostBindingLoad(final BuildContext context) {
    final completer = Completer();
    final SheetsNotifier sheetsNotifier = context.read();
    final SettingsNotifier settings = context.read();
    final ExcelApiI excelApiI = context.read();
    WidgetsBinding.instance.addPostFrameCallback((final timeStamp) async {
      try {
        await Future.delayed(const Duration(milliseconds: 800));
        settings.excelAvailable.value =
            await ExcelHelper.checkIsExcelAvailable();
        if (!settings.excelAvailable.value) {
          await Future.delayed(const Duration(seconds: 1));
          settings.excelAvailable.value =
              await ExcelHelper.checkIsExcelAvailable();
        }
        await excelApiI.onLoad();
        await sheetsNotifier.onLoad(context);
      } finally {
        completer.complete();
      }
    });

    return completer.future;
  }
}
