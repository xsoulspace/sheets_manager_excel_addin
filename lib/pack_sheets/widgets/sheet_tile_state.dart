part of pack_sheets;

SheetTileState useSheetTileState() => use(
      LifeHook(
        debugLabel: 'SheetTileState',
        state: SheetTileState(),
      ),
    );

class SheetTileState extends LifeState {
  SheetTileState();
  bool _editing = false;

  bool get editing => _editing;

  set editing(final bool value) {
    _editing = value;
    setState();
  }
}
