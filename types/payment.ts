export enum paymentStatus {
	PENDING = 'pending',
	PAID = 'paid',
	FAILED = 'failed',
	SUCCEEDED = 'succeeded',
}

export enum paymentMethod {
  CASH = 'cash',
  CART_ON_DELIVERY = 'card_on_delivery',
  CARD = 'card',
  BLIK = 'blik',
  APPLE_PAY = 'apple_pay',
  GOOGLE_PAY = 'google_pay',
}