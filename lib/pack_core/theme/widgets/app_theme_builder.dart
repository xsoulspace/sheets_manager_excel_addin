part of pack_core;

class AppThemeBuilder extends StatelessWidget {
  const AppThemeBuilder({
    required this.child,
    final super.key,
  });
  final Widget child;
  @override
  Widget build(final BuildContext context) {
    final data = AppThemeData.regular(
      brightness: FluentTheme.of(context).brightness,
    );

    return AppTheme(
      data: data,
      child: child,
    );
  }
}

class AppTheme extends InheritedWidget {
  const AppTheme({
    required this.data,
    required final super.child,
    final super.key,
  }) : super();

  final AppThemeData data;

  static AppThemeData of(final BuildContext context) {
    final widget = context.dependOnInheritedWidgetOfExactType<AppTheme>();
    return widget!.data;
  }

  @override
  bool updateShouldNotify(covariant final AppTheme oldWidget) {
    return data != oldWidget.data;
  }
}
