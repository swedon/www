export const locales = ['sv', 'en']
export const defaultLocale = 'sv'

export function isLocale(locale) {
	return locales.includes(locale)
}

export function normalizeLocale(locale) {
	return isLocale(locale) ? locale : defaultLocale
}
