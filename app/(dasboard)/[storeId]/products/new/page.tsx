'use client'
import { Container } from '@/components/container'
import { Heading } from '@/components/heading'
import { ProductForm } from '@/components/products/product-form'
import { Separator } from '@/components/ui/separator'

interface ProductsPageProps {
	params: {
		storeId: string
	}
}

async function getCategories() {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		console.log(error)
	}
}

const AddProductsPage: React.FC<ProductsPageProps> = async ({ params }) => {
	const categories = await getCategories()
	return (
		<Container>
			
			<ProductForm categories={categories} />
		</Container>
	)
}

export default AddProductsPage
