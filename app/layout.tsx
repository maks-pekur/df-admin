import { Providers } from '@/components/provireds'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Admin Dashboard',
	description: 'Admin Dasboard',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={`${inter.className} min-h-screen`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
