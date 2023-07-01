import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function DELETE(
	req: Request,
	{
		params,
	}: {
		params: { id: string; storeId: string }
	}
) {
	try {
		if (!params.id) {
			return new NextResponse('Product id is required', { status: 400 })
		}

		const { userId } = auth()
		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		const product = await fetch(
			`${process.env.API_URL}/products/${params.id}`,
			{
				method: 'DELETE',
			}
		)

		return NextResponse.json(product)
	} catch (error) {
		console.log('[STORE_DELETE]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}
