part of widgets;

abstract class StateInitializer extends ContextfulLoadable {
  @override
  Future<void> onLoad(final BuildContext context) async {}

  Future<void> onPostBindingLoad(final BuildContext context) async {}
}

class StateLoader extends HookWidget {
  const StateLoader({
    required final this.child,
    required final this.initializer,
    required final this.loader,
    final Key? key,
  }) : super(key: key);
  final Widget child;
  final StateInitializer initializer;
  final Widget loader;
  @override
  Widget build(final BuildContext context) {
    final loaded = useIsBool();
    final loading = useIsBool();

    if (loaded.value & !loading.value) {
      return child;
    }

    return FutureBuilder<bool>(
      future: () async {
        if (loading.value) return false;
        loading.value = true;
        loaded.value = true;
        await initializer.onLoad(context);
        unawaited(
          // ignore: use_build_context_synchronously
          initializer.onPostBindingLoad(context).then((final _) {
            loading.value = false;
          }),
        );

        return true;
      }(),
      builder: (final context, final snapshot) {
        return Directionality(
          textDirection: TextDirection.ltr,
          child: Stack(
            children: [
              child,
              if (loading.value)
                Positioned.fill(
                  child: ColoredBox(
                    color: Colors.white.withOpacity(0.5),
                    child: loader,
                  ),
                ),
            ],
          ),
        );
      },
    );
  }
}
