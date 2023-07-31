'use client'
import { IStore } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import axios from 'axios'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Heading } from './heading'
import { Icons } from './icons'
import { AlertModal } from './modals/alertModal'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { Input } from './ui/input'
import { Separator } from './ui/separator'

interface SettingsFormProps {
	initialData: IStore
}

const formSchema = z.object({
	name: z.string().min(3),
})

type SettingsFormValues = z.infer<typeof formSchema>

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
	const params = useParams()
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [open, setOpen] = useState(false)

	const form = useForm<SettingsFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	})

	const onSubmit = async (values: SettingsFormValues) => {
		try {
			setIsLoading(true)
			const response = await axios.patch(
				`/api/stores/${params.storeId}`,
				values
			)
			router.refresh()
			// toast.success
		} catch (error) {
			console.log(error)
			// toast.error
		} finally {
			setIsLoading(false)
		}
	}

	const onDelete = async () => {
		try {
			setIsLoading(true)
			await axios.delete(`/api/stores/${params.storeId}`)
			router.refresh()
			router.push('/')
			// toast
		} catch (error) {
			console.log(error)
			// toast
		} finally {
			setIsLoading(false)
			setOpen(false)
		}
	}

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={isLoading}
			/>
			<div className="flex-col space-y-4">
				<div className="flex items-center justify-between">
					<Heading title="Settings" description="Manage store preferences" />
					<Button
						disabled={isLoading}
						variant="destructive"
						size="sm"
						onClick={() => setOpen(true)}
					>
						<Trash className="h-4 w-4" />
					</Button>
				</div>

				<Separator />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8 w-full"
					>
						<div className="grid grid-cols-3 gap-8">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												disabled={isLoading}
												placeholder="Store name"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<Button variant="outline" type="button" disabled={isLoading}>
							{isLoading ? (
								<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
							) : (
								'Зберегти'
							)}
						</Button>
					</form>
				</Form>
			</div>
		</>
	)
}
