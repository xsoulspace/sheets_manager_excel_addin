part of pack_preloaders;

class GlobalStateInitializer implements StateInitializer {
  GlobalStateInitializer({
    required this.settings,
  });
  final SettingsNotifier settings;

  @override
  Future<void> onLoad({required final BuildContext context}) async {
    await settings.onLoad(context: context);
  }
}
