import 'package:equatable/equatable.dart';
import 'package:flutter/rendering.dart';
import 'package:sheet_manager/pack_core/utils/utils.dart';

// TODO(arenukvern): refactor this to use it if needed
class AppColorsData extends Equatable {
  const AppColorsData({
    required this.accent,
    required this.hoveredTileColor,
    required this.selectedTileColor,
    required this.pressedTileColor,
  });

  factory AppColorsData.light() => AppColorsData(
        accent: ExcelPrimaryPalette.primary.value,
        hoveredTileColor: ExcelColorfulPrimaryPalette.gray30.value,
        pressedTileColor: ExcelColorfulPrimaryPalette.gray30.value,
        selectedTileColor: ExcelColorfulPrimaryPalette.gray20.value,
      );

  factory AppColorsData.dark() => AppColorsData(
        accent: ExcelPrimaryPalette.primary.value,
        hoveredTileColor:
            ExcelColorfulPrimaryPalette.gray140.value.withOpacity(0.7),
        pressedTileColor:
            ExcelColorfulPrimaryPalette.gray140.value.withOpacity(0.6),
        selectedTileColor:
            ExcelColorfulPrimaryPalette.gray140.value.withOpacity(0.9),
      );

  final Color accent;
  final Color hoveredTileColor;
  final Color selectedTileColor;
  final Color pressedTileColor;

  @override
  List<Object?> get props => [
        accent.named('accent'),
        hoveredTileColor.named('hoveredTileColor'),
        selectedTileColor.named('selectedTileColor'),
        pressedTileColor.named('pressedTileColor'),
      ];
}

/// Mostly - green color
///
/// https://developer.microsoft.com/en-us/fluentui#/styles/web/colors/products
enum ExcelPrimaryPalette {
  shade20(Color(0xFF004b1c)),
  shade10(Color(0xFF0e5c2f)),
  primary(Color(0xFF217346)),
  tint10(Color(0xFF3f8159)),
  tint20(Color(0xFF4e9668)),
  tint30(Color(0xFF6eb38a)),
  tint40(Color(0xFF9fcdb3)),
  tint50(Color(0xFFe9f5ee));

  const ExcelPrimaryPalette(this.value);
  final Color value;
}

/// Mostly gray color
///
/// https://developer.microsoft.com/en-us/fluentui#/styles/web/colors/products
enum ExcelColorfulPrimaryPalette {
  gray180(Color(0xFF252423)),
  gray140(Color(0xFF484644)),
  gray130(Color(0xFF605e5c)),
  gray80(Color(0xFFb3b0ad)),
  gray60(Color(0xFFc8c6c4)),
  gray50(Color(0xFFd2d0ce)),
  gray40(Color(0xFFe1dfdd)),
  gray30(Color(0xFFedebe9)),
  gray20(Color(0xFFf3f2f1)),
  white(Color(0xFFffffff));

  const ExcelColorfulPrimaryPalette(this.value);
  final Color value;
}
