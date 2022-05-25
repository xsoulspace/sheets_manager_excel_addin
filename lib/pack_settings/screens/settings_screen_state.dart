part of pack_settings;

SettingsScreenState useSettingsScreenState() => use(
      LifeHook(
        debugLabel: 'SettingsScreenState',
        state: SettingsScreenState(),
      ),
    );

class SettingsScreenState extends LifeState {
  SettingsScreenState();
}
