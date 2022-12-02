import 'package:flutter/foundation.dart';
import 'package:sheet_manager/pack_analytics/analytics/firebase/firebase_plugin.dart';
import 'package:sheet_manager/pack_core/pack_core.dart';

enum AnalyticEvents {
  usedInExcel,
  usedInWeb,
}

abstract class AbstractAnalytics implements ContextlessLoadable {
  Future<void> logEvent(final AnalyticEvents event);
  Future<void> recordError(
    final dynamic exception,
    final StackTrace? stack, {
    final dynamic reason,
    final Iterable<DiagnosticsNode> information = const [],
    final bool fatal = false,
    final bool? printDetails,
  });
  Future<void> recordFlutterError(
    final FlutterErrorDetails flutterErrorDetails, {
    final bool fatal = false,
  });
  @override
  Future<void> onLoad();
  Future<void> onDelayedLoad();
}

class AnalyticsNotifier extends ChangeNotifier implements AbstractAnalytics {
  final logsNotifier = ValueNotifier<List<String>>([]);
  final plugins = <AbstractAnalytics>[FirebaseAnalyticsPlugin()];
  @override
  void dispose() {
    super.dispose();
    logsNotifier.dispose();
  }

  @override
  Future<void> logEvent(final AnalyticEvents event) async {
    for (final plugin in plugins) {
      await plugin.logEvent(event);
    }
  }

  List<String> get logs => logsNotifier.value;
  void log(final String value) {
    if (!kDebugMode) return;
    if (logs.length == 15) {
      logs.removeLast();
    }
    logs.insert(0, value);
  }

  void clearLogs() {
    logs.clear();
  }

  @override
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
    final errorDetailsStr = convertErrorDetailsToString(
      exception,
      stack,
      reason: reason,
      information: information,
      fatal: fatal,
      printDetails: printDetails,
    );
    // ignore: avoid_print
    if (printDetails) print(errorDetailsStr);

    log(errorDetailsStr);
    for (final plugin in plugins) {
      await plugin.recordError(
        exception,
        stack,
        reason: reason,
        information: information,
        fatal: fatal,
        printDetails: printDetails,
      );
    }
  }

  /// Use [fatal] to indicate whether the error is a fatal or not.
  @override
  Future<void> recordFlutterError(
    final FlutterErrorDetails flutterErrorDetails, {
    final bool fatal = false,
  }) async {
    FlutterError.presentError(flutterErrorDetails);
    for (final plugin in plugins) {
      await plugin.recordFlutterError(flutterErrorDetails, fatal: fatal);
    }
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
    for (final plugin in plugins) {
      await plugin.onLoad();
    }
  }

  @override
  Future<void> onDelayedLoad() async {
    for (final plugin in plugins) {
      await plugin.onDelayedLoad();
    }
  }
}

String convertErrorDetailsToString(
  final dynamic exception,
  final StackTrace? stack, {
  final dynamic reason,
  final Iterable<DiagnosticsNode> information = const [],
  final bool fatal = false,
  final bool? printDetails,
}) {
  final errorDetails = StringBuffer();
  final String info = information.isEmpty
      ? ''
      : (StringBuffer()..writeAll(information, '\n')).toString();

  errorDetails
    ..writeln('----------------ANALYTICS CRASH----------------')
    ..writeln('----------------${DateTime.now()}----------------');
  if (fatal) {
    errorDetails.writeln('----------------FATAL----------------');
  }
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

  errorDetails.writeln('----------------------------------------------------');
  return errorDetails.toString();
}
