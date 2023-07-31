'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { measureUnits } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { ICategory, IProduct } from '@/types'
import axios from 'axios'
import { CheckIcon, Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Heading } from '../heading'
import ImageUpload from '../image-upload'
import { AlertModal } from '../modals/alertModal'
import { Button } from '../ui/button'
import { Command, CommandEmpty, CommandGroup, CommandItem } from '../ui/command'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Separator } from '../ui/separator'
import { Textarea } from '../ui/textarea'

const productFormSchema = z.object({
	imageUrl: z.string().min(1, {
		message: 'Завантажте будь-ласка фото.',
	}),
	name: z
		.string()
		.min(2, {
			message: 'Назва має бути не меньше ніж 3 символи.',
		})
		.max(30, {
			message: 'Назва має бути не більша ніж 30 символів.',
		}),
	description: z.string().max(255, {
		message: 'Опис має бути не більшим за 255 символів.',
	}),
	categoryId: z.string({
		required_error: 'Будь-ласка оберіть категорію.',
	}),
	price: z
		.number({
			required_error: 'Будь-ласка вкажіть ціну.',
		})
		.positive(),
	energyAmount: z.number().optional(),
	proteinsAmount: z.number().optional(),
	fatAmount: z.number().optional(),
	carbohydratesAmount: z.number().optional(),
	measureUnit: z.string({
		required_error: 'Будь-ласка вкажіть одиниці виміру.',
	}),
	measureUnitValue: z.string({
		required_error: 'Будь-ласка вкажіть значення.',
	}),
})

type ProductFormValues = z.infer<typeof productFormSchema>

interface ProductFormProps {
	initialData: IProduct | null
	categories: ICategory[]
}

const validate = (value: string) => {
	const matches = value.match(
		/^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/
	)
	return matches?.length > 0 || 'Not a Number'
}

export const ProductForm: React.FC<ProductFormProps> = ({
	initialData,
	categories = [],
}) => {
	const params = useParams()
	const router = useRouter()

	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const title = initialData ? 'Оновлення товару' : 'Новий товар'
	const description = initialData ? 'Оновлення товару' : 'Додати товар'
	const toastMessage = initialData ? 'Billboard updated.' : 'Billboard created.'
	const action = initialData ? 'Зберегти' : 'Створити'

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(productFormSchema),
		defaultValues: initialData || {
			imageUrl: '',
			name: '',
			description: '',
			categoryId: '',
			price: 0,
			energyAmount: 0,
			proteinsAmount: 0,
			fatAmount: 0,
			carbohydratesAmount: 0,
			measureUnit: '',
			measureUnitValue: '',
		},
	})

	const onSubmit = async (data: ProductFormValues) => {
		const formData = new FormData()
		if (data.imageUrl) {
			formData.append('image', data.imageUrl)
		}

		formData.append('name', data.name)
		formData.append('price', data.price)
		formData.append('categoryId', data.categoryId)
		formData.append('description', data.description)
		formData.append('energyAmount', data.energyAmount)
		formData.append('proteinsAmount', data.proteinsAmount)
		formData.append('fatAmount', data.fatAmount)
		formData.append('carbohydratesAmount', data.carbohydratesAmount)
		formData.append('measureUnit', data.measureUnit)
		formData.append('weight', data.weight)

		console.log(data)
		// try {
		// 	setLoading(true)
		// 	if (initialData) {
		// 		await axios.patch(
		// 			`${process.env.NEXT_PUBLIC_API_URL}/products/${initialData.id}`,
		// 			data
		// 		)
		// 	} else {
		// 		await axios.post(
		// 			`${process.env.NEXT_PUBLIC_API_URL}/products/new`,
		// 			data
		// 		)
		// 	}
		// 	router.refresh()
		// 	router.push(`/${params.storeId}/products`)
		// 	// toast.success(toastMessage)
		// } catch (error: any) {
		// 	// toast.error('Something went wrong.')
		// } finally {
		// 	setLoading(false)
		// }
	}

	const onDelete = async () => {
		try {
			setLoading(true)
			await axios.delete(
				`/api/${params.storeId}/billboards/${params.billboardId}`
			)
			router.refresh()
			router.push(`/${params.storeId}/billboards`)
			// toast.success('Billboard deleted.')
		} catch (error: any) {
			// toast.error(
			// 	'Make sure you removed all categories using this billboard first.'
			// )
		} finally {
			setLoading(false)
			setOpen(false)
		}
	}

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>
			<div className="flex items-center justify-between">
				<Heading title={title} description={description} />
				{initialData && (
					<Button
						disabled={loading}
						variant="destructive"
						size="sm"
						onClick={() => setOpen(true)}
					>
						<Trash className="h-4 w-4" />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-full mx-auto"
				>
					<div className="flex flex-col w-[80%] gap-8">
						<FormField
							control={form.control}
							name="imageUrl"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Фото</FormLabel>
									<FormControl>
										<ImageUpload
											value={field.value ? [field.value] : []}
											disabled={loading}
											onChange={url => field.onChange(url)}
											onRemove={() => field.onChange('')}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Назва</FormLabel>
									<FormControl>
										<Input placeholder="Введіть назву товару" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Опис</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Опишіть товар"
											rows={4}
											className="resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid md:grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Ціна</FormLabel>
										<FormControl>
											<Input
												placeholder="Введіть ціну"
												type="number"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="categoryId"
								render={({ field }) => (
									<FormItem className="flex flex-col space-y-3 pt-1">
										<FormLabel>Категорія</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant="outline"
														role="combobox"
														className={cn(
															'w-full justify-between',
															!field.value && 'text-muted-foreground'
														)}
													>
														{field.value
															? categories.find(
																	category => category.id === field.value
															  )?.name
															: 'Оберіть категорію'}
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-[250px] md:w-[500px] p-0">
												<Command>
													<CommandEmpty>No category found.</CommandEmpty>
													<CommandGroup>
														{categories.map(category => (
															<CommandItem
																value={category.id}
																key={category.id}
																onSelect={value => {
																	form.setValue('categoryId', value)
																}}
															>
																<CheckIcon
																	className={cn(
																		'mr-2 h-4 w-4',
																		category.id === field.value
																			? 'opacity-100'
																			: 'opacity-0'
																	)}
																/>
																{category.name}
															</CommandItem>
														))}
													</CommandGroup>
												</Command>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Separator />
						<div className="grid md:grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="measureUnit"
								render={({ field }) => (
									<FormItem className="flex flex-col space-y-3 pt-1">
										<FormLabel>Одиниці виміру</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant="outline"
														role="combobox"
														className={cn(
															'w-full justify-between',
															!field.value && 'text-muted-foreground'
														)}
													>
														{field.value
															? measureUnits.find(
																	unit => unit.id === field.value
															  )?.name
															: 'Оберіть значення'}
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-[250px] md:w-[500px] p-0">
												<Command>
													<CommandEmpty>No units found.</CommandEmpty>
													<CommandGroup>
														{measureUnits.map(unit => (
															<CommandItem
																value={unit.id}
																key={unit.id}
																onSelect={value => {
																	form.setValue('measureUnit', value)
																}}
															>
																<CheckIcon
																	className={cn(
																		'mr-2 h-4 w-4',
																		unit.id === field.value
																			? 'opacity-100'
																			: 'opacity-0'
																	)}
																/>
																{unit.name}
															</CommandItem>
														))}
													</CommandGroup>
												</Command>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="measureUnitValue"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Значення од. виміру</FormLabel>
										<FormControl>
											<Input placeholder="Введіть кількість" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Separator />
						<div className="grid md:grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="energyAmount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Єнергетична цінність на 100 г</FormLabel>
										<FormControl>
											<Input
												placeholder="Введіть кількість калорій"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="proteinsAmount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Білків</FormLabel>
										<FormControl>
											<Input
												placeholder="Введіть кількість білків"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="fatAmount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Жирів</FormLabel>
										<FormControl>
											<Input placeholder="Введіть кількість жирів" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="carbohydratesAmount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Вуглеводів</FormLabel>
										<FormControl>
											<Input
												placeholder="Введіть кількість вуглеводів"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<Button disabled={loading} className="ml-auto" type="submit">
						{action}
					</Button>
				</form>
			</Form>
		</>
	)
}
