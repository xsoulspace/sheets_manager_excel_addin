import 'package:fluent_ui/fluent_ui.dart';
import 'package:officejs/office_typedefs.dart';
import 'package:sheet_manager/pack_core/pack_core.dart';

export 'excel_subscriptions_mock.dart'
    if (dart.library.html) 'excel_subscriptions_web.dart';

/// Always call [context.sync] after subscribing
abstract class ExcelSubscriptionsI extends ChangeNotifier
    implements ContextlessLoadable {
  Future<void> sync() async {}
  void subscribeToSheetDeleted(
    final FutureValueChanged<WorksheetDeletedEventArgs> listener,
  );

  void subscribeToSheetCreated(
    final FutureValueChanged<WorksheetAddedEventArgs> listener,
  );

  void subscribeToSheetRenamed(
    final FutureValueChanged<WorksheetNameChangedEventArgs> listener,
  );

  void subscribeToSheetSelected(
    final FutureValueChanged<WorksheetActivatedEventArgs> listener,
  );

  void subscribeToSheetMoved(
    final FutureValueChanged<WorksheetMovedEventArgs> listener,
  );
}
