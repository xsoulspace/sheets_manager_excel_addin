import 'package:fluent_ui/fluent_ui.dart';
import 'package:flutter/material.dart' as material;
import 'package:provider/provider.dart';
import 'package:sheet_manager/pack_analytics/analytics/notifiers/analytics_notifier.dart';
import 'package:sheet_manager/pack_settings/pack_settings.dart';
import 'package:sheet_manager/pack_sheets/pack_sheets.dart';

class DebugPane extends StatelessWidget {
  const DebugPane({final Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    final analytics = context.watch<AnalyticsNotifier>();
    final settings = context.read<SettingsNotifier>();
    final sheetsNotifier = context.read<SheetsNotifier>();
    return SizedBox(
      height: 400,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          ListTile(
            title: const Text('Use mock data'),
            trailing: material.Switch.adaptive(
              value: settings.useMockData.value,
              onChanged: (final newValue) {
                settings.useMockData.value = newValue;
              },
            ),
          ),
          ListTile(
            title: const Text('Refresh sheets'),
            trailing: IconButton(
              icon: const Icon(FluentIcons.sync),
              onPressed: sheetsNotifier.reloadSheets,
            ),
          ),
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 100),
            child: CommandBar(
              overflowBehavior: CommandBarOverflowBehavior.clip,
              isCompact: true,
              primaryItems: [
                CommandBarBuilderItem(
                  builder: (final context, final mode, final child) {
                    return Tooltip(
                      message: 'Edit name',
                      child: child,
                    );
                  },
                  wrappedItem: CommandBarButton(
                    icon: const Icon(FluentIcons.clear, size: 10),
                    label: const Text('Clear'),
                    onPressed: analytics.clearLogs,
                  ),
                ),
                // const CommandBarSeparator(),
              ],
            ),
          ),
          Expanded(
            child: Card(
              child: ListView.builder(
                itemCount: analytics.logs.length,
                itemBuilder: (final context, final index) {
                  final log = analytics.logs[index];
                  return Card(
                    child: SelectableText(
                      log,
                      key: ValueKey(index),
                    ),
                  );
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}
