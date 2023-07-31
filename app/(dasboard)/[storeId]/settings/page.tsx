import { Container } from '@/components/container'
import { SettingsForm } from '@/components/settings-form'

interface SettingsPageProps {
	params: {
		storeId: string
	}
}

async function getStore(storeId: string) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/stores/${storeId}`
		)

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		console.log(error)
	}
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
	const store = await getStore(params.storeId)
	return (
		<Container>
			<SettingsForm initialData={store} />
		</Container>
	)
}

export default SettingsPage
