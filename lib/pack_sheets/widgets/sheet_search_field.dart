part of pack_sheets;

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
