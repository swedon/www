import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import LandingPage from '@/components/LandingPage'
import SiteIntlProvider from '@/components/SiteIntlProvider'
import { isLocale, locales } from '@/i18n/locales'
import { getMessages } from '@/i18n/messages'

export function generateStaticParams() {
	return locales.map(locale => ({ locale }))
}

export const dynamicParams = false

export async function generateMetadata({ params }) {
	const { locale } = await params
	setRequestLocale(locale)
	const messages = getMessages(locale)

	return messages.metadata
}

export default async function LocaleContact({ params }) {
	const { locale } = await params
	if (!isLocale(locale)) notFound()
	setRequestLocale(locale)

	return (
		<NextIntlClientProvider locale={locale} messages={getMessages(locale)}>
			<SiteIntlProvider initialLocale={locale}>
				<LandingPage initialContactOpen />
			</SiteIntlProvider>
		</NextIntlClientProvider>
	)
}
