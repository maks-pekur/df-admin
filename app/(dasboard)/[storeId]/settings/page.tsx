import { Container } from '@/components/Container'
import { SettingsForm } from '@/components/SettingsForm'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

interface SettingsPageProps {
	params: {
		storeId: string
	}
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
	const { userId } = auth()

	if (!userId) {
		redirect('/sign-in')
	}

	const store = await fetch(`http://localhost:8888/api/stores/${userId}`).then(
		res => res.json()
	)

	if (!store) {
		redirect('/')
	}
	return (
		<Container>
			<SettingsForm initialData={store} />
		</Container>
	)
}

export default SettingsPage
