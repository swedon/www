'use client'

import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FaDiscord } from 'react-icons/fa'
import { IoMail } from 'react-icons/io5'
import logoBlack from '@/public/images/logo-black.png'
import logoWhite from '@/public/images/logo-white.png'
import BackgroundAnimationToggle from './BackgroundAnimationToggle'
import ContactModal from './ContactModal'
import HeartbeatLogo from './HeartbeatLogo'
import LanguageSwitcher from './LanguageSwitcher'
import MatrixBackground from './MatrixBackground'
import ThemeSwitcher from './ThemeSwitcher'

const discordInviteUrl = 'https://discord.gg/VrPBwWz'

function LandingPageContent({ initialContactOpen = false }) {
	const [contactOpen, setContactOpen] = useState(initialContactOpen)
	const [mounted, setMounted] = useState(false)
	const { resolvedTheme } = useTheme()
	const locale = useLocale()
	const landing = useTranslations('landing')
	const heartbeat = useTranslations('heartbeat')
	const logo = resolvedTheme === 'dark' ? logoWhite : logoBlack

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		document.documentElement.lang = locale
	}, [locale])

	const homeHref = locale === 'sv' ? '/' : `/${locale}`

	return (
		<>
			<MatrixBackground />
			<div className='site-shell'>
				<header className='topbar'>
					<a className='brand-mark' href={homeHref} aria-label={landing('brandStart')}>
						{mounted && <Image src={logo} alt='SWEDON' priority className='brand-logo' />}
					</a>
					<nav className='top-actions' aria-label={landing('primaryNavigation')}>
						<BackgroundAnimationToggle />
						<ThemeSwitcher />
						<button type='button' className='button ghost' onClick={() => setContactOpen(true)}>
							<IoMail />
							{landing('contact')}
						</button>
					</nav>
				</header>

				<main className='hero'>
					<HeartbeatLogo description={heartbeat('description')} />

					<div className='hero-actions'>
						<a className='button primary' href={discordInviteUrl}>
							<FaDiscord />
							{landing('joinDiscord')}
						</a>
						<button type='button' className='button secondary' onClick={() => setContactOpen(true)}>
							<IoMail />
							{landing('contactUs')}
						</button>
					</div>
				</main>

				<footer className='site-footer'>
					<p>{discordInviteUrl}</p>
					<span className='copyright'>&copy; {new Date().getFullYear()} SWEDON</span>
					<span>
						<LanguageSwitcher />
					</span>
				</footer>
			</div>
			<ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
		</>
	)
}

export default function LandingPage({ initialContactOpen = false }) {
	return <LandingPageContent initialContactOpen={initialContactOpen} />
}
