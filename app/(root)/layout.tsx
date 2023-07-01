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

	try {
		const response = await fetch(`${process.env.API_URL}/stores/${userId}`)
		if (!response.ok) {
			console.error(`HTTP error! status: ${response.status}`)
			redirect('/')
		} else {
			const text = await response.text()
			if (text) {
				const store = JSON.parse(text)
				if (store && Object.keys(store).length > 0) {
					redirect(`/${store.id}`)
				}
			}
		}
	} catch (error) {
		console.error('Error fetching store:', error)
		redirect('/')
	}

	return <>{children}</>
}
