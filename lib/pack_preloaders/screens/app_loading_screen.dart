part of pack_preloaders;

class AppLoadingScreen extends StatelessWidget {
  const AppLoadingScreen({
    final Key? key,
  }) : super(key: key);
  @override
  Widget build(final BuildContext context) {
    return const Center(
      child: CircularProgress(),
    );
  }
}

class CircularProgress extends StatelessWidget {
  const CircularProgress({final Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    return const CircularProgressIndicator.adaptive();
  }
}
