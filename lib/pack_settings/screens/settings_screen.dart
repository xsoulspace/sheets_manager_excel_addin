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
        SettingsTile(
          icon: FluentIcons.locale_language,
          title: S.of(context).language,
          trailing: Combobox<Locale>(
            items: namedLocalesMap.values
                .map(
                  (final locale) => ComboboxItem<Locale>(
                    value: locale.locale,
                    child: SizedBox(
                      width: 100,
                      child: Text(locale.name),
                    ),
                  ),
                )
                .toList(),
            value: settingsNotifier.locale,
            onChanged: settingsNotifier.updateLocale,
          ),
        ),
        appThemeData.spacedSizedBox.regular,
        SettingsTile(
          title: S.of(context).appearance,
          icon: FluentIcons.brightness,
          trailing: Combobox<ThemeMode>(
            items: [
              ComboboxItem(
                key: const ValueKey(ThemeMode.system),
                value: ThemeMode.system,
                child: SizedBox(
                  width: 100,
                  child: Text(S.current.appearanceSystem),
                ),
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

class SettingsTile extends StatelessWidget {
  const SettingsTile({
    required this.icon,
    required this.title,
    required this.trailing,
    this.subtitle,
    final Key? key,
  }) : super(key: key);
  final IconData icon;
  final String title;
  final String? subtitle;
  final Widget trailing;
  @override
  Widget build(final BuildContext context) {
    return Card(
      padding: EdgeInsets.zero,
      child: ListTile(
        leading: Icon(icon),
        title: Text(title),
        subtitle: subtitle != null ? Text(subtitle!) : null,
        trailing: trailing,
      ),
    );
  }
}
