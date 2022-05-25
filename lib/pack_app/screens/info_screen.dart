part of pack_app;

class InfoScreen extends HookWidget {
  const InfoScreen({final Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    final state = useInfoScreenState();

    return ScaffoldPage.scrollable(
      header: PageHeader(title: Text(S.of(context).about)),
      children: const [
        Card(
          child: ListTile(
            title: Text(''),
            subtitle: Text(''),
          ),
        )
      ],
    );
  }
}
