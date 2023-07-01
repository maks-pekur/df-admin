'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '../ui/button'

import { useStoreModal } from '@/hooks/use-store-modal'
import { ButtonLoading } from '../ButtonLoading'
import { Modal } from '../Modal'
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
	const [loading, setLoading] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setLoading(true)
			const response = await axios.post('/api/stores', values)
			window.location.assign(`/${response.data.id}`)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
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
												disabled={loading}
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
									disabled={loading}
									variant="outline"
									onClick={storeModal.onClose}
								>
									Відміна
								</Button>
								{loading ? (
									<ButtonLoading />
								) : (
									<Button disabled={loading} type="submit">
										Зберегти
									</Button>
								)}
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	)
}
