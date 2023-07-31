'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Heading } from '../heading'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

export const ProductsPageClient = () => {
	const params = useParams()
	const router = useRouter()
	return (
		<>
			<div className="flex items-center justify-between space-x-2">
				<Heading title="Товари" description="Керуй товарами свого магазину" />
				<Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
					<Plus />
					Додати товар
				</Button>
			</div>
			<Separator />
		</>
	)
}
