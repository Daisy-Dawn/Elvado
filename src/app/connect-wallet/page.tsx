'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FiSearch } from 'react-icons/fi'
import { Button, styled } from '@mui/material'
import { useRouter } from 'next/navigation'

interface Wallet {
    logo: string
    name: string
    active: string
}

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

const walletList: Wallet[] = [
    {
        logo: '/images/connect-wallet/meta-mask.svg',
        name: 'Metamask',
        active: 'metamask',
    },
    {
        logo: '/images/connect-wallet/coinbase.svg',
        name: 'Coinbase Wallet',
        active: 'coinbase',
    },
    {
        logo: '/images/connect-wallet/wallet-connect.png',
        name: 'Wallet Connect',
        active: 'walletConnect',
    },
    {
        logo: '/images/connect-wallet/1inch.svg',
        name: '1inch',
        active: '1inch',
    },
    {
        logo: '/images/connect-wallet/rainbow.svg',
        name: 'Rainbow',
        active: 'rainbow',
    },
    {
        logo: '/images/connect-wallet/coin98.svg',
        name: 'Coin 98',
        active: 'coin98',
    },
    {
        logo: '/images/connect-wallet/zerion.png',
        name: 'Zerion',
        active: 'zerion',
    },
    {
        logo: '/images/connect-wallet/token-pocket.svg',
        name: 'Token Pocket',
        active: 'tokenpocket',
    },
    {
        logo: '/images/connect-wallet/trustwallet.svg',
        name: 'Trust Wallet',
        active: 'trustwallet',
    },
]

export default function ConnectWallet() {
    const [activeButton, setActiveButton] = useState<string>('metamask')
    const router = useRouter()

    const handleClick = (wallet: Wallet) => {
        setActiveButton(wallet.active)
        router.push('/connect-wallet/signin-message') // Navigate to the respective route
    }
    return (
        <div className="w-full h-screen flex justify-center items-start md:items-center">
            <div className="xl:w-[40%] lg:w-[60%] md:w-[75%] w-full shadow-sm rounded-[8px] py-[2rem] px-[1rem] md:px-[2rem] bg-background flex flex-col gap-[1rem]">
                {/* header logo */}
                <div className="flex justify-center items-center gap-2">
                    <div className="w-[40px] h-[40px]">
                        <Image
                            src="/images/Elvado logo.png"
                            alt="Elvado Logo"
                            width={40}
                            height={40}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <p className="text-foreground font-medium text-[21px]">
                        Welcome to Elvado
                    </p>
                </div>

                {/* search and connect wallet */}
                <div className="px-[1.5rem]  bg-[#171717] py-[1.5rem]">
                    {/* search input */}
                    <div className=" w-full rounded-[20px] bg-[#2C2D31] flex items-center">
                        <input
                            placeholder="Search for token"
                            className=" py-[10px] w-[93%] outline-none bg-transparent placeholder:text-appGrey2 px-[15px] "
                        />
                        <FiSearch
                            className="text-appPurple mr-4 md:mr-0"
                            size={25}
                        />
                    </div>

                    {/* wallets */}
                    <div className="flex flex-wrap mt-[2rem] gap-4">
                        {walletList.map((wallet) => (
                            <button
                                key={wallet.active}
                                onClick={() => handleClick(wallet)}
                                className={`border-[3px] rounded-[8px] py-[0.8rem] px-[0.8rem] flex gap-2 items-center transition-all 
                        ${
                            activeButton === wallet.active
                                ? 'border-appPurple'
                                : 'border-[#4B5563] hover:border-appPurple'
                        }`}
                            >
                                <div className="w-[27px] h-[27px]">
                                    <Image
                                        src={wallet.logo}
                                        alt={`${wallet.name} Logo`}
                                        width={27}
                                        height={27}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <p className="text-appGrey capitalize text-[14px]">
                                    {wallet.name}
                                </p>
                            </button>
                        ))}
                    </div>

                    <p className="text-end mt-[0.5rem] text-appGrey">
                        Step 1/2
                    </p>
                </div>

                {/* signin */}
                <div className="flex justify-between text-appGrey items-center">
                    <p>Sign in with key</p>
                    <div className="flex items-center gap-2">
                        <div className="w-[20px] h-[20px]">
                            <Image
                                src="/images/connect-wallet/qrcode.svg"
                                alt="QR code"
                                width={20}
                                height={20}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <p>Scan QR Code</p>
                    </div>
                </div>

                {/* or */}
                <div className="border-[#4B5563] mb-4 w-full relative border-[1px]">
                    <p className="py-0 px-4 absolute bg-background left-[47%] top-[-15px]">
                        or
                    </p>
                </div>

                {/* create account */}
                <CustomButton>Create Account</CustomButton>
            </div>
        </div>
    )
}
