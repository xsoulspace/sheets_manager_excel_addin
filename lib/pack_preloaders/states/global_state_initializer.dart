part of pack_preloaders;

class GlobalStateInitializer implements StateInitializer {
  @override
  Future<void> onLoad(final BuildContext context) async {
    final SettingsNotifier settings = context.read();
    final SheetsNotifier sheetsNotifier = context.read();

    await settings.onLoad(context);
    await sheetsNotifier.onLoad(context);
  }
}
