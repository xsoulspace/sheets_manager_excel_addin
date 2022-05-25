part of pack_preloaders;

class GlobalStateNotifiers {
  GlobalStateNotifiers._();
  static SettingsNotifier? _settingsNotifierInstance;
  // Set up the SettingsController, which will glue user settings to multiple
  // Flutter Widgets.
  static SettingsNotifier getSettings({
    required final bool excelAvailable,
  }) =>
      _settingsNotifierInstance ??= SettingsNotifier(
        settingsService: PersistentSettingsService(),
      );
}
