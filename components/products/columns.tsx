'use client'

import { ColumnDef } from '@tanstack/react-table'

import { formatter } from '@/lib/utils'
import Image from 'next/image'
import { CellAction } from './cell-actions'

export type productsColumn = {
	id: string
	imageUrl: string
	name: string
	description: string
	categoryId: string
	price: number
}

export const columns: ColumnDef<productsColumn>[] = [
	{
		accessorKey: 'imageUrl',
		header: () => <div className="text-center">Фото</div>,
		cell: ({ row }) => {
			return (
				<Image src={row.original.imageUrl} alt="" width={100} height={100} />
			)
		},
	},
	{
		accessorKey: 'name',
		header: () => <div className="text-center">Найменування</div>,
	},
	{
		accessorKey: 'description',
		header: () => <div className="text-center">Опис</div>,
	},
	{
		accessorKey: 'categoryId',
		header: () => <div className="text-center">Категорія</div>,
	},
	{
		accessorKey: 'price',
		header: () => <div className="text-center">Ціна</div>,
		cell: ({ row }) => {
			const price = parseFloat(row.getValue('price'))
			const formatted = formatter.format(price)
			return <div className="text-right font-medium">{formatted}</div>
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
]
