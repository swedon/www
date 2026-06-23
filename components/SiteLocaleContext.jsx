'use client'

import { createContext, useContext } from 'react'

export const SiteLocaleContext = createContext(null)

export function useSiteLocale() {
	const context = useContext(SiteLocaleContext)
	if (!context) throw new Error('useSiteLocale must be used inside SiteIntlProvider')
	return context
}
