part of pack_core;

abstract class ContextlessLoadable {
  ContextlessLoadable();

  /// Use this function to load something on
  /// instance initialization
  Future<void> onLoad();
}

abstract class ContextfulLoadable {
  ContextfulLoadable();

  /// Use this function to load something on
  /// instance initialization
  Future<void> onLoad({required final BuildContext context});
}
