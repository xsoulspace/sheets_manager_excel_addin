import 'package:fluent_ui/fluent_ui.dart';
import 'package:sheet_manager/pack_core/pack_core.dart';
import 'package:sheet_manager/pack_sheets/pack_sheets.dart';

enum SheetsSortDirection {
  ascending,
  descending;

  SheetsSortDirection get opposite {
    if (SheetsSortDirection.ascending == this) {
      return SheetsSortDirection.descending;
    }
    return SheetsSortDirection.ascending;
  }
}

class SheetsSorter implements Disposable {
  final directionNotifier =
      ValueNotifier<SheetsSortDirection>(SheetsSortDirection.ascending);
  List<SheetModel> sort({
    required final List<SheetModel> sheets,
    final SheetsSortDirection direction = SheetsSortDirection.ascending,
  }) {
    directionNotifier.value = direction;
    int Function(SheetModel, SheetModel) compareFunction;
    switch (direction) {
      case SheetsSortDirection.ascending:
        compareFunction = (final a, final b) {
          return a.name[0].compareTo(b.name[0]);
        };
        break;
      case SheetsSortDirection.descending:
        compareFunction = (final a, final b) {
          return b.name[0].compareTo(a.name[0]);
        };
        break;
    }
    return [...sheets]..sort(compareFunction);
  }

  @override
  void dispose() {
    directionNotifier.dispose();
  }
}
