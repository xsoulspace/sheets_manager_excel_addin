import { LangFile } from './Languages'

export const eng: LangFile = {
	introTour: {
		'header-help': {
			title: 'Welcome to Sheet Manager!',
			content: `This tutorial will helps you underastand 
			how this addin works - and will always available at 
			this Question Button.
			We temporary switched to test data to show how it works. 
			By the end of tutorial we will show up Excel sheets.`,
		},
		'header-sync': {
			title: 'Sync button',
			content: `Important! Any changes in addin are mirroring to Excel automaticly.  
			But, in case if you change something in Excel and doesn't see it in addin 
			you can simply click on this Sync Button to synchronize addin and Excel`,
		},
		'header-info': {
			title: 'Additional info',
			content: `чтобы написать, если что-то не работает или есть идея`,
		},
		'header-search': {
			title: 'Search field',
			content: `ищет по названиям листов`,
		},
		'header-settings': {
			title: 'Settings',
			content: `для добавления нумерации, переключения темы и т.д. больше - по значку вопроса в настройках`,
		},
		'item-whole': {
			title: 'This is a sheet',
			content: `simply drag and drop the sheet to change its position `,
		},
		'item-color': {
			title: 'Sheet tab color',
			content: `click to change it`,
			placement: 'right',
		},
		'item-name': {
			title: 'Sheet name',
			content: `to change - click twice on its name`,
		},
		'item-numeration': {
			title: 'Sheet tab position',
			content: `current position number - you can switch visibility in settings`,
		},
	},
	settings: {
		header: 'Settings',
		chooseLanguage: 'Language',
		darkTheme: 'Dark theme',
		sheetsNumerationEnabled: 'Sheet numeration (all sheets will numerated)',
		showNumeration: 'Show positions',
		settingsOnStart: 'Settings when addin loaded',
		openIntroTutorial: 'Open intro tutorial',
		tryToRecoverNumeration: 'Try to recover numeration',
	},
	item: {
		nameCannotBeEmpty: 'Name cannot be empty!'
	},
	brokenNumeration: {
		header: 'Восстановление нумерации',
		whatWeFound: 'We noticed that sheets may have numeration.',
		tryToRecover: 'Try to recover numeration? Warning! All Sheets will be numerated!'
	},
	buttons: {
		yes: 'Yes',
		no: 'No',
		skipTutorial: 'Skip tutorial',
        previousStep: 'Previous',
        nextStep: 'Next',
        finishTour: 'Finish',
	},
	alerts: {
		successfulSync: 'Synced successfully!', 
		successfulSheetsLoad: 'Sheets successfully loaded!',
		successfulSheetsRecover: 'Sheets numeration was successfully recovered!',
		introTutorialCompleted: 'Intro Tutorial passed!',
		activated: 'is on',
        deactivated: 'is off',
        numerationRecover: 'Numeration recover on start',
        onOpenTutorial: 'Open tutorial on start',
        numeration: 'Sheets numeration',
        numerationVisibility: 'Numeration visbility'
    }
}
