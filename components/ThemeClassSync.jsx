'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'

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
