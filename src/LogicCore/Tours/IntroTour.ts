import { i18n } from '@/main'
import { TourInterface, LangFile } from '../Languages/Languages'

export const introTour = () => {
	const locale = i18n.locale
	const messages = <LangFile>i18n.messages[locale]

	let tour: TourInterface[] = []
	for (let [key, message] of Object.entries(messages.introTour)) {
		const step: TourInterface = {
			target: `[data-v-step=${key}]`,
			header: {
				title: message.title,
			},
			content: message.content,
		}
		if (message.placement) {
			step.params = step.params ? step.params : (step.params = {})
			step.params.placement = message.placement
		}
		tour.push(step)
	}
	return tour
}
