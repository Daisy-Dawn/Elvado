'use client'
import React, { ChangeEvent, DragEvent, useState } from 'react'
import Image from 'next/image'
import {
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    styled,
} from '@mui/material'
import { SlArrowDown } from 'react-icons/sl'

const StyledSelect = styled(Select)({
    backgroundColor: '#2C2D31',
    color: '#fff',
    // padding: '3px 3px',
    borderRadius: '0px 6px 6px 0px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '0px 6px 6px 0px', // Apply border-radius to top-right and bottom-right
        backgroundColor: '#2C2D31', // Ensure the background remains consistent
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '& .MuiSelect-root': {
        padding: '0 6px', // Add extra padding if needed for spacing consistency
    },
    '& .MuiSelect-icon': {
        color: '#fff', // Change the color
        fontSize: '18px', // Adjust the size
        right: '30px', // Move it to the right
    },
})

const CustomButton = styled(Button)({
    backgroundColor: '#B5A8F7',
    minWidth: '100px',

    borderRadius: '14px',
    color: '#222',
    fontWeight: '500',
    textTransform: 'none',
    padding: '10px 25px',
    // fontSize: '14px',
    '&:hover': {
        backgroundColor: '#E6E6FA',
    },
})

export default function CreateMeme() {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [dragging, setDragging] = useState<boolean>(false)
    const [baseAmount, setBaseAmount] = useState<string>('')

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
    return (
        <div className=" w-full mb-[3rem] flex justify-center items-center">
            <div className="lg:w-[50%] md:w-[70%] w-[85%] flex flex-col gap-[0.5rem]">
                <h2 className="text-center mb-[0.5rem] font-medium text-[19px] md:text-[25px]">
                    Create your own token
                </h2>

                {/* form */}
                <form className="flex flex-col gap-[0.5rem]" action="">
                    {/* name */}
                    <div className="flex flex-col">
                        <p className="text-[14px] md:text-base">Name</p>
                        <input
                            type="text"
                            name="name"
                            className="md:py-[15px] py-[10px]  w-full border-[1px] rounded-[13px] border-appPurple outline-none bg-[#171717] placeholder:text-appGrey2 px-[15px] md:px-[20px]"
                        />
                    </div>
                    {/* ticker */}
                    <div className="flex flex-col">
                        <p className="text-[14px] md:text-base">Ticker</p>
                        <input
                            type="text"
                            name="ticker"
                            className="md:py-[15px] py-[10px] w-full border-[1px] rounded-[13px] border-appPurple outline-none bg-[#171717] placeholder:text-appGrey2 px-[15px] md:px-[20px]"
                        />
                    </div>
                    {/* bio */}
                    <div className="flex flex-col">
                        <p className="text-[14px] md:text-base">Bio</p>
                        <input
                            type="text"
                            name="bio"
                            className="md:py-[15px] py-[10px] w-full border-[1px] rounded-[13px] border-appPurple outline-none bg-[#171717] placeholder:text-appGrey2 px-[15px] md:px-[20px]"
                        />
                    </div>
                    {/* Image upload */}
                    <div className="flex flex-col">
                        <p className="text-[14px] md:text-base">Image</p>
                        <div
                            className={`md:py-[15px] py-[10px] flex flex-col md:flex-row justify-center items-center gap-[0.5rem] md:gap-[1.5rem] w-full border-[2px] rounded-[13px] border-appPurple outline-none bg-[#171717] placeholder:text-appGrey2 px-[15px] md:px-[20px] 
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
                            <div className="flex flex-col items-center gap-[0.5rem] md:gap-[1.5rem]">
                                <span className="md:w-[40px] w-[30px] h-[30px] md:h-[40px]">
                                    <Image
                                        width={40}
                                        height={40}
                                        alt="upload"
                                        src="/images/meme/upload.svg"
                                        className="h-full w-full object-contain"
                                    />
                                </span>

                                <p className="text-appGrey2 text-[13px] md:text-base text-center">
                                    {file
                                        ? `Selected: ${file.name}`
                                        : 'Drag and drop an image or click to upload'}
                                </p>

                                <label className="cursor-pointer bg-[#2C2D31] text-appPurple text-[13px] md:text-base py-2 px-6 rounded-md hover:bg-appPurple hover:text-appDarkBlue transition">
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
                        <p className="text-[14px] md:text-base">
                            Set base amount
                        </p>
                        <StyledSelect
                            value={baseAmount}
                            onChange={handleAmountChange}
                            IconComponent={SlArrowDown}
                            size="small"
                            className="md:py-[6px] py-[2px] w-full border-[1px] rounded-[13px] border-appPurple bg-[#171717] px-[10px] md:px-[20px]"
                        >
                            <MenuItem value="100">$100</MenuItem>
                            <MenuItem value="300">$300</MenuItem>
                            <MenuItem value="500">$500</MenuItem>
                            <MenuItem value="1500">$1500</MenuItem>
                        </StyledSelect>
                    </div>

                    {/* token fee */}
                    <div className="flex justify-between mt-[2rem] mb-2 items-center">
                        <p className="text-[14px] md:text-base">Token Fee:</p>
                        <p className="font-medium  uppercase text-[16px] md:text-[18px]">
                            150XP
                        </p>
                    </div>
                    {/* submit button */}
                    <CustomButton>Create Your Meme</CustomButton>
                </form>
            </div>
        </div>
    )
}
