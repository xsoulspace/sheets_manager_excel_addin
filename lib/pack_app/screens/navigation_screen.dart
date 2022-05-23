part of pack_app;

class NavigationScreen extends HookWidget {
  const NavigationScreen({final Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    final state = useNavigationScreenState();
    final appThemeData = context.read<AppThemeData>();
    final themeData = FluentTheme.of(context);
    return ValueListenableBuilder<NavigationScreens>(
      valueListenable: state.currentScreen,
      builder: (final context, final currentScreen, final child) {
        final isSheetsScreen = currentScreen == NavigationScreens.sheets;
        return NavigationView(
          pane: AppNavigationPane(
            state: state,
            panePaddingRequired: !isSheetsScreen,
            themeData: themeData,
            selected: currentScreen.index,
          ),
          appBar: isSheetsScreen
              ? NavigationAppBar(
                  automaticallyImplyLeading: false,
                  actions: Center(
                    child: Row(
                      children: [
                        appThemeData.horizontalySpacedSizedBox.semiSmall,
                        ConstrainedBox(
                          constraints: const BoxConstraints(maxWidth: 200),
                          child: const SheetSearchField(),
                        ),
                      ],
                    ),
                  ),
                )
              : null,
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
    required final bool panePaddingRequired,
    required final ThemeData themeData,
  }) : super(
          onChanged: (final index) => state.onNavigationChanged(
            NavigationScreens.values
                .firstWhere((final value) => value.index == index),
          ),
          menuButton: AnimatedSwitcher(
            duration: themeData.fastAnimationDuration,
            child: panePaddingRequired
                ? const SizedBox(height: 50)
                : const SizedBox(),
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
