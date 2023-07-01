import { Providers } from '@/components/Provireds'
import { ClerkProvider } from '@clerk/nextjs'
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
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<Providers>{children}</Providers>
				</body>
			</html>
		</ClerkProvider>
	)
}
