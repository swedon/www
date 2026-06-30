import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.js')

const isGithubPages = process.env.GITHUB_ACTIONS === 'true'
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: 'export',
	images: {
		unoptimized: true,
	},
	trailingSlash: true,
	crossOrigin: 'anonymous',
	...(isGithubPages && {
		basePath: `/${repo}`,
		assetPrefix: `/${repo}/`,
	}),
}

export default withNextIntl(nextConfig)
