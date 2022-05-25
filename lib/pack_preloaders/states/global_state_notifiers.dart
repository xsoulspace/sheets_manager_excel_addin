part of pack_preloaders;

class GlobalStateNotifiers {
  GlobalStateNotifiers._();
  static SettingsNotifier? _settingsNotifierInstance;
  // Set up the SettingsController, which will glue user settings to multiple
  // Flutter Widgets.
  static SettingsNotifier getSettings() =>
      _settingsNotifierInstance ??= SettingsNotifier(
        settingsService: PersistentSettingsService(),
      );
  static AnalyticsNotifier getAnalytics() => AnalyticsNotifier();
}
