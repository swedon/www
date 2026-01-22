import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter } from 'next/font/google'
import '@/style/globals.css'

import ThemeProvider from '@/components/ThemeProvider'
import ThemeClassSync from '@/components/ThemeClassSync'
import ParticleEffect from '@/components/ParticleEffect'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'SWEDON',
	description: 'SWEDON Gaming Community',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className='min-h-screen mx-auto flex flex-col w-auto'>
				<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
				<ThemeProvider>
					<ThemeClassSync />
					<ParticleEffect className='fixed inset-0 m-0 p-0 z-0 pointer-events-none' />
					<div className='relative z-10'>
						<Navbar />
					</div>
					<main className={`relative z-10 flex flex-col flex-1 w-full ${inter.className}`}>
						<div className='mx-auto w-full max-w-5xl px-4 py-8'>{children}</div>
					</main>
					<div className='relative z-10'>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	)
}
