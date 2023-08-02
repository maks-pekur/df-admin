import { Container } from '@/components/container'
import { Heading } from '@/components/heading'

interface ProductPageProps {
	params: {
		storeId: string
		id: string
	}
}

async function getProducts() {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		console.log(error)
	}
}

const UpdateProductPage: React.FC<ProductPageProps> = async ({ params }) => {
	return (
		<Container>
			<Heading title="Оновлення товару" description="" />
		</Container>
	)
}

export default UpdateProductPage
