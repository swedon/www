'use client'

import { useLocale, useTranslations } from 'next-intl'
import { locales } from '@/i18n/locales'
import { useSiteLocale } from './SiteLocaleContext'

function SwedishFlagIcon() {
	const t = useTranslations('languageSwitch')

	return (
		<svg className='flag-icon' viewBox='0 0 28 20' role='img' aria-label={t('swedishFlag')}>
			<rect width='28' height='20' fill='#006aa7' />
			<path fill='#fecc02' d='M8 0h4v20H8zM0 8h28v4H0z' />
		</svg>
	)
}

function EnglishFlagIcon() {
	const t = useTranslations('languageSwitch')

	return (
		<svg className='flag-icon' viewBox='0 0 28 20' role='img' aria-label={t('englishFlag')}>
			<rect width='28' height='20' fill='#012169' />
			<path stroke='#fff' strokeWidth='4' d='m0 0 28 20M28 0 0 20' />
			<path stroke='#c8102e' strokeWidth='2.4' d='m0 0 28 20M28 0 0 20' />
			<path stroke='#fff' strokeWidth='6.6' d='M14 0v20M0 10h28' />
			<path stroke='#c8102e' strokeWidth='4' d='M14 0v20M0 10h28' />
		</svg>
	)
}

const flagIcons = {
	sv: SwedishFlagIcon,
	en: EnglishFlagIcon,
}

export default function LanguageSwitcher() {
	const locale = useLocale()
	const { setLocale } = useSiteLocale()
	const t = useTranslations('languageSwitch')

	function switchLocale(nextLocale) {
		if (nextLocale === locale) return
		setLocale(nextLocale)
	}

	return (
		<fieldset className='language-switcher'>
			<legend className='sr-only'>{t('label')}</legend>
			{locales.map(option => {
				const active = locale === option
				const label = option === 'sv' ? t('switchToSwedish') : t('switchToEnglish')
				const FlagIcon = flagIcons[option]

				return (
					<button
						key={option}
						type='button'
						className='language-button'
						aria-label={label}
						aria-pressed={active}
						title={label}
						onClick={() => switchLocale(option)}
					>
						<FlagIcon />
						<span>{t(option)}</span>
					</button>
				)
			})}
		</fieldset>
	)
}
