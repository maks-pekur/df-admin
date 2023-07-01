import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const body = await req.json()
		const { name, slug } = body

		if (!name || !slug) {
			return new NextResponse('Name is required', { status: 401 })
		}

		const category = await fetch('http://localhost:8888/api/categories', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(body),
		}).then(res => res.json())

		return NextResponse.json(category)
	} catch (error) {
		console.log(error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function GET() {
	try {
		const categories = await fetch('http://localhost:8888/api/categories', {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		}).then(res => res.json())

		return NextResponse.json(categories)
	} catch (error) {
		console.log(error)
		return new NextResponse('Internal error', { status: 500 })
	}
}
