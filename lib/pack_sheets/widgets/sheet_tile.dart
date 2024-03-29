part of '../pack_sheets.dart';

class SheetTile extends HookWidget {
  const SheetTile({
    required this.sheet,
    required this.dragEnabled,
    required this.onNameChanged,
    required this.index,
    required this.onSelected,
    required this.selected,
    super.key,
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
    final appThemeData = AppTheme.of(context);

    return HoverButton(
      onPressed: () => onSelected(sheet),
      cursor: state.editing ? null : SystemMouseCursors.click,
      builder: (final context, final states) {
        Widget titleWidget;
        if (state.editing) {
          // if (true) {
          titleWidget = Padding(
            padding: const EdgeInsets.only(right: 8.0),
            child: Focus(
              onFocusChange: (final focused) {
                if (!focused) {
                  state.editing = false;
                }
              },
              child: TextBox(
                maxLength: 31,
                decoration: BoxDecoration(
                  border: Border.all(
                    color: Colors.transparent,
                    width: 0,
                  ),
                  color: Colors.transparent,
                ),
                cursorColor: theme.accentColor,
                padding: const EdgeInsets.only(
                  top: 6.5,
                ),
                autofocus: true,
                style: theme.typography.body?.copyWith(
                  fontSize: 16,
                ),
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
              Text(
                sheet.name,
              ),
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

        return Stack(
          children: [
            Container(
              constraints: const BoxConstraints(
                minHeight: kOneLineTileHeight,
                minWidth: 88.0,
              ),
              margin: const EdgeInsets.only(
                top: 2,
                bottom: 2,
                left: 8,
                right: 5,
              ),
              padding: EdgeInsets.zero,
              decoration: BoxDecoration(
                color: () {
                  if (states.isPressing) {
                    return appThemeData.colors.pressedTileColor;
                  }
                  if (states.isHovering) {
                    return appThemeData.colors.hoveredTileColor;
                  }
                  return selected
                      ? appThemeData.colors.selectedTileColor
                      : theme.scaffoldBackgroundColor;
                }(),
                borderRadius: appThemeData.borderRadius.small,
              ),
              child: DefaultListTile(
                leading: AnimatedSwitcher(
                  duration: theme.fastAnimationDuration,
                  child: dragEnabled && states.isHovering
                      ? ReorderableDragStartListener(
                          index: index,
                          enabled: dragEnabled,
                          child: const Icon(
                            material.Icons.drag_indicator_rounded,
                          ),
                        )
                      : Icon(
                          material.Icons.drag_indicator_rounded,
                          color: theme.disabledColor,
                        ),
                ),
                title: titleWidget,
              ),
            ),
            Positioned(
              top: 0,
              left: 2,
              bottom: 0,
              child: NavigatorIndicator(
                selected: selected,
              ),
            ),
          ],
        );
      },
    );
  }
}

class NavigatorIndicator extends StatelessWidget {
  const NavigatorIndicator({
    this.verticalPadding = 12.0,
    this.horizontalPadding = 10.0,
    this.isHorizontal = false,
    this.selected = false,
    final Key? key,
  }) : super(key: key);
  final bool isHorizontal;
  final double verticalPadding;
  final double horizontalPadding;
  final bool selected;
  @override
  Widget build(final BuildContext context) {
    final theme = FluentTheme.of(context);
    final decoration = BoxDecoration(
      color: selected ? theme.accentColor : theme.scaffoldBackgroundColor,
      borderRadius: BorderRadius.circular(100),
    );
    return Align(
      alignment: isHorizontal
          ? AlignmentDirectional.centerStart
          : Alignment.bottomCenter,
      child: AnimatedContainer(
        duration: theme.mediumAnimationDuration,
        width: 4,
        decoration: decoration,
        margin: EdgeInsets.symmetric(
          vertical: verticalPadding,
        ),
      ),
    );
  }
}
