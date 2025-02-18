'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FiSearch } from 'react-icons/fi'
import { Button, styled } from '@mui/material'
import { useRouter } from 'next/navigation'
import { IoCloseSharp } from 'react-icons/io5'
import { useConnect, useAccount } from 'wagmi'

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

export default function ConnectWallet() {
    const router = useRouter()
    const { connectors, connect } = useConnect()
    const { isConnected } = useAccount() // To track connection status
    const [searchQuery, setSearchQuery] = useState('')

    const filteredConnectors = connectors.filter((connector) =>
        connector.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // router.push('/connect-wallet/signin-message') // Navigate to the respective route

    const connectorLogos: Record<string, string> = {
        injected: '/images/connect-wallet/1inch.svg',
        walletConnect: '/images/connect-wallet/wallet-connect.png',
        metaMaskSDK: '/images/connect-wallet/meta-mask.svg',
        safe: '/images/connect-wallet/trustwallet.svg',
        coinbaseWalletSDK: '/images/coinbase1.svg',
    }

    // Redirect to /trade after 2 seconds when connection is successful
    useEffect(() => {
        if (isConnected) {
            const timeout = setTimeout(() => {
                router.push('/trade')
            }, 2000) // Delay for 2 seconds

            // Clean up the timeout if the component is unmounted
            return () => clearTimeout(timeout)
        }
    }, [isConnected, router])

    console.log('list of connectors: ', connectors)
    return (
        <div className="w-full h-screen flex justify-center items-start md:items-center">
            <div className="2xl:w-[35%]  xl:w-[40%] lg:w-[50%] md:w-[75%] w-full shadow-sm rounded-[8px] py-[2rem] px-[1rem] md:px-[2rem] bg-[#111111] flex flex-col gap-[1rem]">
                <button
                    onClick={() => router.back()}
                    className="flex w-full justify-end"
                >
                    <div className="relative border-[1px] flex justify-center items-center border-appPurple w-[24px] rounded-full h-[24px]">
                        <IoCloseSharp size={18} className="text-appPurple" />
                    </div>
                </button>
                {/* header logo */}
                <div className="flex justify-center items-center gap-2">
                    <div className="w-[40px] h-[40px]">
                        <Image
                            src="/elvado-logo.svg"
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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search and connect your wallet"
                            className=" py-[7px] w-[93%] placeholder:text-[13px] placeholder:font-extralight outline-none bg-transparent placeholder:text-appGrey2 px-[15px] "
                        />
                        <FiSearch
                            className="text-appPurple mr-4 md:mr-0"
                            size={20}
                        />
                    </div>

                    {/* wallets */}
                    <div className="flex flex-wrap mt-[1rem] gap-4">
                        {filteredConnectors.map((connector) => (
                            <button
                                key={connector.uid}
                                className="border-[2px] rounded-[8px] py-[0.5rem] px-[0.7rem] flex gap-2 items-center transition-all border-[#4B5563] hover:border-appPurple"
                                onClick={() => connect({ connector })}
                            >
                                <div className="w-[25px] h-[25px]">
                                    <Image
                                        src={
                                            connectorLogos[connector.id] ||
                                            '/images/connect-wallet/meta-mask.svg'
                                        }
                                        alt={`${connector.name} Logo`}
                                        width={25}
                                        height={25}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <p className="text-appGrey capitalize text-[14px]">
                                    {connector.name}
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
                    <p className="text-[12px]">Sign in with key</p>
                    <div className="flex items-center gap-2">
                        <div className="w-[18px] h-[18px]">
                            <Image
                                src="/images/connect-wallet/qrcode.svg"
                                alt="QR code"
                                width={18}
                                height={18}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <p className="text-[12px]">Scan QR Code</p>
                    </div>
                </div>

                {/* or */}
                <div className="border-t-[#4B5563] mb-6 w-full relative border-t-[1px]">
                    <p className="py-0 px-4 text-[11px] absolute bg-background left-[47%] top-[-10px]">
                        or
                    </p>
                </div>

                {/* create account */}
                <CustomButton>Create Account</CustomButton>
            </div>
        </div>
    )
}
