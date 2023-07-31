'use client'

import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { ImagePlus } from 'lucide-react'
import Image from 'next/image'
import { Input } from './ui/input'

interface ImageUploadProps {
	disabled?: boolean
	onChange: (value: string) => void
	onRemove: (value: string) => void
	value: string[]
	defaultImage?: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({
	disabled,
	onChange,
	onRemove,
	value,
	defaultImage,
}) => {
	const [isMounted, setIsMounted] = useState(false)
	const [imageUrl, setImageUrl] = useState(defaultImage || null)

	const inputRef = useRef()

	useEffect(() => {
		setIsMounted(true)
	}, [])

	const handleButtonClick = () => {
		inputRef.current?.click()
	}

	const handleOnchange = e => {
		const file = e.target.files?.[0]
		if (!file) {
			setImageUrl(null)
			return
		}

		setImageUrl(URL.createObjectURL(file))
		onChange({ ...e, file })
	}

	if (!isMounted) {
		return null
	}

	return (
		<div className="  flex justify-center rounded-md border border-dashed border-gray-900/25 py-4">
			<div className="flex flex-col items-center gap-4">
				{imageUrl && (
					<div className="relative w-[300px] h-[230px]">
						<Image src={imageUrl} fill className="object-contain" alt="Image" />
					</div>
				)}

				<Button
					type="button"
					disabled={disabled}
					onClick={handleButtonClick}
					variant="secondary"
				>
					<ImagePlus className="h-4 w-4 mr-2" />
					Завантажити фото
				</Button>

				<Input
					type="file"
					className="sr-only"
					onChange={handleOnchange}
					ref={inputRef}
					accept="image/*"
				/>
			</div>
		</div>
	)
}

export default ImageUpload
