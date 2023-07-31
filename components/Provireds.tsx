'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useEffect, useState } from 'react'
import { StoreModal } from './modals/storeModal'
import { Toaster } from './ui/toaster'

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const [mounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!mounted) {
		return null
	}
	return (
		<>
			<SessionProvider>
				<NextThemesProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
				>
					<StoreModal />
					{children}
					<Toaster />
				</NextThemesProvider>
			</SessionProvider>
		</>
	)
}
