import 'dart:async';

import 'package:flutter/material.dart';
import 'package:sheet_manager/pack_app/pack_app.dart';
import 'package:sheet_manager/pack_preloaders/pack_preloaders.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  runApp(
    SheetManagerApp(
      settings: GlobalStateNotifiers.getSettings(
        excelAvailable: false,
      ),
    ),
  );
}
