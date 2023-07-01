'use client'

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
			<StoreModal />
			{children}
			<Toaster />
		</>
	)
}
