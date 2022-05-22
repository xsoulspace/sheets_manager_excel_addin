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
          appBar: NavigationAppBar(
            automaticallyImplyLeading: false,
            actions: Center(
              child: Row(
                children: [
                  const SizedBox(width: 20),
                  ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 200),
                    child: const SheetSearchField(),
                  ),
                ],
              ),
            ),
          ),
          content: NavigationBody(
            index: currentScreen.index,
            children: const [
              SheetsScreen(),
              SettingsScreen(),
              InfoScreen(),
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
          displayMode: PaneDisplayMode.compact,
          items: [
            PaneItem(
              icon: const Icon(FluentIcons.home),
              title: const Text('Home'),
            ),
          ],
          position: PanePosition.right,
          footerItems: [
            PaneItemSeparator(),
            PaneItem(
              icon: const Icon(FluentIcons.settings),
              title: const Text('Settings'),
            ),
            PaneItem(
              icon: const Icon(FluentIcons.info),
              title: const Text('Info'),
            ),
          ],
        );
}
