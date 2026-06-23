'use client'

import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { IoDesktop, IoMoon, IoSunny } from 'react-icons/io5'

const options = [
	{ value: 'light', labelKey: 'light', icon: IoSunny },
	{ value: 'dark', labelKey: 'dark', icon: IoMoon },
	{ value: 'system', labelKey: 'system', icon: IoDesktop },
]

const ThemeSwitcher = ({ className }) => {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()
	const t = useTranslations('theme')

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return <div className={`theme-switcher ${className ?? ''}`} aria-hidden='true' />
	}

	return (
		<fieldset className={`theme-switcher ${className ?? ''}`}>
			<legend className='sr-only'>{t('legend')}</legend>
			{options.map(option => {
				const Icon = option.icon
				const active = theme === option.value
				const label = t(option.labelKey)

				return (
					<button
						key={option.value}
						type='button'
						className='icon-button'
						aria-label={label}
						aria-pressed={active}
						title={label}
						onClick={() => setTheme(option.value)}
					>
						<Icon />
					</button>
				)
			})}
		</fieldset>
	)
}

export default ThemeSwitcher
