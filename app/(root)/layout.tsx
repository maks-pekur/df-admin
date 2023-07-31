import { authOptions } from '@/configs/auth'
import axios from '@/configs/axios'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function SetupLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(authOptions)

	if (!session) {
		redirect('/sign-in')
	}

	const { data: stores } = await axios('/stores')

	if (stores) {
		redirect(`/${stores[0].id}/`)
	}

	return <>{children}</>
}
