// copied from https://github.com/nathanael540/admanager_web/blob/main/lib/src/adblock.dart

import 'package:flutter/material.dart';

/// A widget that displays an Ad from AdManager in a Flutter Web app
///
/// This widget will create one [SizedBox] with the size of the ad and will
/// display the ad inside it using the GPT.js library from Google
///
class AdsBlock extends StatelessWidget {
  /// The constructor for our widget
  const AdsBlock({
    required this.size,
    required this.blockId,
    required this.renderTo,
    super.key,
  });

  /// The size that will be used to request the ad
  final Size size;

  /// blockId The ad code R-A-
  final String? blockId;

  /// renderTo - Element id with [blockId] yandex_rtb_R-A-
  final String renderTo;
  @override
  Widget build(final BuildContext context) {
    /// We create a SizedBox with the size of the ad
    return SizedBox(
      height: size.height,
      width: size.width,
      child: Container(
        color: Colors.green,
      ),
    );
  }
}
