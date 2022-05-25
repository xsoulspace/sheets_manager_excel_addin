part of pack_app;

class InfoScreen extends HookWidget {
  const InfoScreen({final Key? key}) : super(key: key);
  static const privacyPolicyLink = '';
  static const githubLink = '';
  static const discordLink = '';
  @override
  Widget build(final BuildContext context) {
    final state = useInfoScreenState();
    final appTheme = AppTheme.of(context);

    return ScaffoldPage.scrollable(
      header: PageHeader(title: Text(S.of(context).about)),
      children: [
        Card(
          child: Text(
            S.current.thankYou,
          ),
        ),
        appTheme.spacedSizedBox.big,
        Wrap(
          alignment: WrapAlignment.center,
          children: [
            TextButton(
              onPressed: () async {
                await launchUrl(privacyPolicyLink);
              },
              child: Text(
                S.current.privacyPolicy,
              ),
            ),
            TextButton(
              onPressed: () async {
                await launchUrl(githubLink);
              },
              child: const Text(
                'This an Open Source Software. See the source at GitHub.',
              ),
            ),
            TextButton(
              onPressed: () async {
                await launchUrl(discordLink);
              },
              child: const Text(
                'Discord',
              ),
            ),
          ],
        ),
      ],
    );
  }
}

Future<void> launchUrl(final String url) async {
  final uri = Uri.dataFromString(url);
  if (await url_launcher.canLaunchUrl(uri)) {
    await url_launcher.launchUrl(uri);
  }
}
