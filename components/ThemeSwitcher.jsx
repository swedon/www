import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { FaSun, FaMoon } from 'react-icons/fa'

const ThemeSwitcher = ({ children, className }) => {
	const [mounted, setMounted] = useState(false)
	const { systemTheme, theme, setTheme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	const currentTheme = theme === 'system' ? systemTheme : theme

	if (!mounted) {
		return <>{children}</>
	}

	if (currentTheme === 'dark') {
		return <FaSun className={`w-8 h-8 text-yellow-500 ${className}`} role='button' onClick={() => setTheme('light')} />
	}

	return <FaMoon className={`w-8 h-8 text-gray-900 ${className}`} role='button' onClick={() => setTheme('dark')} />
}

export default ThemeSwitcher
