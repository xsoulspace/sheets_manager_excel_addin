part of pack_settings;

class SettingsScreen extends HookWidget {
  const SettingsScreen({final Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    final settingsNotifier = context.watch<SettingsNotifier>();
    final state = useSettingsScreenState();
    final appThemeData = context.read<AppThemeData>();
    return ScaffoldPage.scrollable(
      header: PageHeader(
        title: Text(
          S.of(context).settings,
        ),
      ),
      children: [
        InfoLabel(
          label: S.of(context).language,
          child: Combobox<Locale>(
            isExpanded: true,
            items: namedLocalesMap.values
                .map(
                  (final locale) => ComboboxItem<Locale>(
                    value: locale.locale,
                    child: Text(locale.name),
                  ),
                )
                .toList(),
            value: settingsNotifier.locale,
            onChanged: settingsNotifier.updateLocale,
          ),
        ),
        appThemeData.spacedSizedBox.regular,
        InfoLabel(
          label: S.of(context).appearance,
          child: Combobox<ThemeMode>(
            isExpanded: true,
            items: [
              ComboboxItem(
                key: const ValueKey(ThemeMode.system),
                value: ThemeMode.system,
                child: Text(S.current.appearanceSystem),
              ),
              ComboboxItem(
                key: const ValueKey(ThemeMode.light),
                value: ThemeMode.light,
                child: Text(S.current.appearanceLight),
              ),
              ComboboxItem(
                key: const ValueKey(ThemeMode.dark),
                value: ThemeMode.dark,
                child: Text(S.current.appearanceDark),
              ),
            ],
            value: settingsNotifier.themeMode,
            onChanged: settingsNotifier.updateThemeMode,
          ),
        ),
      ],
    );
  }
}
