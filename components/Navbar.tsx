import { IStore } from '@/types'
import { MainNav } from './main-nav'
import { StoreSwitcher } from './store-switcher'
import { ThemeToggle } from './theme-toggle'
import { UserNav } from './user-nav'

interface NavbarProps {
	stores: IStore[]
}

export const Navbar = async ({ stores }: NavbarProps) => {
	return (
		<div className="border-b">
			<div className="flex h-16 items-center px-4">
				<StoreSwitcher stores={stores} />
				<MainNav className="mx-6" />
				<div className="ml-auto flex items-center gap-4">
					<ThemeToggle />
					<UserNav />
				</div>
			</div>
		</div>
	)
}
