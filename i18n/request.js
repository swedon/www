import { getRequestConfig } from 'next-intl/server'
import { defaultLocale, normalizeLocale } from './locales'
import { getMessages } from './messages'

export default getRequestConfig(async ({ requestLocale }) => {
	const locale = normalizeLocale((await requestLocale) ?? defaultLocale)

	return {
		locale,
		messages: getMessages(locale),
	}
})
