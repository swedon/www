import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: 'export',
	images: {
		unoptimized: true,
	},
	basePath: '',
	crossOrigin: 'anonymous',
}

export default withNextIntl(nextConfig)
