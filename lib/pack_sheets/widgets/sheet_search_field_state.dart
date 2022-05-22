part of pack_sheets;

SheetSearchFieldState useSheetSearchFieldState() => use(
      LifeHook(
        debugLabel: 'SheetSearchFieldState',
        state: SheetSearchFieldState(),
      ),
    );

class SheetSearchFieldState extends LifeState {
  SheetSearchFieldState();
  final controller = TextEditingController();
}
