import 'package:flutter/widgets.dart';

enum AppSpacing {
  small(4),
  semiSmall(8),
  regular(12),
  semiBig(22),
  big(32);

  const AppSpacing(this.value);
  final double value;
}

class SpacedSizedBox extends StatelessWidget {
  const SpacedSizedBox({
    required this.spacing,
    this.axis = Axis.vertical,
    final Key? key,
  }) : super(key: key);
  final AppSpacing spacing;
  final Axis axis;
  @override
  Widget build(final BuildContext context) {
    switch (axis) {
      case Axis.horizontal:
        return SizedBox(
          width: spacing.value,
        );

      case Axis.vertical:
        return SizedBox(
          height: spacing.value,
        );
    }
  }
}

class SpacedSizedBoxData {
  SpacedSizedBoxData();
  final Widget small = const SpacedSizedBox(spacing: AppSpacing.small);
  final Widget semiSmall = const SpacedSizedBox(spacing: AppSpacing.semiSmall);
  final Widget regular = const SpacedSizedBox(spacing: AppSpacing.regular);
  final Widget semiBig = const SpacedSizedBox(spacing: AppSpacing.semiBig);
  final Widget big = const SpacedSizedBox(spacing: AppSpacing.big);
}

class HorizontalySpacedSizedBoxData {
  HorizontalySpacedSizedBoxData();
  final Widget small = const SpacedSizedBox(spacing: AppSpacing.small);
  final Widget semiSmall = const SpacedSizedBox(spacing: AppSpacing.semiSmall);
  final Widget regular = const SpacedSizedBox(spacing: AppSpacing.regular);
  final Widget semiBig = const SpacedSizedBox(spacing: AppSpacing.semiBig);
  final Widget big = const SpacedSizedBox(spacing: AppSpacing.big);
}

class AppEdgeInsets {
  AppEdgeInsets();
  final EdgeInsets small = EdgeInsets.all(AppSpacing.small.value);
  final EdgeInsets semiSmall = EdgeInsets.all(AppSpacing.semiSmall.value);
  final EdgeInsets regular = EdgeInsets.all(AppSpacing.regular.value);
  final EdgeInsets semiBig = EdgeInsets.all(AppSpacing.semiBig.value);
  final EdgeInsets big = EdgeInsets.all(AppSpacing.big.value);
}
