import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function SetupLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { userId } = auth()

	if (!userId) {
		redirect('/sign-in')
	}

	const res = await fetch(`${process.env.API_URL}/stores/${userId}`)
	const store = await res.json()

	console.log(store)

	// if (store) {
	// 	redirect(`/${store.id}`)
	// }

	return <>{children}</>
}
