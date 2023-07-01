'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

export const MainNav = ({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) => {
	const pathname = usePathname()
	const params = useParams()

	const routes = [
		{
			href: `/${params.storeId}/`,
			label: 'Головна',
			active: pathname === `/${params.storeId}`,
		},
		{
			href: `/${params.storeId}/products`,
			label: 'Товари',
			active: pathname === `/${params.storeId}/products`,
		},
		{
			href: `/${params.storeId}/settings`,
			label: 'Налаштування',
			active: pathname === `/${params.storeId}/settings`,
		},
	]
	return (
		<nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
			{routes.map(route => (
				<Link
					href={route.href}
					key={route.label}
					className={cn(
						'text-sm font-medium transition-colors hover:text-primary',
						route.active
							? 'text-black dark:text-white'
							: 'text-muted-foreground'
					)}
				>
					{route.label}
				</Link>
			))}
		</nav>
	)
}
