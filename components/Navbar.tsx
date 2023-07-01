import { UserButton } from '@clerk/nextjs'
import { MainNav } from './MainNav'
import { StoreSwitcher } from './StoreSwitcher'

export const Navbar = async () => {
	const stores = await fetch(`${process.env.API_URL}/stores`).then(res =>
		res.json()
	)
	return (
		<div className="border-b">
			<div className="flex h-16 items-center px-4">
				<StoreSwitcher items={stores} />
				<MainNav className="mx-6" />
				<div className="ml-auto flex items-center space-x-4">
					<UserButton afterSignOutUrl="/" />
				</div>
			</div>
		</div>
	)
}
