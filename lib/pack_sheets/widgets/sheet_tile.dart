part of pack_sheets;

class SheetTile extends StatelessWidget {
  const SheetTile({
    required this.sheet,
    required this.dragEnabled,
    required this.onNameChanged,
    required this.index,
    final super.key,
  });
  final SheetModel sheet;
  final int index;
  final bool dragEnabled;
  final void Function(SheetModel sheet, String newName) onNameChanged;
  @override
  Widget build(final BuildContext context) {
    final theme = FluentTheme.of(context);
    return ListTile(
      contentPadding: const EdgeInsets.symmetric(
        horizontal: 12.0,
      ),
      title: Padding(
        padding: const EdgeInsets.only(right: 8.0),
        child: TextBox(
          initialValue: sheet.name,
          onChanged: (final newName) => onNameChanged(sheet, newName),
        ),
      ),
      leading: AnimatedSwitcher(
        duration: theme.fastAnimationDuration,
        child: dragEnabled
            ? ReorderableDragStartListener(
                index: index,
                enabled: dragEnabled,
                child: const Icon(material.Icons.drag_handle_rounded),
              )
            : const SizedBox(),
      ),
    );
  }
}
