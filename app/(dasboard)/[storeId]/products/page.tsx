import axios from 'axios'

import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { DataTable } from '@/components/ui/data-table'
import { columns } from '../../../../components/products/columns'

interface ProductsPageProps {
	params: {
		storeId: string
	}
}

async function getData() {
	try {
		const res = await axios(`${process.env.API_URL}/products/`)
		return res.data
	} catch (error) {
		console.log(error)
	}
}

const ProductsPage: React.FC<ProductsPageProps> = async ({ params }) => {
	const data = await getData()

	return (
		<Container>
			{data ? (
				<>
					<Heading title="Products" description="" />
					<DataTable searchKey="name" columns={columns} data={data} />
				</>
			) : (
				<div className="flex items-center justify-center">
					Products not found
				</div>
			)}
		</Container>
	)
}

export default ProductsPage
