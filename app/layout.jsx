import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter } from 'next/font/google'
import '@/style/globals.css'

import ThemeProvider from '@/components/ThemeProvider'
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
		<html lang='en'>
			<body className='min-h-screen mx-auto flex flex-col w-auto'>
				<GoogleAnalytics gaId="G-88BNTNNS69" />
				<ThemeProvider>
					<ParticleEffect className='fixed h-full w-full top-0 left-0 m-0 p-0 -z-10' />
					<Navbar />
					<main className={`flex flex-col flex-1 w-full ${inter.className}`}>{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	)
}
