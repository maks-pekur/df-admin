import axios from 'axios'

import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'

interface ProductPageProps {
	params: {
		storeId: string
		id: string
	}
}

async function getData(id: string) {
	const res = await axios(`${process.env.API_URL}/products/${id}`)
	return res.data
}

const UpdateProductPage: React.FC<ProductPageProps> = async ({ params }) => {
	const product = await getData(params.id)

	return (
		<Container>
			{!product ? (
				<div className="flex items-center justify-center">
					Product not found
				</div>
			) : (
				<div>
					<Heading title="Оновлення товару" description="" />
				</div>
			)}
		</Container>
	)
}

export default UpdateProductPage
