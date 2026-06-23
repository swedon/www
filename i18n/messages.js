import en from '@/messages/en.json'
import sv from '@/messages/sv.json'
import { defaultLocale, normalizeLocale } from './locales'

const messages = { en, sv }

export function getMessages(locale = defaultLocale) {
	return messages[normalizeLocale(locale)]
}
