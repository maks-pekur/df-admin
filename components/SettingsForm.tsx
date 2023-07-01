'use client'
import { IStore } from '@/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import axios from 'axios'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ButtonLoading } from './ButtonLoading'
import { Heading } from './Heading'
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
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)

	const form = useForm<SettingsFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	})

	const onSubmit = async (values: SettingsFormValues) => {
		try {
			setLoading(true)
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
			setLoading(false)
		}
	}

	const onDelete = async () => {
		try {
			setLoading(true)
			await axios.delete(`/api/stores/${params.storeId}`)
			router.refresh()
			router.push('/')
			// toast
		} catch (error) {
			console.log(error)
			// toast
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
			<div className="flex-col space-y-4">
				<div className="flex items-center justify-between">
					<Heading title="Settings" description="Manage store preferences" />
					<Button
						disabled={loading}
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
												disabled={loading}
												placeholder="Store name"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						{loading ? (
							<ButtonLoading />
						) : (
							<Button disabled={loading} type="submit">
								Зберегти
							</Button>
						)}
					</form>
				</Form>
			</div>
		</>
	)
}
