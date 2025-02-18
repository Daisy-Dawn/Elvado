'use client'
import { useState, useEffect } from 'react'
import { Button, ButtonProps } from '@mui/material'
import { styled } from '@mui/system'
import MemeCard from './MemeCard'
import Link from 'next/link'
import axios from 'axios'
import { useAppContext } from '../context/AppContext'
import Jazzicon from 'react-jazzicon'

interface CustomButtonProps extends ButtonProps {
    isActive?: boolean
}

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
    const { searchTerm, memeCoinList, setMemeCoinList } = useAppContext()

    useEffect(() => {
        const fetchMemes = async () => {
            try {
                const endpoint =
                    activeButton === 'New'
                        ? process.env.NEXT_PUBLIC_GET_TOKENS
                        : process.env.NEXT_PUBLIC_FETCH_MEMES

                const response = await axios.get(endpoint!)
                if (response.data.status === 200) {
                    setMemeCoinList(response.data.data.tokens)
                }
            } catch (error) {
                console.log('Error fetching memes:', error)
            }
        }

        fetchMemes()
    }, [activeButton]) // Re-run fetch when activeButton changes

    // Filter the memeCoinList based on searchTerm
    const filteredMemes = searchTerm
        ? memeCoinList.filter((meme) =>
              meme.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : memeCoinList

    return (
        <div className="flex flex-col px-0 xl:px-[1rem] 2xl:px-[4rem] lg:mt-[3rem] xl:mt-[2rem] gap-[2.5rem]">
            {/* Top Buttons */}
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

            {/* Meme Coins Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMemes.length > 0 ? (
                    filteredMemes.map((meme, index) => (
                        <Link key={meme.tokenId} href={`/meme/${meme.tokenId}`}>
                            <MemeCard
                                image={
                                    index === 0 ? (
                                        <Jazzicon diameter={120} seed={0} /> // Always use the same seed for index 0
                                    ) : (
                                        <Jazzicon diameter={120} seed={index} /> // Regular behavior for other indexes
                                    )
                                }
                                name={meme.name}
                                createdBy={meme.creator}
                                marketCap="$60k"
                                remark={meme.description}
                                delegated={meme.delegatedSupply}
                            />
                        </Link>
                    ))
                ) : (
                    <p className="flex col-span-3 w-full justify-center">
                        No results found...
                    </p>
                )}
            </div>
        </div>
    )
}

export default MemeCoinsDisplay
