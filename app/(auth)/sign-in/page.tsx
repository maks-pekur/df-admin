import { Metadata } from 'next'
import Link from 'next/link'

import { AuthForm } from '@/components/auth-form'

export const metadata: Metadata = {
	title: 'Authentication',
	description: 'Authentication forms built using the components.',
}

export default function AuthenticationPage() {
	return (
		<div className="mx-auto flex h-full flex-col justify-center space-y-6 sm:w-[350px] px-4">
			<div className="flex flex-col space-y-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">Login</h1>
				<p className="text-sm text-muted-foreground">Enter your email</p>
			</div>
			<AuthForm />
			<p className="px-8 text-center text-sm text-muted-foreground">
				By clicking continue, you agree to our{' '}
				<Link
					href="/terms"
					className="underline underline-offset-4 hover:text-primary"
				>
					Terms of Service
				</Link>{' '}
				and{' '}
				<Link
					href="/privacy"
					className="underline underline-offset-4 hover:text-primary"
				>
					Privacy Policy
				</Link>
				.
			</p>
		</div>
	)
}
