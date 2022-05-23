part of pack_sheets;

class SheetTile extends StatelessWidget {
  const SheetTile({
    required this.sheet,
    required this.dragEnabled,
    required this.index,
    final super.key,
  });
  final SheetModel sheet;
  final int index;
  final bool dragEnabled;
  @override
  Widget build(final BuildContext context) {
    final theme = FluentTheme.of(context);
    return ListTile(
      title: Text(sheet.name),
      trailing: AnimatedSwitcher(
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
