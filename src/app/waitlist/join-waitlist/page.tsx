'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FiSearch } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { IoCloseSharp } from 'react-icons/io5'
import { useAccount, useConnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { isAddress } from 'viem'

export default function JoinWaitlist() {
    const router = useRouter()
    const [walletAddress, setWalletAddress] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const { connectors, connect } = useConnect()
    const { isConnected } = useAccount()

    const handleConnect = () => {
        if (!isAddress(walletAddress)) {
            alert('Invalid wallet address')
            return
        }

        // Connect using Wagmi injected connector
        connect({ connector: injected() })
    }

    // Redirect to /trade after 2 seconds when connection is successful
    useEffect(() => {
        let timeout: NodeJS.Timeout
        if (isConnected) {
            timeout = setTimeout(() => {
                router.push('/trade')
            }, 1000)
        }

        return () => clearTimeout(timeout)
    }, [isConnected, router])

    const filteredConnectors = connectors.filter((connector) =>
        connector.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const connectorLogos: Record<string, string> = {
        injected: '/images/connect-wallet/1inch.svg',
        walletConnect: '/images/connect-wallet/wallet-connect.png',
        metaMaskSDK: '/images/connect-wallet/meta-mask.svg',
        safe: '/images/connect-wallet/trustwallet.svg',
        coinbaseWalletSDK: '/images/coinbase1.svg',
    }

    console.log('wallet connectors: ', connectors)

    return (
        <div className="w-full h-screen flex justify-center items-start md:items-center">
            <div className="2xl:w-[35%]  xl:w-[40%] lg:w-[50%] md:w-[75%] w-full shadow-sm rounded-[8px] py-[2rem] px-[1rem] md:px-[2rem] bg-[#111111] flex flex-col gap-[1rem]">
                <button
                    onClick={() => router.back()}
                    className="flex w-full justify-end"
                >
                    <div className="relative border-[1px] flex justify-center items-center border-appPurple w-[20px] rounded-full h-[20px]">
                        <IoCloseSharp size={15} className="text-appPurple" />
                    </div>
                </button>

                <div className="border-[1px] px-[1rem] flex flex-col gap-2 py-[1rem] border-[#4B5563] rounded-[6px]">
                    <p className=" text-[18px] mt-3 mb-2  text-center">
                        Join waitlist
                    </p>

                    {/* enter wallet address */}
                    <input
                        type="text"
                        placeholder="Enter your wallet address"
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        className=" py-[10px] rounded-[8px] placeholder:text-[13px] w-full outline-none bg-[#2C2D31] font-light placeholder:text-appGrey2 px-[15px] "
                    />

                    <button
                        onClick={handleConnect}
                        className="w-full font-medium rounded-[6px] h-full flex justify-center hover:bg-appPurpleHover items-center text-center py-[8px] text-[#1C1C1C] text-[13px] px-[20px] bg-appPurple"
                    >
                        {isConnected ? 'Connected' : 'Join Waitlist'}
                    </button>

                    <div className="border-t-[#4B5563] my-2 w-full relative border-t-[1px]">
                        <p className="py-0 px-4 text-[11px] absolute bg-background left-[47%] top-[-10px]">
                            or
                        </p>
                    </div>
                    {/* search and connect wallet */}
                    <div className="px-[1.5rem] rounded-[8p]  bg-[#171717] py-[1.5rem]">
                        {/* search input */}
                        <div className=" w-full rounded-[20px] bg-[#2C2D31] flex items-center">
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search and connect your wallet"
                                className=" py-[7px] w-[93%] outline-none bg-transparent placeholder:text-[13px] placeholder:font-extralight placeholder:text-appGrey2 px-[15px] "
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
                </div>
            </div>
        </div>
    )
}
