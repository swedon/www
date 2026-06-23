'use client'

import { NextIntlClientProvider } from 'next-intl'
import { useEffect, useState } from 'react'
import { defaultLocale, normalizeLocale } from '@/i18n/locales'
import { getMessages } from '@/i18n/messages'
import { SiteLocaleContext } from './SiteLocaleContext'

const storageKey = 'swedon-locale'

export default function SiteIntlProvider({ children, initialLocale = defaultLocale }) {
	const [locale, setLocaleState] = useState(normalizeLocale(initialLocale))

	useEffect(() => {
		const pathnameLocale = window.location.pathname.split('/').filter(Boolean)[0]
		if (pathnameLocale === 'en' || pathnameLocale === 'sv') {
			localStorage.setItem(storageKey, pathnameLocale)
			setLocaleState(pathnameLocale)
			return
		}

		const storedLocale = localStorage.getItem(storageKey)
		if (storedLocale) setLocaleState(normalizeLocale(storedLocale))
	}, [])

	function setLocale(nextLocale) {
		const normalizedLocale = normalizeLocale(nextLocale)
		setLocaleState(normalizedLocale)
		localStorage.setItem(storageKey, normalizedLocale)
	}

	return (
		<SiteLocaleContext.Provider value={{ locale, setLocale }}>
			<NextIntlClientProvider locale={locale} messages={getMessages(locale)}>
				{children}
			</NextIntlClientProvider>
		</SiteLocaleContext.Provider>
	)
}
