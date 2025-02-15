'use client'
import React, { ChangeEvent, DragEvent, useState } from 'react'
import Image from 'next/image'
import {
    Alert,
    MenuItem,
    Select,
    SelectChangeEvent,
    Snackbar,
    styled,
} from '@mui/material'
import { SlArrowDown } from 'react-icons/sl'
import Link from 'next/link'
import { IoCloseSharp } from 'react-icons/io5'
import { useRouter } from 'next/navigation'

const StyledSelect = styled(Select)({
    backgroundColor: '#171717',
    color: '#fff',
    border: '1px solid #B7ABF7',
    borderRadius: '8px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        backgroundColor: '#2C2D31',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '& .MuiSelect-root': {
        padding: '0 6px',
    },
    '& .MuiSelect-icon': {
        color: '#fff',
        fontSize: '18px',
        right: '30px',
    },
})

export default function CreateMeme() {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [dragging, setDragging] = useState<boolean>(false)
    const [baseAmount, setBaseAmount] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [ticker, setTicker] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [errors, setErrors] = useState({
        name: '',
        ticker: '',
        description: '',
    })
    const [alert, setAlert] = useState<{
        open: boolean
        type: 'success' | 'error'
        message: string
    }>({
        open: false,
        type: 'success',
        message: '',
    })
    const router = useRouter()

    const validateForm = () => {
        const newErrors: typeof errors = {
            name: '',
            ticker: '',
            description: '',
        }
        let isValid = true

        if (!name.trim()) {
            newErrors.name = 'Name is required!'
            isValid = false
        }
        if (!ticker.trim()) {
            newErrors.ticker = 'Ticker is required!'
            isValid = false
        }
        if (!description.trim()) {
            newErrors.description = 'Description is required!'
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleInputChange =
        (
            setter: React.Dispatch<React.SetStateAction<string>>,
            field: keyof typeof errors
        ) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value)
            setErrors((prev) => ({ ...prev, [field]: '' })) // Clear error when user types
        }

    const handleAmountChange = (event: SelectChangeEvent<unknown>) => {
        setBaseAmount(event.target.value as string)
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]
        if (selectedFile) {
            setFile(selectedFile)
            setPreview(URL.createObjectURL(selectedFile)) // Generate preview URL
        }
    }

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setDragging(false)

        const droppedFile = event.dataTransfer.files?.[0]
        if (droppedFile) {
            setFile(droppedFile)
            setPreview(URL.createObjectURL(droppedFile)) // Generate preview URL
        }
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        if (!validateForm()) return

        const payload = { name, ticker, description }

        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_CREATE_TOKEN as string,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                }
            )

            if (!response.ok) {
                setAlert({
                    open: true,
                    type: 'error',
                    message: 'Failed to create meme token. Please try again.',
                })
                console.error('Error creating token:', response.statusText)
                return
            }

            const data = await response.json()
            console.log('Token Created:', data)
            setName('')
            setTicker('')
            setDescription('')
            setAlert({
                open: true,
                type: 'success',
                message: 'Token created successfully!',
            })

            setTimeout(() => {
                router.push('/meme')
            }, 2000)
        } catch (error) {
            console.error('Error:', error)
            setAlert({
                open: true,
                type: 'error',
                message: 'Error creating token. Please try again.',
            })
        }
    }

    const isFormValid = name.trim() && ticker.trim() && description.trim()

    return (
        <div className="  mb-[3rem] ">
            {/* Success/Error Alert */}
            <Snackbar
                open={alert.open}
                autoHideDuration={4000}
                onClose={() => setAlert({ ...alert, open: false })}
            >
                <Alert
                    severity={alert.type}
                    onClose={() => setAlert({ ...alert, open: false })}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
            <Link href="/meme" className="flex w-[70%] mb-[2rem] justify-end">
                <IoCloseSharp size={23} className="text-white" />
            </Link>
            <div className="flex w-full justify-center items-center">
                <div className="xl:w-[27%] lg:w-[33%] md:w-[50%] w-[50%] flex flex-col gap-[0.7rem]">
                    <h2 className="text-center mb-[0.5rem] font-medium text-[19px] md:text-[20px]">
                        Create your own token
                    </h2>

                    {/* form */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-[0.8rem]"
                        action=""
                    >
                        {/* name */}
                        <div className="flex flex-col">
                            <p className="text-[14px] font-light xl:text-[14.5px]">
                                Name
                            </p>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={handleInputChange(setName, 'name')}
                                className={`py-[7px]  w-full border-[1px] rounded-[8px] outline-none bg-[#171717] placeholder:text-appGrey2 px-[15px] md:px-[20px] ${
                                    errors.name
                                        ? 'border-red-500'
                                        : 'border-appPurple'
                                }`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        {/* ticker */}
                        <div className="flex flex-col">
                            <p className="text-[14px] font-light xl:text-[14.5px]">
                                Ticker
                            </p>
                            <input
                                type="text"
                                name="ticker"
                                value={ticker}
                                onChange={handleInputChange(
                                    setTicker,
                                    'ticker'
                                )}
                                className={`py-[7px]  w-full border-[1px] rounded-[8px] outline-none bg-[#171717] placeholder:text-appGrey2 px-[15px] md:px-[20px] ${
                                    errors.ticker
                                        ? 'border-red-500'
                                        : 'border-appPurple'
                                }`}
                            />
                            {errors.ticker && (
                                <p className="text-red-500 text-sm">
                                    {errors.ticker}
                                </p>
                            )}
                        </div>
                        {/* bio */}
                        <div className="flex flex-col">
                            <p className="text-[14px] font-light xl:text-[14.5px]">
                                Bio
                            </p>
                            <input
                                type="text"
                                name="description"
                                value={description}
                                onChange={handleInputChange(
                                    setDescription,
                                    'description'
                                )}
                                className={`py-[7px]  w-full border-[1px] rounded-[8px] outline-none bg-[#171717] placeholder:text-appGrey2 px-[15px] md:px-[20px] ${
                                    errors.description
                                        ? 'border-red-500'
                                        : 'border-appPurple'
                                }`}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm">
                                    {errors.description}
                                </p>
                            )}
                        </div>
                        {/* Image upload */}
                        <div className="flex flex-col">
                            <p className="text-[14px] font-light xl:text-[14.5px]">
                                Image
                            </p>
                            <div
                                className={`py-[20px] flex flex-col md:flex-row justify-center items-center gap-[0.5rem]  w-full border-[1px] rounded-[8px] border-appPurple outline-none bg-[#171717] placeholder:text-appGrey2 px-[15px] md:px-[20px] 
            ${
                dragging
                    ? 'border-dashed border-white'
                    : 'border-solid border-appPurple'
            }`}
                                onDragOver={(e) => {
                                    e.preventDefault()
                                    setDragging(true)
                                }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={handleDrop}
                            >
                                <div className="flex flex-col items-center gap-[0.5rem] ">
                                    <span className="md:w-[30px] w-[30px] h-[30px] md:h-[30px]">
                                        <Image
                                            width={30}
                                            height={30}
                                            alt="upload"
                                            src="/images/meme/upload.svg"
                                            className="h-full w-full object-contain"
                                        />
                                    </span>

                                    <p className="text-appGrey2  font-light text-[13px] text-center">
                                        {file
                                            ? `Selected: ${file.name}`
                                            : 'Drag and drop an image or click to upload'}
                                    </p>

                                    <label className="cursor-pointer bg-[#2C2D31] text-appPurple text-[13px] py-2 px-6 rounded-md hover:bg-appPurple hover:text-appDarkBlue transition">
                                        Select a File
                                        <input
                                            type="file"
                                            name="image"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                        />
                                    </label>
                                </div>

                                {preview && (
                                    <div className="w-[100px] h-[100px] rounded-md overflow-hidden border border-appPurple">
                                        <Image
                                            width={100}
                                            height={100}
                                            src={preview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* base amount */}
                        <div className="flex flex-col">
                            <p className="text-[14px] font-light xl:text-[14.5px]">
                                Set base amount
                            </p>
                            <StyledSelect
                                value={baseAmount}
                                onChange={handleAmountChange}
                                IconComponent={SlArrowDown}
                                size="small"
                                // className="w-full border-[1px] overflow-hidden rounded-[8px] border-appPurple bg-[#171717] "
                            >
                                <MenuItem value="100">$100</MenuItem>
                                <MenuItem value="300">$300</MenuItem>
                                <MenuItem value="500">$500</MenuItem>
                                <MenuItem value="1500">$1500</MenuItem>
                            </StyledSelect>
                        </div>

                        {/* token fee */}
                        <div className="flex justify-between mt-[2rem] mb-[1rem] items-center">
                            <p className="text-[14px] font-light xl:text-[14.5px]">
                                Token Fee:
                            </p>
                            <p className="font-medium  uppercase text-[16px] xl:text-[18px]">
                                150XP
                            </p>
                        </div>

                        {/* submit button */}
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className={` text-[#222] min-w-[100px] rounded-[14px] font-medium py-[10px] px-[25px] transition-colors ease-in-out duration-300 ${
                                !isFormValid
                                    ? 'bg-appPurpleHover cursor-not-allowed'
                                    : 'bg-appPurple hover:bg-appPurpleHover'
                            }`}
                        >
                            Create Your Meme
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
