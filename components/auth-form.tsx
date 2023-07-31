'use client'

import * as React from 'react'

import * as z from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Icons } from './icons'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { Input } from './ui/input'

const formSchema = z.object({
	email: z.string().email('This is not a valid email.'),
	password: z.string(),
})

type AuthFormValues = z.infer<typeof formSchema>

export const AuthForm = () => {
	const [isLoading, setIsLoading] = React.useState<boolean>(false)
	const router = useRouter()

	const form = useForm<AuthFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (values: AuthFormValues) => {
		try {
			setIsLoading(true)

			const res = await signIn('credentials', {
				redirect: false,
				email: values.email,
				password: values.password,
			})

			if (res && !res.error) {
				router.push('/')
			}
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="grid gap-10">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="grid gap-6">
						<div className="grid gap-1">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												disabled={isLoading}
												placeholder="name@example.com"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<div className="grid gap-1">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												disabled={isLoading}
												type="password"
												placeholder="password"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<Button disabled={isLoading}>
							{isLoading && (
								<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
							)}
							Sign In
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}
