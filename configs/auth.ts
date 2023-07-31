import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'email',
					required: true,
				},
				password: { label: 'Password', type: 'password', required: true },
			},
			async authorize(
				credentials: Record<'email' | 'password', string> | undefined
			): Promise<any | null> {
				if (!credentials?.email || !credentials.password) {
					return null
				}

				try {
					const res = await fetch(
						`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								email: credentials?.email,
								password: credentials?.password,
							}),
						}
					)
					const user = await res.json()

					if (!res.ok) throw new Error(user.message)

					if (user) {
						console.log(user)
						return user
					} else {
						return null
					}
				} catch (error) {
					return null
				}
			},
		}),
	],
	pages: {
		signIn: '/sign-in',
	},
}
