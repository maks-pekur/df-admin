import { clsx, type ClassValue } from 'clsx'
import { format } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat(
	`${process.env.NEXT_PUBLIC_LOCALES}`,
	{
		style: 'currency',
		currency: `${process.env.NEXT_PUBLIC_CURRENCY}`,
	}
)

export const totalPriceAllOrders = (data: any) => {
	const total = data.reduce(
		(sum: number, order: { totalPrice: number }) => sum + order.totalPrice,
		0
	)
	return formatter.format(total)
}

interface FirebaseTimestamp {
	_seconds: number
	_nanoseconds?: number
}

export const formatTimestamp = (timestamp: FirebaseTimestamp) => {
	const date = new Date(timestamp._seconds * 1000)
	const formattedDate = format(date, 'dd.MM.yyyy')
	const formattedTime = format(date, 'HH:mm')
	return { formattedDate, formattedTime }
}
