/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'dodopizza-a.akamaihd.net',
			},
			{
				protocol: 'https',
				hostname: 'prontopizza.ua',
			},
		],
	},
}

module.exports = nextConfig
