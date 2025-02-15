'use client'
import { useApi } from '@/components/context/ApiContext'
import { CircularProgress } from '@mui/material'

export default function RecentTrades() {
    const { latestTrades, loadingStates } = useApi()
    const formatTime = (isoString: string): string => {
        const date = new Date(isoString)
        return date.toLocaleTimeString('en-GB', { hour12: false })
    }
    return (
        <div className=" min-h-[150px] text-[11px] rounded-[8px] bg-background">
            <div className="border-b-[1px] text-[12px] py-[0.5rem] px-[0.7rem]  border-b-[#374151] flex justify-start items-center ">
                <p className="font-medium ">Recent Trades</p>
            </div>

            {/* recent trades map */}
            {loadingStates.latestTrades ? (
                <div className="min-h-[130px] flex justify-center items-center">
                    <CircularProgress color="secondary" size={18} />
                </div>
            ) : (
                latestTrades?.slice(0, 7).map((trade) => (
                    <div
                        key={trade.orderId}
                        className="text-[11px] mt-[2px] grid grid-cols-3 w-full"
                    >
                        {/* price */}
                        <p
                            className={` px-[0.7rem] ${
                                trade.positionType === 'short'
                                    ? 'text-[#FF6B6B]'
                                    : 'text-[#32CD89]'
                            }`}
                        >
                            {trade.entryPrice
                                .toFixed(2)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </p>
                        {/* size */}
                        <p className=" px-[0.4rem]">{trade.size}</p>
                        {/* time */}
                        <p className="text-end px-[0.7rem] ">
                            {formatTime(trade.time)}
                        </p>
                    </div>
                ))
            )}
        </div>
    )
}
