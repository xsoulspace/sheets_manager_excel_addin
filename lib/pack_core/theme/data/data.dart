import 'package:equatable/equatable.dart';
import 'package:fluent_ui/fluent_ui.dart';
import 'package:sheet_manager/pack_core/theme/data/colors.dart';
import 'package:sheet_manager/pack_core/theme/data/radius.dart';
import 'package:sheet_manager/pack_core/theme/data/spacing.dart';

class AppThemeData extends Equatable {
  const AppThemeData({
    required this.colors,
    required this.borderRadius,
    required this.appEdgeInsets,
    required this.horizontalySpacedSizedBox,
    required this.spacedSizedBox,
    required this.brightness,
  });

  factory AppThemeData.regular({
    required final Brightness brightness,
  }) =>
      AppThemeData(
        brightness: brightness,
        colors: brightness == Brightness.light
            ? AppColorsData.light()
            : AppColorsData.dark(),
        borderRadius: AppBorderRadiusData(),
        appEdgeInsets: AppEdgeInsets(),
        horizontalySpacedSizedBox: HorizontalySpacedSizedBoxData(),
        spacedSizedBox: SpacedSizedBoxData(),
      );

  final AppColorsData colors;
  final AppBorderRadiusData borderRadius;
  final SpacedSizedBoxData spacedSizedBox;
  final HorizontalySpacedSizedBoxData horizontalySpacedSizedBox;
  final AppEdgeInsets appEdgeInsets;
  final Brightness brightness;

  @override
  List<Object?> get props => [
        colors,
        borderRadius,
        spacedSizedBox,
        horizontalySpacedSizedBox,
        appEdgeInsets,
      ];
}
