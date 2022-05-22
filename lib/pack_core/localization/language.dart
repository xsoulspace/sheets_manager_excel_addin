part of pack_core;

class Locales {
  Locales._();
  static const en = Locale(Languages.en);
  static const ru = Locale(Languages.ru);
  static const it = Locale(Languages.it);
  static const ga = Locale(Languages.ga);
  static const values = <Locale>[en, ru, it];
}

typedef LanguageName = String;

class Languages {
  Languages._();
  static const ru = 'ru';
  static const en = 'en';
  static const it = 'it';
  static const ga = 'ga';
  static const values = <LanguageName>[ru, en, it, ga];
}

final Map<String, NamedLocale> namedLocalesMap = {
  Languages.en: const NamedLocale(
    name: 'English',
    locale: Locales.en,
  ),
  Languages.ru: const NamedLocale(
    name: 'Русский',
    locale: Locales.ru,
  ),
  Languages.it: const NamedLocale(
    name: 'Italian',
    locale: Locales.it,
  ),
};
