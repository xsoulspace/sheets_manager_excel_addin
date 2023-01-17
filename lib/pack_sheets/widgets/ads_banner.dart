import 'package:fluent_ui/fluent_ui.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:yandex_ads_sdk/yandex_ads_sdk.dart';

class AdsBanner extends HookWidget {
  const AdsBanner({super.key});

  @override
  Widget build(final BuildContext context) {
    if (!kIsWeb) return const SizedBox();
    final screenSize = MediaQuery.of(context).size;
    return YandexFlexibleBanner(
      adUnitId: 'R-A-2140277-2',
      height: 80,
      width: screenSize.width,
    );
  }
}
