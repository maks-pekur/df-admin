export interface IStore {
	id: string
	userId: string
	name: string
	createdAt: Date
	updatedAt: Date
}

export interface ICompany {
	id: string
	createdAt: Date
	updatedAt: Date
}

export interface IOrderItem {
	name: string
	price: number
	quantity: number
	subTotalPrice: number
}

export interface IOrder {
	id: string
	paymentStatus: any
	orderStatus: any
	orderNumber: any
	customerId: string
	storeId: string
	orderType: string
	paymentMethodType: string
	totalPrice: number
	orderItems: IOrderItem[]
	createdAt: any
}

export interface IUser {
	id: string
	email: string
	name: string
	role: string
}

export interface IProduct {
	id: string
	name: string
	description?: string
	price?: number
	imageUrl?: string
}

export interface ICategory {
	id: string
	name: string
	slug: string
}
