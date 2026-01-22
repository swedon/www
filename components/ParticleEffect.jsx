'use client'

import { useState, useEffect, useMemo } from 'react'
import { useTheme } from 'next-themes'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadFull } from 'tsparticles'

import logoWhite from '@/public/s-logo-white.svg'
import logoBlack from '@/public/s-logo-black.svg'

import particlesOptions from '@/style/particles.json'
import useBackgroundAnimation from './useBackgroundAnimation'

function ParticleEffect({ children, className }) {
	const [engineReady, setEngineReady] = useState(false)
	const { enabled } = useBackgroundAnimation()
	const { systemTheme, theme } = useTheme()
	const currentTheme = theme === 'system' ? systemTheme : theme
	const logo = currentTheme === 'dark' ? logoWhite.src : logoBlack.src
	const color = currentTheme === 'dark' ? '#f1f3f5' : '#23272A'

	const options = useMemo(() => {
		const _options = JSON.parse(JSON.stringify(particlesOptions))
		_options.particles.color = color
		_options.emitters.color = color
		_options.particles.links.color = color
		_options.particles.shape.options.images.src = logo
		_options.emitters.particles.shape.options.images.src = logo
		return _options
	}, [logo, color])

	useEffect(() => {
		let cancelled = false
		initParticlesEngine(async engine => {
			await loadFull(engine)
		}).then(() => {
			if (!cancelled) setEngineReady(true)
		})

		return () => {
			cancelled = true
		}
	}, [])

	if (!engineReady) {
		return <>{children}</>
	}

	if (!enabled) {
		return null
	}

	return (
		<Particles data-testid='tsparticles' id='tsparticles' className={className} options={options} rel='preload' priority transform-gpu>
			{children}
		</Particles>
	)
}

export default ParticleEffect
