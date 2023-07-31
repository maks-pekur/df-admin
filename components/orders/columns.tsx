'use client'

import { OrderColumn, orderStatus } from '@/types/order'
import { paymentMethod } from '@/types/payment'
import { ColumnDef } from '@tanstack/react-table'
import {
	BellRing,
	Car,
	CheckCircle,
	ChefHat,
	ConciergeBell,
	XCircle,
} from 'lucide-react'
import { Badge } from '../ui/badge'

const getOrderStatusBadge = (status: string) => {
	switch (status) {
		case orderStatus.PENDING:
			return (
				<Badge
					variant="default"
					className="bg-green-500 flex items-center gap-1 py-2 px-4"
				>
					<BellRing size={16} />
					Новий заказ
				</Badge>
			)
		case orderStatus.ACCEPTED:
			return (
				<Badge
					variant="default"
					className="bg-yellow-500 flex items-center gap-1 py-2 px-4"
				>
					Подтвержден
				</Badge>
			)
		case orderStatus.PREPARING:
			return (
				<Badge
					variant="default"
					className="bg-orange-500 flex items-center gap-1 py-2 px-4"
				>
					<ChefHat size={16} />
					Готовится
				</Badge>
			)
		case orderStatus.READY:
			return (
				<Badge
					variant="default"
					className="bg-gray-500 flex items-center gap-1 py-2 px-4"
				>
					<ConciergeBell size={16} />
					Приготовлен
				</Badge>
			)
		case orderStatus.DELIVERED:
			return (
				<Badge
					variant="default"
					className="bg-blue-500 flex items-center gap-1 py-2 px-4"
				>
					<Car size={16} />
					Доставляется
				</Badge>
			)
		case orderStatus.COMPLETED:
			return (
				<Badge
					variant="outline"
					className="opacity-70 flex items-center gap-1 py-2 px-4"
				>
					<CheckCircle size={16} />
					Виполнен
				</Badge>
			)
		case orderStatus.CANCELED:
			return (
				<Badge
					variant="destructive"
					className="opacity-70 flex items-center gap-1 py-2 px-4"
				>
					<XCircle size={16} />
					Отменен
				</Badge>
			)
		default:
			return (
				<Badge variant="outline" className="opacity-50 py-2 px-4">
					ошибка
				</Badge>
			)
	}
}

const getOrderPaymentMethodBadge = (type: string) => {
	switch (type) {
		case paymentMethod.CASH:
			return (
				<Badge
					variant="outline"
					className="bg-green-500 flex items-center gap-1 py-2 px-4"
				>
					<BellRing size={16} />
					Наличными
				</Badge>
			)
		case paymentMethod.CARD ||
			paymentMethod.BLIK ||
			paymentMethod.APPLE_PAY ||
			paymentMethod.GOOGLE_PAY:
			return (
				<Badge
					variant="outline"
					className="bg-yellow-500 flex items-center gap-1 py-2 px-4"
				>
					Онлайн
				</Badge>
			)
		case paymentMethod.CART_ON_DELIVERY:
			return (
				<Badge
					variant="outline"
					className="bg-orange-500 flex items-center gap-1 py-2 px-4"
				>
					<ChefHat size={16} />
					Картой курьеру
				</Badge>
			)
		default:
			return (
				<Badge variant="outline" className="opacity-50 py-2 px-4">
					ошибка
				</Badge>
			)
	}
}

export const columns: ColumnDef<OrderColumn>[] = [
	{
		accessorKey: 'orderNumber',
		header: () => <div className="text-center">Номер</div>,
		cell: ({ row }) => (
			<div className="flex items-center justify-center">
				{row.original.orderNumber}
			</div>
		),
	},
	{
		accessorKey: 'createdAt',
		header: () => <div className="text-center">Час</div>,
		cell: ({ row }) => (
			<div className="flex items-center justify-center">
				{row.original.createdAt}
			</div>
		),
	},
	{
		accessorKey: 'customer',
		header: () => <div className="text-center">Замовник</div>,
		cell: ({ row }) => (
			<div className="flex items-center justify-center">
				{row.original.customer}
			</div>
		),
	},
	{
		accessorKey: 'orderStatus',
		header: () => <div className="text-center">Статус</div>,
		cell: ({ row }) => (
			<div className="flex items-center justify-center">
				{getOrderStatusBadge(row.original.orderStatus)}
			</div>
		),
	},
	{
		accessorKey: 'orderType',
		header: () => <div className="text-center">Тип заказа</div>,
		cell: ({ row }) => (
			<div className="flex items-center justify-center">
				{row.original.orderType}
			</div>
		),
	},
	{
		accessorKey: 'paymentMethodType',
		header: () => <div className="text-center">Тип оплаты</div>,
		cell: ({ row }) => (
			<div className="flex items-center justify-center">
				{getOrderPaymentMethodBadge(row.original.paymentMethodType)}
			</div>
		),
	},
	{
		accessorKey: 'paymentStatus',
		header: () => <div className="text-center">Статус оплаты</div>,
		cell: ({ row }) => (
			<div className="flex items-center justify-center">
				{row.original.paymentStatus}
			</div>
		),
	},
	{
		accessorKey: 'totalPrice',
		header: () => <div className="text-center">Сумма</div>,
		cell: ({ row }) => (
			<div className="flex items-center justify-center">
				{row.original.totalPrice}
			</div>
		),
	},
]
