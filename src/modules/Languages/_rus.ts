import { LangFile } from './Languages'

export const rus: LangFile = {
  introTour: {
    'header-help': {
      title: 'Добро пожаловать в Sheet Manager!',
      content: `Это обучение поможет вам освоиться в программе - 
			и всегда будет доступно по выделенному сейчас значку вопроса. 
			Мы временно переключились на тестовые данные, 
			чтобы показать, как всё работает. 
			По оконачнии обучения будут загружены листы Excel`,
    },
    'header-sync': {
      title: 'Кнопка синхронизации',
      content: `Обратите внимание! Любые изменения, которые вы сделаете в addin - 
			автоматически синхронизируются с Excel. 
			Однако, если вы изменили что-то в Excel и не видите этого в addin - 
			просто нажмите эту кнопку синхронизцаии`,
    },
    'header-info': {
      title: 'Дополнительная информация',
      content: 'чтобы написать, если что-то не работает или есть идея',
    },
    'header-search': {
      title: 'Строка поиска',
      content: 'ищет по названиям листов',
    },
    'header-settings': {
      title: 'Настройки',
      content: 'для добавления нумерации, переключения темы и т.д.',
    },
    'item-whole': {
      title: 'Это лист',
      content: 'его позицию можно поменять, просто его перетянув (drag & drop)',
    },
    'item-color': {
      title: 'Цвет листа',
      content: 'можно менять по нажатию',
      placement: 'right',
    },
    'item-name': {
      title: 'Название листа',
      content: 'можно изменить дважды кликнув.',
    },
    'item-numeration': {
      title: 'Нумерация',
      content: 'номер листа по порядку - можно отключить в настройках',
    },
  },
  settings: {
    header: 'Настройки',
    chooseLanguage: 'Язык',
    darkTheme: 'Темная тема',
    sheetsNumerationEnabled:
      'Группировка листов (все листы будут пронумерованы)',
    showNumeration: 'Показать нумерацию',
    settingsOnStart: 'Настройки при открытии аддина',
    openIntroTutorial: 'Запускать обучение',
    tryToRecoverNumeration: 'Пробовать восстановить нумерацию',
    chooseColor: 'Выберите цвет',
  },
  item: {
    nameCannotBeEmpty: 'Название не может быть пустым!',
  },
  brokenNumeration: {
    header: 'Восстановление нумерации',
    whatWeFound: 'Мы обнаружили, что у листов возможно есть нумерация.',
    tryToRecover:
      'Попробовать восстановить нумерацию? Внимание! Все листы будут пронумерованы!',
  },
  buttons: {
    yes: 'Да',
    no: 'Нет',
    skipTutorial: 'Пропустить обучение',
    previousStep: 'Назад',
    nextStep: 'Дальше',
    finishTour: 'Завершить',
  },
  alerts: {
    successfulSync: 'Успешно синхронизировано!',
    successfulSheetsLoad: 'Листы успешно загружены!',
    successfulSheetsRecover: 'Нумерация успешно восстановлена!',
    introTutorialCompleted: 'Обучение пройдено!',
    activated: 'включен',
    deactivated: 'отключен',
    numerationRecover: 'Восставновление нумерации при открытии',
    onOpenTutorial: 'Обучение при открытии',
    numeration: 'Нумерация листов',
    numerationVisibility: 'Видимость нумерации',
  },
}
