'use client'
import React, { useEffect, useState } from 'react'
import { Button, styled } from '@mui/material'
import { RiArrowRightSLine } from 'react-icons/ri'
import { BiSearchAlt } from 'react-icons/bi'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useAppContext } from '../context/AppContext'
import { Meme } from '../types/meme'

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
        backgroundColor: '#9186C6',
    },
})

const MemeHero = () => {
    const { searchTerm, setSearchTerm } = useAppContext()
    const [memeCoinList, setMemeCoinList] = useState<Meme[]>([])

    useEffect(() => {
        const fetchMemes = async () => {
            try {
                const response = await axios.get(
                    process.env.NEXT_PUBLIC_FETCH_MEMES!
                )
                if (response.data.status === 200) {
                    setMemeCoinList(response.data.data.tokens)
                }
            } catch (error) {
                console.error('Error fetching memes:', error)
            }
        }

        fetchMemes()
    }, [])
    return (
        <div className="min-h-[50vh] flex justify-center items-center">
            <div className=" lg:w-[80%] w-full flex flex-col items-center gap-[2rem]">
                <Link href="/meme/create-meme">
                    <CustomButton>
                        Create Your own Meme{' '}
                        <RiArrowRightSLine className="text-[#222]" size={25} />{' '}
                    </CustomButton>
                </Link>

                {/* meme card */}
                {memeCoinList.length > 0 ? (
                    <Link
                        className="md:w-[68%] xl:w-[58%] 2xl:w-[50%] w-full border-[#B5A8F7] rounded-[11px] flex flex-col items-center md:items-start md:flex-row gap-4  md:gap-[2.5rem] shadow-sm inset-shadow-xs shadow-[#B5A8F7] py-2 md:py-[1.5rem] px-[1rem] md:px-[2.5rem] border-[1px]"
                        href={`/meme/${memeCoinList[1].tokenId}`}
                    >
                        <div className="bg-[#2C2D31] overflow-hidden w-[45%] h-[80px] md:w-[200px] md:h-full flex justify-center rounded-[17px]">
                            <Image
                                width={200}
                                height={200}
                                className="h-full w-full object-contain"
                                src="/images/meme/pepe-coin.png"
                                alt="pepe coin"
                            />
                        </div>

                        <div className="flex flex-col w-[55%] items-center md:items-start text-foreground ">
                            <h3 className="font-medium md:text-[22px] leading-none md:leading-normal uppercase text-[18px] text-appPurple">
                                {memeCoinList[1].name}
                            </h3>
                            <p className=" text-[14px] font-[200] text-foreground md:text-[18px]">
                                Created by {memeCoinList[1].creator}
                            </p>
                            <div className=" hidden md:flex justify-between w-full items-center">
                                <p className="font-[200] text-[17px]">
                                    Market cap:
                                </p>
                                <p className="text-appPurple font-medium text-[22px]">
                                    $60k
                                </p>
                            </div>
                            <div className="hidden md:flex  justify-between w-full items-center">
                                <p className="font-[200] text-[17px]">
                                    Delegated%:
                                </p>
                                <p className="text-appPurple font-medium text-[22px]">
                                    {memeCoinList[1].delegatedSupply}%
                                </p>
                            </div>
                            {/* small screen delegated and market price */}
                            <div className="flex w-[70%] md:hidden justify-between items-center">
                                <div className="flex items-center flex-col">
                                    <p className="font-[200] text-[14px] md:text-[17px]">
                                        Market cap:
                                    </p>
                                    <p className="text-appPurple font-medium text-[17px] md:text-[20px]">
                                        $60k
                                    </p>
                                </div>

                                <div className="flex items-center flex-col">
                                    <p className="font-[200] text-[14px] md:text-[17px]">
                                        Delegated%:
                                    </p>
                                    <p className="text-appPurple font-medium text-[17px] md:text-[20px]">
                                        {memeCoinList[1].delegatedSupply}%
                                    </p>
                                </div>
                            </div>
                            <p className="md:text-appPurple font-[200] text-foreground md:italic text-[14px] lg:text-[15px] xl:text-[17.5px]">
                                {memeCoinList[1].description}
                            </p>
                        </div>
                    </Link>
                ) : (
                    <p>Loading....</p>
                )}

                <div className="w-[70%] bg-[#2C2D31] overflow-hidden rounded-none md:rounded-[8px] flex items-center">
                    <div className="md:w-[80%] w-full flex items-center">
                        <input
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                            }}
                            placeholder="Search for token"
                            className="md:py-[15px] placeholder:font-extralight py-[10px] w-[93%] outline-none bg-transparent placeholder:text-appGrey2 px-[15px] md:px-[20px]"
                        />
                        <BiSearchAlt
                            className="text-[#A6A7A9] mr-4 md:mr-0"
                            size={25}
                        />
                    </div>
                    <button className="w-[20%] hidden h-full md:flex justify-center hover:bg-appPurpleHover items-center text-center py-[15px] text-appDarkBlue px-[20px] bg-appPurple">
                        Search
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MemeHero
