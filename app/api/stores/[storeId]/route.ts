import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const body = await req.json()

		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 })
		}

		const { userId } = auth()
		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		const store = await fetch(
			`${process.env.API_URL}/stores/${params.storeId}`,
			{
				method: 'PATCH',
				body,
			}
		)

		return NextResponse.json(store)
	} catch (error) {
		console.log('[STORE_PATCH]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 })
		}

		const { userId } = auth()
		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		const store = await fetch(
			`${process.env.API_URL}/stores/${params.storeId}`,
			{
				method: 'DELETE',
			}
		)

		return NextResponse.json(store)
	} catch (error) {
		console.log('[STORE_DELETE]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}
