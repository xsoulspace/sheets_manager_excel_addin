import 'package:flutter/foundation.dart';

class AnalyticsNotifier extends ChangeNotifier {
  final logs = <String>[];

  void recordError(
    final dynamic exception,
    final StackTrace? stack, {
    final dynamic reason,
    final Iterable<DiagnosticsNode> information = const [],
    final bool fatal = false,
    bool? printDetails,
  }) {
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

  void log(final String value) {
    logs.add(value);
    notifyListeners();
  }

  void clearLogs() {
    logs.clear();
    notifyListeners();
  }
}
