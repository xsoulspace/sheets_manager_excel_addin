import 'package:flutter/foundation.dart';
import 'package:sheet_manager/pack_core/pack_core.dart';

class AnalyticsNotifier extends ChangeNotifier implements ContextlessLoadable {
  final logs = <String>[];

  void log(final String value) {
    if (logs.length == 15) {
      logs.removeLast();
    }
    logs.insert(0, value);
    notifyListeners();
  }

  void clearLogs() {
    logs.clear();
    notifyListeners();
  }

  Future<void> recordError(
    final dynamic exception,
    final StackTrace? stack, {
    final dynamic reason,
    final Iterable<DiagnosticsNode> information = const [],
    final bool fatal = false,
    bool? printDetails,
  }) async {
    // Use the debug flag if printDetails is not provided
    printDetails ??= kDebugMode;
    final errorDetails = StringBuffer();
    final String info = information.isEmpty
        ? ''
        : (StringBuffer()..writeAll(information, '\n')).toString();

    errorDetails
      ..writeln('----------------ANALYTICS CRASH----------------')
      ..writeln('----------------${DateTime.now()}----------------');
    // If available, give a reason to the exception.
    if (reason != null) {
      errorDetails.writeln('The following exception was thrown $reason:');
    }

    // Need to print the exception to explain why the exception was thrown.
    errorDetails.writeln(exception.toString());

    // Print information provided by the Flutter framework about the exception

    if (info.isNotEmpty) errorDetails.writeln(info);

    // Not using Trace.format here to stick to the default stack trace format
    // that Flutter developers are used to seeing.

    if (stack != null) errorDetails.writeln('\n$stack');

    errorDetails
        .writeln('----------------------------------------------------');
    final errorDetailsStr = errorDetails.toString();
    // ignore: avoid_print
    if (printDetails) print(errorDetailsStr);
    log(errorDetailsStr);
  }

  /// Use [fatal] to indicate whether the error is a fatal or not.
  Future<void> recordFlutterError(
    final FlutterErrorDetails flutterErrorDetails, {
    final bool fatal = false,
  }) {
    FlutterError.presentError(flutterErrorDetails);

    return recordError(
      flutterErrorDetails.exceptionAsString(),
      flutterErrorDetails.stack,
      reason: flutterErrorDetails.context,
      information: flutterErrorDetails.informationCollector == null
          ? []
          : flutterErrorDetails.informationCollector!(),
      printDetails: false,
      fatal: fatal,
    );
  }

  @override
  Future<void> onLoad() async {
    final originalOnError = FlutterError.onError;
    FlutterError.onError = (final errorDetails) async {
      await recordFlutterError(errorDetails);
      // Forward to original handler.
      originalOnError?.call(errorDetails);
    };
  }
}
