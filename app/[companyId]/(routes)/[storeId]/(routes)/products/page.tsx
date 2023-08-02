import { Container } from '@/components/container'
import { ProductsPageClient } from '@/components/products/products-page-client'
import { DataTable } from '@/components/ui/data-table'
import { columns } from '../../../../../../components/products/columns'

interface ProductsPageProps {
	params: {
		storeId: string
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

const ProductsPage: React.FC<ProductsPageProps> = async ({ params }) => {
	const products = await getProducts()

	return (
		<Container>
			<ProductsPageClient />
			<DataTable searchKey="name" columns={columns} data={products || []} />
		</Container>
	)
}

export default ProductsPage
