import 'package:flutter/rendering.dart';

enum AppRadiusData {
  small(Radius.circular(10.0)),
  regular(Radius.circular(12.0)),
  big(Radius.circular(16.0));

  const AppRadiusData(final this.value);
  final Radius value;
}

class AppBorderRadiusData {
  AppBorderRadiusData();
  final BorderRadius small = BorderRadius.all(AppRadiusData.small.value);
  final BorderRadius regular = BorderRadius.all(AppRadiusData.regular.value);
  final BorderRadius big = BorderRadius.all(AppRadiusData.big.value);
}
