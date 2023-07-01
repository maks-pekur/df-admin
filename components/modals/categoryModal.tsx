'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { slugify } from 'transliteration'
import * as z from 'zod'
import { Button } from '../ui/button'

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
	slug: z.string(),
})

function createSlug(name: string) {
	return slugify(name, { lowercase: true, separator: '-' })
}

export const CategoryModal = () => {
	// const categoryModal = useModal()
	const [loading, setLoading] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			slug: '',
		},
	})

	useEffect(() => {
		const name = form.watch('name')
		if (name) {
			form.setValue('slug', createSlug(name))
		}
	}, [form.watch('name')])

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setLoading(true)
			const response = await axios.post('/api/categories', values)
			console.log(response.data)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Modal
			title="Нова категорія"
			description="Введіть назву а slug згенеруеться автоматично"
			isOpen={true}
			onClose={() => {}}
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
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												disabled={loading}
												placeholder="Введите название категории"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="slug"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Slug</FormLabel>
										<FormControl>
											<Input disabled {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="pt-6 space-x-2 flex items-center justify-end w-full">
								<Button
									disabled={loading}
									variant="outline"
									// onClick={categoryModal.onClose}
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
