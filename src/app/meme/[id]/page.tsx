'use client'
import { Button, ButtonProps, styled } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useParams } from 'next/navigation'

interface CustomButtonProps extends ButtonProps {
    isActive?: boolean
}

type Token = {
    _id: string
    tokenId: string
    name: string
    ticker: string
    description: string
    totalSupply: number
    delegatedSupply: number
    dateCreated: string
    __v: number
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

export default function BuyOrSellMeme() {
    const [activeButton, setActiveButton] = useState<string>('Buy')
    const [amount, setAmount] = useState('')
    const [ticker, setTicker] = useState<string>('')
    const [tokens, setTokens] = useState<Token[]>([])

    const router = useRouter()
    const { id } = useParams()

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const response = await fetch(
                    process.env.NEXT_PUBLIC_FETCH_MEMES as string
                )
                const data: { status: number; data: { tokens: Token[] } } =
                    await response.json()

                if (data.status === 200 && data.data.tokens) {
                    setTokens(data.data.tokens)
                }
            } catch (error) {
                console.error('Error fetching tokens:', error)
            }
        }

        fetchTokens()
    }, [])

    useEffect(() => {
        if (id && tokens.length > 0) {
            const foundToken = tokens.find((token) => token.tokenId === id)
            if (foundToken) {
                setTicker(foundToken.ticker)
            }
        }
    }, [id, tokens]) // Runs when `id` or `tokens` change // Runs when id or memeCoinList updates

    return (
        <div className=" min-h-[85vh] ">
            <div className="flex w-[70%] mb-[2rem] justify-end">
                <button
                    onClick={() => router.back()}
                    className="relative border-[1px] flex justify-center items-center border-appPurple w-[24px] rounded-full h-[24px]"
                >
                    <IoCloseSharp size={18} className="text-appPurple" />
                </button>
            </div>
            <div className="flex justify-center min-h-[77vh] items-start md:items-center w-full">
                <div className="xl:w-[40%] lg:w-[45%] md:w-[75%] w-full shadow-sm rounded-[8px] py-[2rem] px-[1rem] md:px-[2rem] md:bg-[#06070A] md:bg-opacity-40 flex flex-col gap-[1rem]">
                    {/* top buttons */}
                    <div className="flex justify-center items-center">
                        <div className="flex  bg-[#222222] w-fit rounded-[8px] gap-[1px] items-center">
                            <CustomButton
                                isActive={activeButton === 'Buy'}
                                onClick={() => setActiveButton('Buy')}
                            >
                                Buy
                            </CustomButton>
                            <CustomButton
                                isActive={activeButton === 'Sell'}
                                onClick={() => setActiveButton('Sell')}
                            >
                                Sell
                            </CustomButton>
                        </div>
                    </div>

                    {/* balance */}
                    <div className="flex justify-center items-center">
                        <div className="bg-[#171717] px-[15px] py-[5px] w-fit border-[1px] border-appPurple rounded-[11px]">
                            <p className=" text-[15px] xl:text-[17px]">
                                Balance:{' '}
                                <span className="font-medium">5000Usdt</span>
                            </p>
                        </div>
                    </div>

                    {/* amount */}
                    <div className="flex w-full mt-[1.5rem] md:mt-0 flex-col">
                        <p className="text-[14px] font-light xl:text-[15px]">
                            Enter Amount
                        </p>
                        <div className="w-full py-[12px] md:py-[10px] px-[20px] bg-[#171717] border-[1px] border-appPurple overflow-hidden rounded-[13px] flex items-center">
                            <input
                                placeholder="Min amount is 100 Usdt"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                type="text"
                                name="amount"
                                className=" w-full placeholder:text-[#626570] placeholder:font-light placeholder:text-[8px] md:placeholder:text-base  outline-none bg-transparent  "
                            />

                            <div className="bg-appPurple rounded-[4px]  text-appDarkBlue text-[12px]  py-[1px] px-[1px] md:px-1">
                                Max
                            </div>
                        </div>
                    </div>

                    {/* you'd get comp */}
                    <div className="flex justify-between  mb-[2.5rem]  items-center">
                        <p className="text-[14px] font-light xl:text-[15px]">
                            You&apos;d get:
                        </p>
                        <p className="font-medium uppercase text-[18px] xl:text-[20px]">
                            500{ticker}
                        </p>
                    </div>

                    {/* submit button */}
                    <button
                        disabled={amount === ''}
                        className={`bg-[#B5A8F7] rounded-[8px] text-[#1C1C1C] min-w-[100px] font-medium text-[15px] transition-colors duration-300 ease-in-out hover:bg-[#9186C6] py-2 disabled:bg-[#9186C6] disabled:bg-opacity-80 disabled:cursor-not-allowed `}
                    >
                        {activeButton === 'Buy' && <p className="py-1">Buy</p>}
                        {activeButton === 'Sell' && (
                            <p className="py-1">Sell</p>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
