import { Navbar } from '@/components/Navbar'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: { storeId: string }
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
			}
		}
	} catch (error) {
		console.error('Error fetching store:', error)
		redirect('/')
	}

	return (
		<>
			<Navbar />
			{children}
		</>
	)
}
