'use client'

import { ThemeProvider } from 'next-themes'

const Provider = ({ children }) => {
	return (
		<ThemeProvider
			enableSystem={true}
			attribute='class'
			defaultTheme='system'
			disableTransitionOnChange
		>
			{children}
		</ThemeProvider>
	)
}

export default Provider
