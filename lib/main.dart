import 'dart:async';

import 'package:flutter/material.dart';
import 'package:sheet_manager/pack_app/pack_app.dart';
import 'package:sheet_manager/pack_preloaders/pack_preloaders.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final analytics = GlobalStateNotifiers.getAnalytics();
  final settings = GlobalStateNotifiers.getSettings();
  await Future.wait([
    settings.onLoad(),
    analytics.onLoad(),
  ]);

  runZonedGuarded(
    () {
      runApp(
        SheetManagerApp(
          settings: settings,
          analytics: analytics,
        ),
      );
    },
    analytics.recordError,
  );
}
