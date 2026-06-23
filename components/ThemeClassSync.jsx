'use client'

import { useTheme } from 'next-themes'
import { useEffect } from 'react'

export default function ThemeClassSync() {
	const { resolvedTheme } = useTheme()

	useEffect(() => {
		if (typeof document === 'undefined') return
		if (resolvedTheme !== 'dark' && resolvedTheme !== 'light') return

		const root = document.documentElement
		root.classList.remove('dark', 'light')
		root.classList.add(resolvedTheme)
	}, [resolvedTheme])

	return null
}
