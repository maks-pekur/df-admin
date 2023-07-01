import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const { userId } = auth()

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		const body = await req.json()
		const { name } = body

		if (!name) {
			return new NextResponse('Name is required', { status: 400 })
		}

		const store = await fetch(`${process.env.API_URL}/stores`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({ userId, ...body }),
		}).then(res => res.json())

		return NextResponse.json(store)
	} catch (error) {
		console.log(error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export default async function GET() {
	try {
		const { userId } = auth()

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 })
		}
		const store = await fetch(`${process.env.API_URL}/stores/`).then(res =>
			res.json()
		)

		return NextResponse.json(store)
	} catch (error) {
		console.log(error)
		return new NextResponse('Internal error', { status: 500 })
	}
}
