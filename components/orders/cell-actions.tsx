'use client'

import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import { OrderColumn } from './columns'

interface CellActionsProps {
	data: OrderColumn
}

export const CellAction: React.FC<CellActionsProps> = ({ data }) => {
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)

	const router = useRouter()
	const params = useParams()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Оберіть дію</DropdownMenuLabel>
				<DropdownMenuItem
					onClick={() => router.push(`/${params.storeId}/products/${data.id}`)}
				>
					<Edit className="mr-2 h-4 w-4" />
					Оновити
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setOpen(true)}>
					<Trash className="mr-2 h-4 w-4" />
					Видалити
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
