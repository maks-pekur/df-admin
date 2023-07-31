export type OrderColumn = {
	orderNumber: string
	customer: string
	orderStatus: string
	orderType: string
	paymentMethodType: string
	paymentStatus: string
	createdAt: string
}

export enum orderStatus {
	PENDING = 'pending',
	ACCEPTED = 'accepted',
	PREPARING = 'preparing',
	READY = 'ready',
	DELIVERED = 'delivered',
	COMPLETED = 'completed',
	CANCELED = 'canceled',
}

export enum orderType {
	DELIVERY = 'delivery',
	TAKE_AWAY = 'takeaway',
	INSIDE = 'inside',
}
