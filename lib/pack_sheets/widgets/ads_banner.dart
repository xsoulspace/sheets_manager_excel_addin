import 'package:fluent_ui/fluent_ui.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:sheet_manager/pack_sheets/widgets/ads_block.dart';

class AdsBanner extends HookWidget {
  const AdsBanner({super.key});

  @override
  Widget build(final BuildContext context) {
    final screenSize = MediaQuery.of(context).size;

    return AdsBlock(
      blockId: 'R-A-2140277-2',
      renderTo: 'yandex_rtb_R-A-2140277-2',
      size: Size(screenSize.width, 80),
    );
  }
}
