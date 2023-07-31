import { authOptions } from '@/configs/auth'
import axios from '@/configs/axios'
import { getServerSession } from 'next-auth'
import { MainNav } from './main-nav'
import { StoreSwitcher } from './store-switcher'
import { ThemeToggle } from './theme-toggle'
import { UserNav } from './user-nav'

async function getStores() {
	try {
		const { data: stores } = await axios('/stores')

		if (!stores.length) {
			throw new Error('Failed to fetch data')
		}

		return stores
	} catch (error) {
		console.log(error)
	}
}

export const Navbar = async () => {
	const stores = await getStores()
	const session = await getServerSession(authOptions)

	return (
		<div className="border-b">
			<div className="flex h-16 items-center px-4">
				<StoreSwitcher stores={stores} />
				<MainNav className="mx-6" />
				<div className="ml-auto flex items-center gap-4">
					<ThemeToggle />
					<UserNav user={session?.user} />
				</div>
			</div>
		</div>
	)
}
