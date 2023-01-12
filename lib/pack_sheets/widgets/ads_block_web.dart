// copied from https://github.com/nathanael540/admanager_web/blob/main/lib/src/adblock.dart
// ignore: avoid_web_libraries_in_flutter
import 'dart:html' as html;
// ignore: avoid_web_libraries_in_flutter
import 'dart:js' as js;

import 'package:flutter/material.dart';
import 'package:pointer_interceptor/src/shim/dart_ui.dart' as ui;

/// A widget that displays an Ad from AdManager in a Flutter Web app
///
/// This widget will create one [SizedBox] with the size of the ad and will
/// display the ad inside it using the GPT.js library from Google
///
class AdsBlock extends StatelessWidget {
  /// The constructor for our widget
  AdsBlock({
    required this.size,
    required this.blockId,
    required this.renderTo,
    super.key,
  }) {
    /// We create a DivElement to hold our ad ;)
    ui.platformViewRegistry.registerViewFactory(renderTo, (final viewId) {
      final div = html.DivElement()..id = renderTo;

      // TODO: Allow more sizes, like responsive ads ["fluid"]

      div.style.width = '${size.width}px';
      div.style.height = '${size.height}px';

      // TODO: Add a eventListener to check if the ad was loaded

      return div;
    });
  }

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
      child: HtmlElementView(
        viewType: renderTo,
        onPlatformViewCreated: (final id) {
          /// Its call our function to load the ad from AdManager using GPT.js
          js.context.callMethod('initAd', [
            renderTo,
            blockId,
          ]);
        },
      ),
    );
  }
}
