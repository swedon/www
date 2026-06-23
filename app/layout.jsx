import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter } from 'next/font/google'
import '@/style/globals.css'

import ThemeClassSync from '@/components/ThemeClassSync'
import ThemeProvider from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })
const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

export const metadata = {
	title: 'SWEDON',
	description: 'SWEDON Discord-community',
}

export default function RootLayout({ children }) {
	return (
		<html lang='sv' suppressHydrationWarning>
			<body className={inter.className}>
				{googleAnalyticsId && <GoogleAnalytics gaId={googleAnalyticsId} />}
				<ThemeProvider>
					<ThemeClassSync />
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
