part of pack_app;

class NavigationScreen extends HookWidget {
  const NavigationScreen({final Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    final state = useNavigationScreenState();
    final appThemeData = AppTheme.of(context);
    final themeData = FluentTheme.of(context);
    final screenSize = MediaQuery.of(context).size;

    return ValueListenableBuilder<NavigationScreens>(
      valueListenable: state.currentScreen,
      builder: (final context, final currentScreen, final child) {
        final isSheetsScreen = currentScreen == NavigationScreens.sheets;
        return Stack(
          children: [
            NavigationView(
              pane: AppNavigationPane(
                state: state,
                panePaddingRequired: !isSheetsScreen,
                themeData: themeData,
                selected: currentScreen.index,
              ),
              appBar: isSheetsScreen
                  ? const NavigationAppBar(
                      automaticallyImplyLeading: false,
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
            ),
            if (isSheetsScreen)
              Positioned(
                top: 10,
                left: 0,
                child: Row(
                  children: [
                    appThemeData.horizontalySpacedSizedBox.semiSmall,
                    Builder(
                      builder: (final context) {
                        final screenWidth = screenSize.width;

                        final width = math.min(screenWidth - 58, 328 + 58.0);
                        return ConstrainedBox(
                          constraints: BoxConstraints(maxWidth: width),
                          child: const SheetSearchField(),
                        );
                      },
                    ),
                    const SizedBox(width: 58),
                  ],
                ),
              ),
          ],
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
