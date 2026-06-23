import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import LandingPage from '@/components/LandingPage'
import SiteIntlProvider from '@/components/SiteIntlProvider'
import { defaultLocale } from '@/i18n/locales'
import { getMessages } from '@/i18n/messages'

export default function Home() {
	setRequestLocale(defaultLocale)

	return (
		<NextIntlClientProvider locale={defaultLocale} messages={getMessages(defaultLocale)}>
			<SiteIntlProvider initialLocale={defaultLocale}>
				<LandingPage />
			</SiteIntlProvider>
		</NextIntlClientProvider>
	)
}
