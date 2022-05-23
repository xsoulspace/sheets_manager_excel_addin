part of pack_sheets;

class SheetTile extends HookWidget {
  const SheetTile({
    required this.sheet,
    required this.dragEnabled,
    required this.onNameChanged,
    required this.index,
    required this.onSelected,
    required this.selected,
    final super.key,
  });
  final SheetModel sheet;
  final int index;
  final bool selected;
  final bool dragEnabled;
  final void Function(SheetModel sheet, String newName) onNameChanged;
  final ValueChanged<SheetModel> onSelected;
  @override
  Widget build(final BuildContext context) {
    final state = useSheetTileState();
    final theme = FluentTheme.of(context);
    final appThemeData = context.read<AppThemeData>();

    return HoverButton(
      cursor: state.editing ? null : SystemMouseCursors.click,
      onPressed: () => onSelected(sheet),
      builder: (final context, final states) {
        Widget titleWidget;
        if (state.editing) {
          titleWidget = Padding(
            padding: const EdgeInsets.only(right: 8.0),
            child: Focus(
              onFocusChange: (final focused) {
                if (!focused) {
                  state.editing = false;
                }
              },
              child: TextBox(
                autofocus: true,
                initialValue: sheet.name,
                onEditingComplete: () {
                  state.editing = false;
                },
                onSubmitted: (final _) {
                  state.editing = false;
                },
                onChanged: (final newName) => onNameChanged(sheet, newName),
              ),
            ),
          );
        } else {
          titleWidget = Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(sheet.name),
              appThemeData.horizontalySpacedSizedBox.regular,
              Visibility(
                visible: states.isHovering,
                maintainAnimation: true,
                maintainState: true,
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 100),
                  child: CommandBar(
                    overflowBehavior: CommandBarOverflowBehavior.clip,
                    isCompact: true,
                    primaryItems: [
                      CommandBarBuilderItem(
                        builder: (final context, final mode, final child) {
                          return Tooltip(
                            message: 'Edit name',
                            child: child,
                          );
                        },
                        wrappedItem: CommandBarButton(
                          icon: const Icon(FluentIcons.edit, size: 10),
                          label: const Text('Edit'),
                          onPressed: () {
                            state.editing = true;
                          },
                        ),
                      ),
                      // const CommandBarSeparator(),
                    ],
                  ),
                ),
              ),
            ],
          );
        }

        return AnimatedContainer(
          duration: theme.fastAnimationDuration,
          color: selected ? theme.cardColor : theme.inactiveBackgroundColor,
          child: ListTile(
            contentPadding: const EdgeInsets.symmetric(
              horizontal: 12.0,
            ),
            title: titleWidget,
            leading: AnimatedSwitcher(
              duration: theme.fastAnimationDuration,
              child: dragEnabled
                  ? ReorderableDragStartListener(
                      index: index,
                      enabled: dragEnabled,
                      child: const Icon(material.Icons.drag_handle_rounded),
                    )
                  : Icon(
                      material.Icons.drag_handle_rounded,
                      color: theme.disabledColor,
                    ),
            ),
          ),
        );
      },
    );
  }
}
