'use client'
import { useApi } from '@/components/context/ApiContext'
import { CircularProgress } from '@mui/material'
import { HiArrowSmUp } from 'react-icons/hi'

export default function OrderBookComp() {
    const { marketData } = useApi()
    console.log('Market Data in Component:', marketData)

    return (
        <div className=" text-[11px] ">
            {/* header texts */}
            <div className=" text-[10px] text-[#CFD3E5]  py-[0.4rem] px-[0.7rem] grid grid-cols-3 w-full  ">
                <p className="font-extralight">Size(BTC)</p>
                <p className="font-extralight">Price(USD)</p>
                <p className="font-extralight text-end">My size</p>
            </div>

            {/* short */}
            <div className="mb-2">
                {!marketData || Object.keys(marketData).length === 0 ? (
                    <div className="min-h-[130px] flex justify-center items-center">
                        <CircularProgress color="secondary" size={18} />
                    </div>
                ) : (
                    marketData.shorts?.slice(0, 7).map((short) => (
                        <div
                            key={short.orderId}
                            className="text-[11px] mt-[2px] grid grid-cols-3 w-full"
                            style={{
                                background: `linear-gradient(
                        to right, 
                        rgba(255, 107, 107, 0.8) 0%, 
                        rgba(255, 107, 107, 0.8) 30%, 
                        rgba(255, 107, 107, 0.3) 30%, 
                        rgba(255, 107, 107, 0.3) 100%
                    )`,
                            }}
                        >
                            {/* size */}
                            <p className="bg-inherit px-[0.7rem]">
                                {short.size}
                            </p>
                            {/* price */}
                            <p className="text-[#FF6B6B] bg-inherit px-[0.4rem]">
                                {parseFloat(short.price)
                                    .toFixed(2)
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </p>
                            {/* my size (no background) */}
                            <p className="text-end px-[0.7rem] bg-background">
                                -
                            </p>
                        </div>
                    ))
                )}
            </div>

            {/* market data */}
            <div className="flex border-y-[#374151]  border-y-[1px] gap-[2px] w-full text-[12px] px-[0.8rem] py-[4px] items-center">
                <HiArrowSmUp
                    className="text-[#32CD89] font-semibold"
                    size={18}
                />
                <p className="text-[#32CD89]  font-semibold">
                    {' '}
                    {parseFloat(marketData?.marketPrice)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                </p>
            </div>

            {/* longs */}
            {!marketData || Object.keys(marketData).length === 0 ? (
                <div className="min-h-[130px] flex justify-center items-center">
                    <CircularProgress color="secondary" size={18} />
                </div>
            ) : (
                marketData.longs?.slice(0, 7).map((long) => (
                    <div
                        key={long.orderId}
                        className="text-[11px] mt-[2px] grid grid-cols-3 w-full"
                        style={{
                            background: `linear-gradient(
                        to right, 
                        rgba(50,205,137, 0.8) 0%, 
                        rgba(50,205,137, 0.8) 20%, 
                        rgba(50,205,137, 0.3) 20%, 
                        rgba(50,205,137, 0.3) 100%
                    )`,
                        }}
                    >
                        {/* size */}
                        <p className="bg-inherit px-[0.7rem]">{long.size}</p>
                        {/* price */}
                        <p className="text-[#32CD89] bg-inherit px-[0.4rem]">
                            {parseFloat(long.price)
                                .toFixed(2)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </p>
                        {/* my size (no background) */}
                        <p className="text-end px-[0.7rem] bg-background">-</p>
                    </div>
                ))
            )}
        </div>
    )
}
