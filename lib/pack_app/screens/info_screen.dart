part of pack_app;

class InfoScreen extends HookWidget {
  const InfoScreen({final Key? key}) : super(key: key);
  static const privacyPolicyLink =
      'https://github.com/xsoulspace/sheets_manager_excel_addin/blob/develop/PRIVACY_POLICY.md';
  static const githubLink =
      'https://github.com/xsoulspace/sheets_manager_excel_addin';
  static const discordLink = 'https://discord.gg/y54DpJwmAn';
  static const boostyLink = 'https://boosty.to/arenukvern';
  static const cloudTipsLink = 'https://pay.cloudtips.ru/p/1629cd27';
  static const termsOfUseLink =
      'https://github.com/xsoulspace/sheets_manager_excel_addin/blob/develop/TERMS_AND_CONDITIONS.md';
  @override
  Widget build(final BuildContext context) {
    final state = useInfoScreenState();
    final appTheme = AppTheme.of(context);
    final theme = FluentTheme.of(context);
    final typography = theme.typography;

    return ScaffoldPage.scrollable(
      header: PageHeader(title: Text(S.of(context).about)),
      children: [
        Card(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              appTheme.spacedSizedBox.semiBig,
              Text(
                S.current.purpose,
                style: typography.bodyLarge,
              ),
              appTheme.spacedSizedBox.big,
              Text(
                S.current.contributingTitle,
                style: typography.title,
              ),
              appTheme.spacedSizedBox.regular,
              Wrap(
                crossAxisAlignment: WrapCrossAlignment.center,
                children: [
                  Text(S.current.oss),
                  Text(S.current.all),
                  const UrlButton(
                    text: 'comments',
                    url:
                        'https://github.com/xsoulspace/sheets_manager_excel_addin/issues',
                  ),
                  Text(S.current.and),
                  const UrlButton(
                    text: 'pull requests',
                    url:
                        'https://github.com/xsoulspace/sheets_manager_excel_addin/issues',
                  ),
                  Text(S.current.areWelcome),
                ],
              ),
              appTheme.spacedSizedBox.big,
              Text(
                S.current.gettingHelpTitle,
                style: typography.title,
              ),
              appTheme.spacedSizedBox.regular,
              Wrap(
                crossAxisAlignment: WrapCrossAlignment.center,
                children: [
                  Text(S.current.gettingHelp),
                  const UrlButton(
                    text: 'Discord Community',
                    url: 'https://discord.gg/y54DpJwmAn',
                  ),
                ],
              ),
              appTheme.spacedSizedBox.big,
              Text(
                S.current.donations,
                style: typography.title,
              ),
              appTheme.spacedSizedBox.regular,
              Wrap(
                crossAxisAlignment: WrapCrossAlignment.center,
                children: [
                  Text(S.current.considerSponsor),
                  const UrlButton(text: 'Boosty', url: boostyLink),
                  Text(S.current.or),
                  const UrlButton(text: 'CloudTips', url: cloudTipsLink),
                ],
              ),
              appTheme.spacedSizedBox.big,
              Text(
                S.current.thankYouTitle,
                style: typography.title,
              ),
              appTheme.spacedSizedBox.regular,
              Text(S.current.thankYou),
              appTheme.spacedSizedBox.big,
            ],
          ),
        ),
        appTheme.spacedSizedBox.big,
        const Divider(),
        appTheme.spacedSizedBox.semiBig,
        Padding(
          padding: const EdgeInsets.only(left: 14.0),
          child: Text(
            'Copyright © 2019-${DateTime.now().year} Anton Malofeev (Arenukvern)',
          ),
        ),
        appTheme.spacedSizedBox.semiBig,
        Padding(
          padding: const EdgeInsets.only(left: 4.0),
          child: Wrap(
            crossAxisAlignment: WrapCrossAlignment.center,
            spacing: 8,
            children: [
              UrlButton(
                text: S.current.privacyPolicy,
                url: privacyPolicyLink,
              ),
              const _TextDivider(),
              UrlButton(
                text: S.current.termsOfUse,
                url: termsOfUseLink,
              ),
              const _TextDivider(),
              const UrlButton(
                text: 'Made with Flutter & ❤',
              ),
            ],
          ),
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

class _TextDivider extends StatelessWidget {
  const _TextDivider({super.key});

  @override
  Widget build(final BuildContext context) {
    final theme = FluentTheme.of(context);
    final typography = theme.typography;
    return Text(
      '|',
      style: typography.body?.copyWith(
        color: theme.activeColor.withOpacity(0.2),
      ),
    );
  }
}

class UrlButton extends StatelessWidget {
  const UrlButton({required this.text, this.url, super.key});
  final String text;
  final String? url;
  @override
  Widget build(final BuildContext context) {
    final url = this.url;

    return TextButton(
      onPressed: url == null ? null : () async => launchUrl(url),
      child: Text(text),
    );
  }
}
