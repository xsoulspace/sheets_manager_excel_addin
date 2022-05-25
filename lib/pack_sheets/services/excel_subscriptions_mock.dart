import 'package:officejs/office_typedefs.dart';
import 'package:sheet_manager/pack_core/pack_core.dart';
import 'package:sheet_manager/pack_sheets/services/excel_subscriptions_i.dart';

class ExcelSubscriptionMockImpl extends ExcelSubscriptionsImpl {}

class ExcelSubscriptionsImpl extends ExcelSubscriptionsI {
  @override
  Future<void> onLoad() async {
    // TODO: implement onLoad
  }

  @override
  void subscribeToSheetCreated(
    final FutureValueChanged<WorksheetAddedEventArgs> listener,
  ) {
    // TODO: implement subscribeToSheetCreated
  }

  @override
  void subscribeToSheetDeleted(
    final FutureValueChanged<WorksheetDeletedEventArgs> listener,
  ) {
    // TODO: implement subscribeToSheetDeleted
  }

  @override
  void subscribeToSheetMoved(
    final FutureValueChanged<WorksheetMovedEventArgs> listener,
  ) {
    // TODO: implement subscribeToSheetMoved
  }

  @override
  void subscribeToSheetRenamed(
    final FutureValueChanged<WorksheetNameChangedEventArgs> listener,
  ) {
    // TODO: implement subscribeToSheetRenamed
  }

  @override
  void subscribeToSheetSelected(
    final FutureValueChanged<WorksheetActivatedEventArgs> listener,
  ) {
    // TODO: implement subscribeToSheetSelected
  }
}
