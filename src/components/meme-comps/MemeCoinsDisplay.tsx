'use client'
import { useState } from 'react'
import { Button, ButtonProps } from '@mui/material'
import { styled } from '@mui/system'
import MemeCard from './MemeCard'
import Link from 'next/link'

interface CustomButtonProps extends ButtonProps {
    isActive?: boolean
}

// Extract `isActive` inside the styled function to prevent passing it to DOM
const CustomButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'isActive',
})<CustomButtonProps>(({ isActive }) => ({
    backgroundColor: isActive ? '#B5A8F7' : '#222',
    borderRadius: '8px',
    color: isActive ? '#1C1C1C' : '#fff',
    minWidth: '100px',
    fontWeight: '500',
    textTransform: 'none',
    padding: '5px 13px',
    fontSize: '14px',
    transition: 'background-color 0.3s ease-in-out',
    '&:hover': {
        backgroundColor: '#B5A8F7',
        color: '#1C1C1C',
    },
}))

const MemeCoinsDisplay = () => {
    const [activeButton, setActiveButton] = useState<string>('Trending')

    const memeCoinList = [
        {
            image: '/images/meme/pweedy-cat.png',
            name: 'pweedy cat',
            createdBy: 'czed',
            marketCap: '$60k',
            delegated: '60%',
            remark: 'This is the best meme token created by man',
        },
        {
            image: '/images/meme/czedwars.png',
            name: 'czedwars',
            createdBy: 'czed',
            marketCap: '$60k',
            delegated: '60%',
            remark: 'This is the best meme token created by man',
        },
        {
            image: '/images/meme/rug-me.png',
            name: 'rug me',
            createdBy: 'czed',
            marketCap: '$60k',
            delegated: '60%',
            remark: 'This is the best meme token created by man',
        },
    ]

    return (
        <div className="flex flex-col mt-[2rem] gap-[2rem]">
            {/* top buttons */}
            <div className="flex bg-[#222222] w-fit rounded-[8px] gap-[1px] items-center">
                <CustomButton
                    isActive={activeButton === 'Trending'}
                    onClick={() => setActiveButton('Trending')}
                >
                    Trending
                </CustomButton>
                <CustomButton
                    isActive={activeButton === 'New'}
                    onClick={() => setActiveButton('New')}
                >
                    New
                </CustomButton>
            </div>

            {/* meme coins card */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {memeCoinList.map((meme, index) => (
                    <Link key={index} href={`/meme/${index}`}>
                        <MemeCard
                            image={meme.image}
                            name={meme.name}
                            createdBy={meme.createdBy}
                            marketCap={meme.marketCap}
                            remark={meme.remark}
                            delegated={meme.delegated}
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default MemeCoinsDisplay
