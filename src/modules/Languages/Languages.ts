import { LocaleMessageObject, LocaleMessage } from 'vue-i18n';

export enum Languages{
    rus = 'rus',
    eng = 'eng'
}

export interface LocaleMessageInterface{
    [prop: string]: LocaleMessageInterface  | string
}

export interface TourLangInterface{
    [prop: string]: {
        title: string
        content: string
        placement?: string
    }
}
export interface TourInterface{
    target: string
    header: {
        title: string
    }
    content: string
    params?: {
        placement?: string
    }
}

export interface SettingsLangInterface extends LocaleMessageInterface {
    header: string
    chooseLanguage: string
    darkTheme: string
    sheetsNumerationEnabled: string
    showNumeration: string
    settingsOnStart: string
    openIntroTutorial: string
    tryToRecoverNumeration: string
    chooseColor: string
}

export interface AlertLangInterface extends LocaleMessageInterface{
    title: string
}
export interface AlertsLangInterface extends LocaleMessageInterface{

}


export interface LangFile extends LocaleMessageObject{
    introTour: TourLangInterface,
    settings: SettingsLangInterface
    item: {
        nameCannotBeEmpty: string
    }
    brokenNumeration: {
        header: string
        whatWeFound: string
        tryToRecover: string
    },
	buttons: {
		yes: string
        no: string
        skipTutorial: string
        previousStep: string
        nextStep: string
        finishTour: string
    }
    alerts: {
        successfulSync: string
        successfulSheetsLoad: string
        successfulSheetsRecover: string
        introTutorialCompleted: string
        activated: string
        deactivated: string
        numerationRecover: string
        onOpenTutorial: string
        numeration: string
        numerationVisibility: string
    }
}
