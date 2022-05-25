part of pack_settings;

class SettingsNotifier extends ChangeNotifier implements ContextfulLoadable {
  SettingsNotifier({
    required final this.settingsService,
  });

  // Make SettingsService a private variable so it is not used directly.
  final PersistentSettingsService settingsService;

  // Make ThemeMode a private variable so it is not updated directly without
  // also persisting the changes with the SettingsService.
  ThemeMode _themeMode = ThemeMode.system;

  // Allow Widgets to read the user's preferred ThemeMode.
  ThemeMode get themeMode => _themeMode;

  /// Update and persist the ThemeMode based on the user's selection.
  Future<void> updateThemeMode(final ThemeMode? newThemeMode) async {
    if (newThemeMode == null) return;

    // Dot not perform any work if new and old ThemeMode are identical
    if (newThemeMode == _themeMode) return;

    // Otherwise, store the new theme mode in memory
    _themeMode = newThemeMode;
    // Important! Inform listeners a change has occurred.
    notify();

    // Persist the changes to a local database or the internet using the
    // SettingService.
    await settingsService.setThemeMode(newThemeMode);
  }

  Locale? _locale;
  Locale? get locale => _locale;

  Future<void> updateLocale(final Locale? locale) async {
    if (locale == null) return;

    if (locale == _locale) return;
    _locale = locale;
    await S.load(locale);
    notify();

    await settingsService.setLocale(locale);
  }

  final excelAvailable = ValueNotifier<bool>(false);
  final devinfo = ValueNotifier<String>('');
  final useMockData = ValueNotifier<bool>(true);

  /// Load the user's settings from the SettingsService. It may load from a
  /// local database or the internet. The controller only knows it can load the
  /// settings from the service.
  @override
  Future<void> onLoad(final BuildContext context) async {
    _themeMode = await settingsService.themeMode();
    excelAvailable.addListener(_onExcelAvailableChanged);
    _locale = await settingsService.locale();
    // Important! Inform listeners a change has occurred.
    notify();
  }

  void _onExcelAvailableChanged() {
    if (excelAvailable.value) {
      useMockData.value = false;
    } else {
      useMockData.value = true;
    }
  }

  @override
  void dispose() {
    excelAvailable
      ..removeListener(_onExcelAvailableChanged)
      ..dispose();
    devinfo.dispose();
    useMockData.dispose();
    super.dispose();
  }

  void notify() => notifyListeners();
}
