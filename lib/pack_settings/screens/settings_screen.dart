part of pack_settings;

class SettingsScreen extends HookWidget {
  const SettingsScreen({final Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    final state = useSettingsScreenState();

    return ScaffoldPage.scrollable(
      header: const PageHeader(title: Text('Settings')),
      children: [],
    );
  }
}
