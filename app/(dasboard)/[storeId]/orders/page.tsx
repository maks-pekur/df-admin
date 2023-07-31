'use client'
import { Container } from '@/components/container'
import { Heading } from '@/components/heading'
import { OrderColumn, columns } from '@/components/orders/columns'
import { DataTable } from '@/components/ui/data-table'
import { Separator } from '@/components/ui/separator'
import { formatTimestamp, formatter } from '@/lib/utils'

interface OrdersPageProps {
	params: {
		storeId: string
	}
}

const OrdersPage: React.FC<OrdersPageProps> = async ({ params }) => {
	const orders: any[] = []
	const customers: any[] = []

	const formattedOrders: OrderColumn[] =
		!!orders &&
		orders.map(item => ({
			id: item.id,
			orderNumber: item.orderNumber,
			customer:
				customers.find((c: { id: string }) => c.id === item.customerId).name ||
				'',
			orderStatus: item.orderStatus,
			orderType: item.orderType,
			paymentMethodType: item.paymentMethodType,
			paymentStatus: item.paymentStatus,
			orderItems: item.orderItems
				.map((orderItem: { name: string }) => orderItem.name)
				.join(', '),
			totalPrice: formatter.format(item.totalPrice),
			createdAt: formatTimestamp(item.createdAt).formattedTime,
		}))

	return (
		<Container>
			<Heading
				title={`Замовлення (${orders.length})`}
				description="Керування замовленнями вашого магазину"
			/>
			<Separator />
			<DataTable
				searchKey="products"
				columns={columns}
				data={formattedOrders}
			/>
		</Container>
	)
}

export default OrdersPage
