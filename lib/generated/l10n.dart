// GENERATED CODE - DO NOT MODIFY BY HAND
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'intl/messages_all.dart';

// **************************************************************************
// Generator: Flutter Intl IDE plugin
// Made by Localizely
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, lines_longer_than_80_chars
// ignore_for_file: join_return_with_assignment, prefer_final_in_for_each
// ignore_for_file: avoid_redundant_argument_values, avoid_escaping_inner_quotes

class S {
  S();

  static S? _current;

  static S get current {
    assert(_current != null,
        'No instance of S was loaded. Try to initialize the S delegate before accessing S.current.');
    return _current!;
  }

  static const AppLocalizationDelegate delegate = AppLocalizationDelegate();

  static Future<S> load(Locale locale) {
    final name = (locale.countryCode?.isEmpty ?? false)
        ? locale.languageCode
        : locale.toString();
    final localeName = Intl.canonicalizedLocale(name);
    return initializeMessages(localeName).then((_) {
      Intl.defaultLocale = localeName;
      final instance = S();
      S._current = instance;

      return instance;
    });
  }

  static S of(BuildContext context) {
    final instance = S.maybeOf(context);
    assert(instance != null,
        'No instance of S present in the widget tree. Did you add S.delegate in localizationsDelegates?');
    return instance!;
  }

  static S? maybeOf(BuildContext context) {
    return Localizations.of<S>(context, S);
  }

  /// `Language`
  String get language {
    return Intl.message(
      'Language',
      name: 'language',
      desc: '',
      args: [],
    );
  }

  /// `Appearance`
  String get appearance {
    return Intl.message(
      'Appearance',
      name: 'appearance',
      desc: '',
      args: [],
    );
  }

  /// `Settings`
  String get settings {
    return Intl.message(
      'Settings',
      name: 'settings',
      desc: '',
      args: [],
    );
  }

  /// `About`
  String get about {
    return Intl.message(
      'About',
      name: 'about',
      desc: '',
      args: [],
    );
  }

  /// `System`
  String get appearanceSystem {
    return Intl.message(
      'System',
      name: 'appearanceSystem',
      desc: '',
      args: [],
    );
  }

  /// `Light`
  String get appearanceLight {
    return Intl.message(
      'Light',
      name: 'appearanceLight',
      desc: '',
      args: [],
    );
  }

  /// `Dark`
  String get appearanceDark {
    return Intl.message(
      'Dark',
      name: 'appearanceDark',
      desc: '',
      args: [],
    );
  }

  /// `Thank you for using this addin, your support and have a great day! 🌄  `
  String get thankYou {
    return Intl.message(
      'Thank you for using this addin, your support and have a great day! 🌄  ',
      name: 'thankYou',
      desc: '',
      args: [],
    );
  }

  /// `Thank you!`
  String get thankYouTitle {
    return Intl.message(
      'Thank you!',
      name: 'thankYouTitle',
      desc: '',
      args: [],
    );
  }

  /// `Donations / Sponsor`
  String get donations {
    return Intl.message(
      'Donations / Sponsor',
      name: 'donations',
      desc: '',
      args: [],
    );
  }

  /// `Please sponsor or donate to the creator on`
  String get considerSponsor {
    return Intl.message(
      'Please sponsor or donate to the creator on',
      name: 'considerSponsor',
      desc: '',
      args: [],
    );
  }

  /// `or`
  String get or {
    return Intl.message(
      'or',
      name: 'or',
      desc: '',
      args: [],
    );
  }

  /// `If you need help getting started or have any questions, check out our`
  String get gettingHelp {
    return Intl.message(
      'If you need help getting started or have any questions, check out our',
      name: 'gettingHelp',
      desc: '',
      args: [],
    );
  }

  /// `Getting Help`
  String get gettingHelpTitle {
    return Intl.message(
      'Getting Help',
      name: 'gettingHelpTitle',
      desc: '',
      args: [],
    );
  }

  /// `Contributing`
  String get contributingTitle {
    return Intl.message(
      'Contributing',
      name: 'contributingTitle',
      desc: '',
      args: [],
    );
  }

  /// `All `
  String get all {
    return Intl.message(
      'All ',
      name: 'all',
      desc: '',
      args: [],
    );
  }

  /// `and `
  String get and {
    return Intl.message(
      'and ',
      name: 'and',
      desc: '',
      args: [],
    );
  }

  /// `are welcome.`
  String get areWelcome {
    return Intl.message(
      'are welcome.',
      name: 'areWelcome',
      desc: '',
      args: [],
    );
  }

  /// `Privacy Policy`
  String get privacyPolicy {
    return Intl.message(
      'Privacy Policy',
      name: 'privacyPolicy',
      desc: '',
      args: [],
    );
  }

  /// `Terms of Use`
  String get termsOfUse {
    return Intl.message(
      'Terms of Use',
      name: 'termsOfUse',
      desc: '',
      args: [],
    );
  }

  /// `The primary purpose of this addin is to manage Worksheets in Excel Workbook in the most efficient way.`
  String get purpose {
    return Intl.message(
      'The primary purpose of this addin is to manage Worksheets in Excel Workbook in the most efficient way.',
      name: 'purpose',
      desc: '',
      args: [],
    );
  }

  /// `This is Open Source Software. It means you can see the source code and contribute - and because of that`
  String get oss {
    return Intl.message(
      'This is Open Source Software. It means you can see the source code and contribute - and because of that',
      name: 'oss',
      desc: '',
      args: [],
    );
  }

  /// `Community Contributors`
  String get contributors {
    return Intl.message(
      'Community Contributors',
      name: 'contributors',
      desc: '',
      args: [],
    );
  }
}

class AppLocalizationDelegate extends LocalizationsDelegate<S> {
  const AppLocalizationDelegate();

  List<Locale> get supportedLocales {
    return const <Locale>[
      Locale.fromSubtags(languageCode: 'en'),
      Locale.fromSubtags(languageCode: 'it'),
      Locale.fromSubtags(languageCode: 'ru'),
    ];
  }

  @override
  bool isSupported(Locale locale) => _isSupported(locale);
  @override
  Future<S> load(Locale locale) => S.load(locale);
  @override
  bool shouldReload(AppLocalizationDelegate old) => false;

  bool _isSupported(Locale locale) {
    for (var supportedLocale in supportedLocales) {
      if (supportedLocale.languageCode == locale.languageCode) {
        return true;
      }
    }
    return false;
  }
}
