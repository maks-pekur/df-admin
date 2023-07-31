'use client'
import { formatter } from '@/lib/utils'
import { ICustomer, IOrder } from '@/types'
import { Avatar, AvatarFallback } from '../ui/avatar'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card'

interface LastOrdersProps {
	orders: IOrder[]
	customers: ICustomer[]
}

export const LastSales = ({ orders, customers }: LastOrdersProps) => {
	return (
		<Card className="col-span-3 relative">
			<CardHeader>
				<CardTitle>Останні замовлення</CardTitle>
				<CardDescription>
					{orders.length
						? `В цьому місяці ${orders.length} ${
								orders.length <= 4 ? 'замовлення' : 'замовлень'
						  }.`
						: 'Наразі данні відсутні'}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-8">
					{orders &&
						[...orders]
							.sort((a, b) => b.createdAt - a.createdAt)
							.slice(0, 5)
							.map(order => {
								const customer = customers.find(c => c.id === order.customerId)

								return (
									<div key={order.id} className="flex items-center">
										<Avatar className="h-9 w-9">
											<AvatarFallback>OM</AvatarFallback>
										</Avatar>
										<div className="ml-4 space-y-1">
											<p className="text-sm font-medium leading-none">
												{customer && customer.name}
											</p>
											<p className="text-sm text-muted-foreground">
												{customer && customer.email}
											</p>
										</div>
										<div className="ml-auto font-medium">
											+{formatter.format(Number(order.totalPrice))}
										</div>
									</div>
								)
							})}
				</div>
			</CardContent>
		</Card>
	)
}
