'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useApi } from '../context/ApiContext'
import { CircularProgress } from '@mui/material'

const MinHeader = () => {
    const {
        fundingCountdown,
        fetchFundingCountdown,
        btcEntryPrice,
        getMarketInfo,
        loadingStates,
    } = useApi()
    const [timeLeft, setTimeLeft] = useState<number | null>(null)

    useEffect(() => {
        if (fundingCountdown !== null) {
            setTimeLeft(fundingCountdown)
        }
    }, [fundingCountdown])

    useEffect(() => {
        if (timeLeft === null) return

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime !== null && prevTime > 0) {
                    return prevTime - 1000 // Reduce by 1 second
                } else {
                    clearInterval(interval)
                    fetchFundingCountdown() // Fetch new countdown when it hits 0
                    return 0
                }
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [timeLeft])

    // Convert milliseconds to mm:ss format
    const formatTime = (ms: number | null) => {
        if (ms === null) return 'Loading...'
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor((ms % 60000) / 1000)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    return (
        <div className="w-full flex items-center border-y-[4px] border-y-[#2C2D31] min-h-[40px]">
            <div className="flex lg:px-[0.5rem] xl:px-[1.2rem] py-[0.5rem] w-full gap-[1.3rem] 2xl:gap-[2rem] items-center">
                {/* btc logo and balance */}
                <div className="flex 2xl:w-[18%] xl:w-[20%] lg:w-[23%] justify-between items-center">
                    {/* btc logo */}
                    <div className="flex items-center gap-[12px]">
                        <div className="w-[16px] h-[16px]">
                            <Image
                                src="/images/header-square.svg"
                                alt="Elvado Logo"
                                width={16}
                                height={16}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="w-[18px] h-[18px]">
                            <Image
                                src="/images/bitcoin logo.svg"
                                alt="Elvado Logo"
                                width={18}
                                height={18}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* btcusd */}
                        <p className="font-semibold text-[13px] xl:text-[15px]">
                            BTCUSD
                        </p>
                    </div>

                    {/* balance */}
                    <p className="text-appPurple font-semibold text-[15px] xl:text-[18px]">
                        {loadingStates.btcEntryPrice ? (
                            <CircularProgress size={17} />
                        ) : btcEntryPrice ? (
                            `$${btcEntryPrice
                                .toFixed(2)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                        ) : (
                            '0.00'
                        )}
                    </p>
                </div>

                {/* trade chart */}
                <div className="flex items-center w-[82%]">
                    {/* Index Price */}
                    <div className="2xl:px-4 xl:px-3 lg:px-2 flex flex-col gap-0 justify-center border-r-[1px] border-r-[#374151]">
                        <p className="text-appLightGrey text-[10px] xl:text-[12px] capitalize">
                            Index Price
                        </p>
                        <div className="block lg:text-[11px] xl:text-[13px]">
                            <p>
                                {loadingStates.btcEntryPrice ? (
                                    <CircularProgress
                                        color="secondary"
                                        size={17}
                                    />
                                ) : btcEntryPrice ? (
                                    `$${btcEntryPrice
                                        .toFixed(2)
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                                ) : (
                                    '0.00'
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Oracle Price */}
                    <div className="2xl:px-4 xl:px-3 lg:px-2 flex flex-col gap-0 justify-center border-r-[1px] border-r-[#374151]">
                        <p className="text-appLightGrey text-[10px] xl:text-[12px] capitalize">
                            Oracle Price
                        </p>
                        <div className="block lg:text-[11px] xl:text-[13px]">
                            <p>
                                {loadingStates.btcEntryPrice ? (
                                    <CircularProgress
                                        color="secondary"
                                        size={17}
                                    />
                                ) : btcEntryPrice ? (
                                    `$${btcEntryPrice
                                        .toFixed(2)
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                                ) : (
                                    '0.00'
                                )}
                            </p>
                        </div>
                    </div>

                    {/* 24h Change */}
                    <div className="2xl:px-4 xl:px-3 lg:px-2 flex flex-col gap-0 justify-center border-r-[1px] border-r-[#374151]">
                        <p className="text-appLightGrey text-[10px] xl:text-[12px] capitalize">
                            24h Change
                        </p>
                        <div
                            style={{ color: '#40E080' }}
                            className="block lg:text-[11px] xl:text-[13px]"
                        >
                            <p>
                                {loadingStates.marketInfo ? (
                                    <CircularProgress
                                        color="secondary"
                                        size={17}
                                    />
                                ) : getMarketInfo ? (
                                    `$${getMarketInfo.change24h}%`
                                ) : (
                                    '0%'
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Open Interest */}
                    <div className="2xl:px-4 xl:px-3 lg:px-2 flex flex-col gap-0 justify-center border-r-[1px] border-r-[#374151]">
                        <p className="text-appLightGrey text-[10px] xl:text-[12px] capitalize">
                            Open Interest
                        </p>
                        <div
                            style={{ color: 'white' }}
                            className="block lg:text-[11px] xl:text-[13px]"
                        >
                            <p>
                                {loadingStates.marketInfo ? (
                                    <CircularProgress
                                        color="secondary"
                                        size={17}
                                    />
                                ) : getMarketInfo ? (
                                    `$${getMarketInfo?.openInterest
                                        .toFixed(2)
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                                ) : (
                                    '0.00'
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Funding/Countdown */}
                    <div className="2xl:px-4 xl:px-3 lg:px-2 flex flex-col gap-0 justify-center border-r-[1px] border-r-[#374151]">
                        <p className="text-appLightGrey text-[10px] xl:text-[12px] capitalize">
                            Funding/Countdown
                        </p>
                        <div
                            style={{ color: 'white' }}
                            className="block lg:text-[11px] xl:text-[13px]"
                        >
                            <p>
                                {loadingStates.marketInfo ? (
                                    <CircularProgress
                                        color="secondary"
                                        size={17}
                                    />
                                ) : getMarketInfo ? (
                                    formatTime(timeLeft)
                                ) : (
                                    '0.00'
                                )}
                            </p>
                        </div>
                    </div>

                    {/* 24h Volume */}
                    <div className="2xl:px-4 xl:px-3 lg:px-2 flex flex-col gap-0 justify-center border-r-[1px] border-r-[#374151]">
                        <p className="text-appLightGrey text-[10px] xl:text-[12px] capitalize">
                            24h Volume
                        </p>
                        <div
                            style={{ color: 'white' }}
                            className="block lg:text-[11px] xl:text-[13px]"
                        >
                            <p>
                                {loadingStates.marketInfo ? (
                                    <CircularProgress
                                        color="secondary"
                                        size={17}
                                    />
                                ) : getMarketInfo ? (
                                    `$${getMarketInfo?.volume24h
                                        .toFixed(2)
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                                ) : (
                                    '0.00'
                                )}
                            </p>
                        </div>
                    </div>

                    {/* 24h Trades */}
                    <div className="2xl:px-4 xl:px-3 lg:px-2 flex flex-col gap-0 justify-center border-r-[1px] border-r-[#374151]">
                        <p className="text-appLightGrey text-[10px] xl:text-[12px] capitalize">
                            24h Trades
                        </p>
                        <div
                            style={{ color: 'white' }}
                            className="block lg:text-[11px] xl:text-[13px]"
                        >
                            <p>
                                {loadingStates.marketInfo ? (
                                    <CircularProgress
                                        color="secondary"
                                        size={17}
                                    />
                                ) : getMarketInfo ? (
                                    `${getMarketInfo?.trades24h
                                        .toFixed(2)
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                                ) : (
                                    '0.00'
                                )}
                            </p>
                        </div>
                    </div>

                    {/* 24H High/24H Low */}
                    <div className="2xl:px-4 xl:px-3 lg:px-2 flex flex-col gap-0 justify-center ">
                        <p className="text-appLightGrey text-[10px] xl:text-[12px] capitalize">
                            24H High/24H Low
                        </p>
                        <div className="flex text-[#40E080] justify-start lg:text-[11px] xl:text-[13px]">
                            <p>
                                {loadingStates.marketInfo ? (
                                    <CircularProgress
                                        color="secondary"
                                        size={17}
                                    />
                                ) : getMarketInfo ? (
                                    `$${getMarketInfo?.highLow24h[0]
                                        .toFixed(2)
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                                ) : (
                                    '0.00'
                                )}
                            </p>
                            <p style={{ color: '#FF6B6B' }}>
                                {loadingStates.marketInfo ? (
                                    <CircularProgress
                                        color="secondary"
                                        size={17}
                                    />
                                ) : getMarketInfo ? (
                                    `/$${getMarketInfo?.highLow24h[1]
                                        .toFixed(2)
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                                ) : (
                                    '0.00'
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MinHeader
