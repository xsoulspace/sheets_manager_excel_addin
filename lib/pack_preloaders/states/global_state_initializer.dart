part of pack_preloaders;

class GlobalStateInitializer extends StateInitializer {
  @override
  Future<void> onLoad(final BuildContext context) async {
    final SettingsNotifier settings = context.read();
    final SheetsNotifier sheetsNotifier = context.read();
    WidgetsBinding.instance.addPostFrameCallback((final timeStamp) async {
      await Future.delayed(const Duration(milliseconds: 800));
      settings.excelAvailable.value = await ExcelHelper.checkIsExcelAvailable();
      if (!settings.excelAvailable.value) {
        await Future.delayed(const Duration(seconds: 1));
        settings.excelAvailable.value =
            await ExcelHelper.checkIsExcelAvailable();
      }
    });
    await settings.onLoad(context);
    await sheetsNotifier.onLoad(context);
  }
}
