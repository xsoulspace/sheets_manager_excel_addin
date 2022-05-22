part of pack_app;

class NavigationScreen extends HookWidget {
  const NavigationScreen({final Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    final state = useNavigationScreenState();

    return ValueListenableBuilder<NavigationScreens>(
      valueListenable: state.currentScreen,
      builder: (final context, final currentScreen, final child) {
        return NavigationView(
          pane: AppNavigationPane(
            state: state,
            selected: currentScreen.index,
          ),
          content: NavigationBody(
            index: currentScreen.index,
            children: const [
              SheetsScreen(),
              InfoScreen(),
              SettingsScreen(),
            ],
          ),
        );
      },
    );
  }
}

class AppNavigationPane extends NavigationPane {
  AppNavigationPane({
    required final super.selected,
    required final NavigationScreenState state,
  }) : super(
          onChanged: (final index) => state.onNavigationChanged(
            NavigationScreens.values
                .firstWhere((final value) => value.index == index),
          ),
          displayMode: PaneDisplayMode.top,
          items: [
            PaneItem(
              icon: const Icon(FluentIcons.info),
              title: const Text('Info'),
            ),
          ],
          footerItems: [
            PaneItemSeparator(),
            PaneItem(
              icon: const Icon(FluentIcons.settings),
              title: const Text('Settings'),
            ),
          ],
        );
}
