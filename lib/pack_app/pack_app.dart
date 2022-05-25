library pack_app;

import 'dart:math' as math;

import 'package:fluent_ui/fluent_ui.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:life_hooks/life_hooks.dart';
import 'package:provider/provider.dart';
import 'package:sheet_manager/generated/l10n.dart';
import 'package:sheet_manager/pack_analytics/analytics/notifiers/analytics_notifier.dart';
import 'package:sheet_manager/pack_core/pack_core.dart';
import 'package:sheet_manager/pack_preloaders/pack_preloaders.dart';
import 'package:sheet_manager/pack_settings/pack_settings.dart';
import 'package:sheet_manager/pack_sheets/pack_sheets.dart';
import 'package:url_launcher/url_launcher.dart' as url_launcher;

part 'screens/app_scaffold_screen.dart';
part 'screens/info_screen.dart';
part 'screens/info_screen_state.dart';
part 'screens/navigation_screen.dart';
part 'screens/navigation_screen_state.dart';
part 'screens/sheet_manager_app.dart';
