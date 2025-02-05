'use client'
import React from 'react'
import { Button, styled } from '@mui/material'
import { RiArrowRightSLine } from 'react-icons/ri'
import { BiSearchAlt } from 'react-icons/bi'
import Image from 'next/image'
import Link from 'next/link'

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
const MemeHero = () => {
    return (
        <div className="min-h-[50vh] flex justify-center items-center">
            <div className="w-[60%] flex flex-col items-center gap-[2rem]">
                <Link href="/meme/create-meme">
                    <CustomButton>
                        Create Your own Meme{' '}
                        <RiArrowRightSLine className="text-[#222]" size={25} />{' '}
                    </CustomButton>
                </Link>

                {/* meme card */}
                <div className="w-[70%] border-[#B5A8F7] rounded-[11px] flex  gap-[2rem] shadow-sm inset-shadow-xs shadow-[#B5A8F7] py-[1.5rem] px-[2.5rem] border-[1px]">
                    <div className="bg-[#2C2D31] flex justify-center rounded-[17px]">
                        <div className="w-[190px] h-[190px]">
                            <Image
                                width={190}
                                height={190}
                                className="h-full w-full object-contain"
                                src="/images/meme/pepe-coin.png"
                                alt="pepe coin"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col w-full text-appGrey gap-1">
                        <h3 className="font-medium text-[24px] text-appPurple">
                            RETARDED PEPE
                        </h3>
                        <p className=" text-[17px]">Created by czed</p>
                        <div className="flex justify-between w-full items-center">
                            <p className=" text-[17px]">Market cap:</p>
                            <p className="text-appPurple font-medium text-[20px]">
                                $60k
                            </p>
                        </div>
                        <div className="flex justify-between w-full items-center">
                            <p className=" text-[17px]">Delegated%:</p>
                            <p className="text-appPurple font-medium text-[20px]">
                                60%
                            </p>
                        </div>
                        <p className="text-appPurple italic text-[17.5px]">
                            This is the best meme token created by man
                        </p>
                    </div>
                </div>

                <div className="w-full bg-[#2C2D31] overflow-hidden rounded-[8px] flex items-center">
                    <div className="w-[75%] flex items-center">
                        <input
                            placeholder="Search for token"
                            className="py-[15px] w-[93%] outline-none bg-transparent placeholder:text-appGrey2 px-[20px]"
                        />
                        <BiSearchAlt className="text-[#A6A7A9]" size={25} />
                    </div>
                    <button className="w-[25%] h-full flex justify-center hover:bg-[#E6E6FA] items-center text-center py-[15px] text-appDarkBlue px-[20px] bg-appPurple">
                        Search
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MemeHero
