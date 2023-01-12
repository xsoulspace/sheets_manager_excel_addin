part of '../pack_sheets.dart';

class SheetsTopBar extends StatelessWidget {
  const SheetsTopBar({super.key});

  @override
  Widget build(final BuildContext context) {
    return Row(
      children: const [
        Expanded(child: SheetSearchField()),
        SizedBox(width: 14),
        SheetsSorterButton(),
      ],
    );
  }
}

class SheetSearchField extends HookWidget {
  const SheetSearchField({final Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    final sheetsNotifier = context.watch<SheetsNotifier>();
    final clearKey = useState(DateTime.now());
    final theme = FluentTheme.of(context);

    return TextBox(
      key: ValueKey(clearKey.value),
      placeholder: 'Search',
      onChanged: sheetsNotifier.filter.onSearchChanged,
      prefix: const Padding(
        padding: EdgeInsetsDirectional.only(start: 8.0),
        child: Icon(FluentIcons.search),
      ),
      cursorColor: theme.accentColor,
      outsideSuffixMode: OverlayVisibilityMode.editing,
      outsideSuffix: IconButton(
        iconButtonMode: IconButtonMode.large,
        onPressed: () {
          clearKey.value = DateTime.now();
          sheetsNotifier.filter.onClear();
        },
        icon: Icon(FluentIcons.clear, color: theme.accentColor),
      ),
    );
  }
}

class SheetsSorterButton extends HookWidget {
  const SheetsSorterButton({final Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    final sheetsNotifier = context.watch<SheetsNotifier>();
    final theme = FluentTheme.of(context);
    return ValueListenableBuilder(
      valueListenable: sheetsNotifier.sorter.directionNotifier,
      builder: (final context, final direction, final child) {
        return IconButton(
          iconButtonMode: IconButtonMode.large,
          onPressed: () {
            sheetsNotifier.sortSheets(direction: direction.opposite);
          },
          icon: Icon(
            direction == SheetsSortDirection.ascending
                ? FluentIcons.ascending
                : FluentIcons.descending,
            color: theme.accentColor,
          ),
        );
      },
    );
  }
}
