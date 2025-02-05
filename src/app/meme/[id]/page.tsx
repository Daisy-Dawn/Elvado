'use client'
import { Button, ButtonProps, styled } from '@mui/material'
import { useState } from 'react'

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
const CustomButton1 = styled(Button)({
    backgroundColor: '#B5A8F7',
    borderRadius: '8px',
    color: '#1C1C1C',
    minWidth: '100px',
    fontWeight: '500',
    textTransform: 'none',
    // padding: '10px 13px',
    fontSize: '15px',
    transition: 'background-color 0.3s ease-in-out',
    '&:hover': {
        backgroundColor: '#222222',
        color: '#B5A8F7',
    },
})

export default function BuyOrSellMeme() {
    const [activeButton, setActiveButton] = useState<string>('Buy')
    return (
        <div className="w-full min-h-[85vh] flex justify-center items-center">
            <div className="w-[40%] shadow-sm rounded-[8px] py-[2rem] px-[2rem] bg-[#06070A] bg-opacity-40 flex flex-col gap-[1rem]">
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
                    <div className="bg-[#171717] px-[15px] py-[10px] w-fit border-[1px] border-appPurple rounded-[11px]">
                        <p className="font-medium text-[17px]">
                            Balance:{' '}
                            <span className="font-semibold">5000Usdt</span>
                        </p>
                    </div>
                </div>

                {/* amount */}
                <div className="flex w-full flex-col">
                    <p>Enter Amount</p>
                    <div className="w-full py-[15px] px-[20px] bg-[#171717] border-[1px] border-appPurple overflow-hidden rounded-[13px] flex items-center">
                        <input
                            placeholder="Min amount is 100 Usdt"
                            type="text"
                            name="amount"
                            className=" w-full placeholder:text-appPurple  outline-none bg-transparent  "
                        />

                        <div className="bg-appPurple  text-appDarkBlue py-1 px-1">
                            Max
                        </div>
                    </div>
                </div>

                {/* you'd get comp */}
                <div className="flex justify-between mt-[1rem] mb-2 items-center">
                    <p className="text-[17px]">You&apos;d get:</p>
                    <p className="font-medium uppercase text-[20px]">500PWD</p>
                </div>

                {/* submit button */}
                <CustomButton1>
                    {activeButton === 'Buy' && <p className="py-1">Buy</p>}
                    {activeButton === 'Sell' && <p className="py-1">Sell</p>}
                </CustomButton1>
            </div>
        </div>
    )
}
