'use client'

import * as z from 'zod'

import { default as api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Icons } from './icons'
import { Button } from './ui/button'
import { Card, CardTitle } from './ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { Input } from './ui/input'

const formSchema = z.object({
	email: z.string().email('This is not a valid email.'),
	password: z.string(),
	companyId: z.string(),
})

type AuthFormValues = z.infer<typeof formSchema>

export const AuthForm = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [companies, setCompanies] = useState([])
	const [checkedCompany, setCheckedCompany] = useState('')

	const router = useRouter()

	const form = useForm<AuthFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			companyId: '',
		},
	})

	const email = form.watch('email')

	useEffect(() => {
		const timeoutId = setTimeout(async () => {
			if (email) {
				try {
					setIsLoading(true)
					const { data } = await api.post('/auth/check-companies', { email })

					if (data.length === 1) {
						setCheckedCompany(data[0])
						form.setValue('companyId', data[0].companyId)
					}

					setCompanies(data)
				} catch (error) {
					console.log(error)
				} finally {
					setIsLoading(false)
				}
			}
		}, 2000)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [email])

	const onSubmit = async (values: AuthFormValues) => {
		try {
			setIsLoading(true)
			const res = await api.post('/auth/sign-in', values)

			if (res) {
				router.push(`/${values.companyId}/`)
			}
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<Card className="grid gap-10 p-6">
				{checkedCompany && (
					<CardTitle className="text-center">
						{checkedCompany.companyName}
					</CardTitle>
				)}
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid space-y-6">
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
								{checkedCompany && (
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
															{...field}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
								)}
							</div>
							{checkedCompany && (
								<Button disabled={isLoading}>
									{isLoading ? (
										<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
									) : (
										'Sign In'
									)}
								</Button>
							)}
						</div>
					</form>
				</Form>
			</Card>

			{companies.length > 1 && (
				<Card className="p-6 space-y-6">
					<div>Какой компанией управлять</div>
					{companies.map(company => (
						<Card className="p-4" key={company.id}>
							{company.companyName}
						</Card>
					))}
				</Card>
			)}
		</>
	)
}
