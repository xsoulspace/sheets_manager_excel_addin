part of pack_sheets;

class SheetSearchField extends HookWidget {
  const SheetSearchField({final Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    final sheetsNotifier = context.read<SheetsNotifier>();

    return TextBox(
      placeholder: 'Search',
      controller: sheetsNotifier.searchController,
      textInputAction: TextInputAction.next,
      prefix: const Padding(
        padding: EdgeInsetsDirectional.only(start: 8.0),
        child: Icon(FluentIcons.search),
      ),
      suffix: GestureDetector(
        onTap: sheetsNotifier.onClearFiltered,
        child: const Padding(
          padding: EdgeInsetsDirectional.only(start: 8.0),
          child: Icon(FluentIcons.clear),
        ),
      ),
    );
  }
}
