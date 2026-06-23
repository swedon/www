import Link from 'next/link'
import { NextIntlClientProvider, useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import MatrixBackground from '@/components/MatrixBackground'
import { defaultLocale } from '@/i18n/locales'
import { getMessages } from '@/i18n/messages'

function NotFoundContent() {
	const t = useTranslations('notFound')

	return (
		<main className='site-shell'>
			<MatrixBackground />
			<section className='hero'>
				<div className='hero-copy'>
					<p className='eyebrow'>404</p>
					<h1>{t('title')}</h1>
					<p className='lead'>{t('description')}</p>
					<Link href='/' className='button primary mt-8'>
						{t('home')}
					</Link>
				</div>
			</section>
		</main>
	)
}

export default function NotFound() {
	setRequestLocale(defaultLocale)

	return (
		<NextIntlClientProvider locale={defaultLocale} messages={getMessages(defaultLocale)}>
			<NotFoundContent />
		</NextIntlClientProvider>
	)
}
