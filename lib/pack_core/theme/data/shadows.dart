import 'package:flutter/rendering.dart';

enum AppShadowsData {
  big(
    BoxShadow(
      blurRadius: 32,
      color: Color(0x44000000),
    ),
  );

  const AppShadowsData(this.value);
  final BoxShadow value;
}
