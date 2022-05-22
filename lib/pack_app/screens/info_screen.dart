part of pack_app;

class InfoScreen extends HookWidget {
  const InfoScreen({final Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    final state = useInfoScreenState();

    return ScaffoldPage.scrollable(
      header: const PageHeader(title: Text('About')),
      children: const [],
    );
  }
}
