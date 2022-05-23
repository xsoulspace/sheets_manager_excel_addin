import 'package:equatable/equatable.dart';
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
  });

  factory AppThemeData.regular() => AppThemeData(
        colors: AppColorsData.light(),
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

  @override
  List<Object?> get props => [
        colors,
        borderRadius,
        spacedSizedBox,
        horizontalySpacedSizedBox,
        appEdgeInsets,
      ];
}
