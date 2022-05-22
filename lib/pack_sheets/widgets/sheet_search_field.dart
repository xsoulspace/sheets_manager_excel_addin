part of pack_sheets;

class SheetSearchField extends HookWidget {
  const SheetSearchField({final Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    final state = useSheetSearchFieldState();

    return TextBox(
      placeholder: 'Search',
      controller: state.controller,
      textInputAction: TextInputAction.next,
      prefix: const Padding(
        padding: EdgeInsetsDirectional.only(start: 8.0),
        child: Icon(FluentIcons.search),
      ),
    );
  }
}
