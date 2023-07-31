'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '../ui/button'

import { useStoreModal } from '@/hooks/use-store-modal'
import { Icons } from '../icons'
import { Modal } from '../modal'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

const formSchema = z.object({
	name: z.string().min(3),
})

export const StoreModal = () => {
	const storeModal = useStoreModal()
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setIsLoading(true)
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/stores`,
				values
			)
			window.location.assign(`/${res.data.id}`)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Modal
			title="Новий ресторан"
			description="Введіть назву ресторвну"
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			<div>
				<div className="space-y-4 py-2 pb-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Назва</FormLabel>
										<FormControl>
											<Input
												disabled={isLoading}
												placeholder="Введіть назву ресторану"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="pt-6 space-x-2 flex items-center justify-end w-full">
								<Button
									disabled={isLoading}
									variant="outline"
									onClick={storeModal.onClose}
								>
									Відміна
								</Button>
								<Button variant="outline" type="button" disabled={isLoading}>
									{isLoading ? (
										<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
									) : (
										'Github'
									)}
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	)
}
