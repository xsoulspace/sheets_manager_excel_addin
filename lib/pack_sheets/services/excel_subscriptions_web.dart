import 'package:officejs/officejs.dart';
import 'package:sheet_manager/pack_core/pack_core.dart';
import 'package:sheet_manager/pack_sheets/services/excel_subscriptions_i.dart';
import 'package:sheet_manager/pack_sheets/services/excel_subscriptions_mock.dart'
    as excel_subscriptions_mock;

class ExcelSubscriptionMock
    extends excel_subscriptions_mock.ExcelSubscriptions {}

class ExcelSubscriptions extends ExcelSubscriptionsI {
  late RequestContext context;
  @override
  Future<void> sync() async => context.sync();
  WorksheetCollection get worksheets => context.workbook.worksheets;
  final subscriptions = <EventHandlerResult>[];
  @override
  Future<void> onLoad() async {
    context = await Excel.run();
  }

  @override
  void dispose() {
    super.dispose();
    for (final subscription in subscriptions) {
      subscription.remove();
    }
    sync();
  }

  void addSubscription(final EventHandlerResult subscription) =>
      subscriptions.add(subscription);
  @override
  void subscribeToSheetDeleted(
    final FutureValueChanged<WorksheetDeletedEventArgs> listener,
  ) {
    addSubscription(worksheets.onDeleted.add(listener));
  }

  @override
  void subscribeToSheetCreated(
    final FutureValueChanged<WorksheetAddedEventArgs> listener,
  ) {
    addSubscription(worksheets.onAdded.add(listener));
  }

  @override
  void subscribeToSheetRenamed(
    final FutureValueChanged<WorksheetNameChangedEventArgs> listener,
  ) {
    addSubscription(worksheets.onNameChanged.add(listener));
  }

  @override
  void subscribeToSheetSelected(
    final FutureValueChanged<WorksheetActivatedEventArgs> listener,
  ) {
    addSubscription(worksheets.onActivated.add(listener));
  }

  @override
  void subscribeToSheetMoved(
    final FutureValueChanged<WorksheetMovedEventArgs> listener,
  ) {
    addSubscription(worksheets.onMoved.add(listener));
  }
}
