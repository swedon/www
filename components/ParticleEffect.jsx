'use client'

import { useState, useEffect, useMemo } from 'react'
import { useTheme } from 'next-themes'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadFull } from 'tsparticles'

import logoWhite from '@/public/s-logo-white.svg'
import logoBlack from '@/public/s-logo-black.svg'

import particlesOptions from '@/style/particles.json'

function ParticleEffect({ children, className }) {
	const [mounted, setMounted] = useState(false)
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
		_options.particles.size.value = 25
		_options.emitters.particles.shape.options.images.src = logo
		_options.emitters.particles.size.value = 250
		return _options
	}, [logo, color])

	useEffect(() => {
		setMounted(true)
		const initEngine = initParticlesEngine(async engine => {
			await loadFull(engine)
		})
		if (initEngine) {
			initEngine.then(() => {
				setMounted(true)
			})
		}
	}, [])

	if (!mounted) {
		return <>{children}</>
	}

	return (
		<Particles data-testid='tsparticles' id='tsparticles' className={className} options={options} rel='preload' priority transform-gpu>
			{children}
		</Particles>
	)
}

export default ParticleEffect
