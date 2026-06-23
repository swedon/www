'use client'

import { useEffect, useRef } from 'react'
import useBackgroundAnimation from './useBackgroundAnimation'

const SYMBOLS = 'SWEDON01{}[]<>/\\|+=#@$%&'

function getTheme() {
	if (typeof document === 'undefined') return 'dark'
	return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export default function MatrixBackground() {
	const canvasRef = useRef(null)
	const { enabled } = useBackgroundAnimation()

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const context = canvas.getContext('2d')
		let animationFrame = 0
		let columns = []
		let width = 0
		let height = 0
		let lastTick = 0
		const fontSize = 18

		function resize() {
			const pixelRatio = window.devicePixelRatio || 1
			width = window.innerWidth
			height = window.innerHeight
			canvas.width = Math.floor(width * pixelRatio)
			canvas.height = Math.floor(height * pixelRatio)
			canvas.style.width = `${width}px`
			canvas.style.height = `${height}px`
			context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
			columns = Array.from({ length: Math.ceil(width / fontSize) }, () => Math.random() * -height)
		}

		function draw(timestamp) {
			if (!enabled) {
				context.clearRect(0, 0, width, height)
				return
			}

			const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
			const interval = reducedMotion ? 180 : 52
			if (timestamp - lastTick < interval) {
				animationFrame = window.requestAnimationFrame(draw)
				return
			}

			lastTick = timestamp
			const theme = getTheme()
			context.fillStyle = theme === 'dark' ? 'rgba(0, 0, 0, 0.16)' : 'rgba(255, 255, 255, 0.22)'
			context.fillRect(0, 0, width, height)
			context.font = `${fontSize}px "Roboto Condensed", monospace`
			context.textBaseline = 'top'

			columns.forEach((position, index) => {
				const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
				const x = index * fontSize
				const glow = Math.max(0.2, 1 - position / height)
				context.fillStyle = theme === 'dark' ? `rgba(255, 255, 255, ${0.12 + glow * 0.38})` : `rgba(0, 0, 0, ${0.08 + glow * 0.24})`
				context.fillText(symbol, x, position)

				columns[index] = position > height + Math.random() * 900 ? Math.random() * -180 : position + fontSize
			})

			animationFrame = window.requestAnimationFrame(draw)
		}

		resize()
		window.addEventListener('resize', resize)
		animationFrame = window.requestAnimationFrame(draw)

		return () => {
			window.cancelAnimationFrame(animationFrame)
			window.removeEventListener('resize', resize)
		}
	}, [enabled])

	return <canvas ref={canvasRef} className='pointer-events-none fixed inset-0 z-0 h-full w-full opacity-80' />
}
