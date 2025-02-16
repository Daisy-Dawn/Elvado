'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

interface Trade {
    _id: string
    orderId: string
    positionId: string
    opener: string
    positionType: string
    market: string
    entryPrice: number
    liquidationPrice: number
    size: number
    leverage: number
    leverageType: string
    closureInProgress: boolean
    tp: number
    sl: number
    openingMargin: number
    fundingRate: number
    time: string
}

type MarketPosition = {
    _id: string
    orderId: string
    positionType: 'long' | 'short'
    type: string
    opener: string
    market: string
    margin: number
    leverage: number
    leverageType: string
    size: number
    sizeLeft: number
    price: number
    tp: number
    sl: number
    pickedUp: boolean
    filled: boolean
    fillingOrders: unknown[] // Adjust type if needed
    isClosingPositionOrder: boolean
    positionIdClosing: string | null
    deleted: boolean
    time: string // Consider using Date type if you parse it
    __v: number
}

type MarketData = {
    longs: MarketPosition[]
    shorts: MarketPosition[]
    marketPrice: number
}

interface ApiContextType {
    fundingCountdown: number | null
    btcEntryPrice: number | null
    getMarketInfo: {
        volume24h: number
        change24h: number
        openInterest: number
        trades24h: number
        highLow24h: number[]
    } | null
    latestTrades: Trade[] | null
    loadingStates: {
        fundingCountdown: boolean
        btcEntryPrice: boolean
        marketInfo: boolean
        latestTrades: boolean
    }
    marketData: MarketData | null
    fetchFundingCountdown: () => void
    fetchBtcEntryPrice: () => void
    fetchMarketInfo: () => void
    fetchLatestTrades: () => void
}

const ApiContext = createContext<ApiContextType | undefined>(undefined)

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
    const [fundingCountdown, setFundingCountdown] = useState<number | null>(
        null
    )
    const [btcEntryPrice, setBtcEntryPrice] = useState<number | null>(null)
    const [getMarketInfo, setGetMarketInfo] =
        useState<ApiContextType['getMarketInfo']>(null)
    const [latestTrades, setLatestTrades] = useState<Trade[] | null>(null)
    const [marketData, setMarketData] = useState<MarketData | null>(null)
    const [loadingStates, setLoadingStates] = useState({
        fundingCountdown: false,
        btcEntryPrice: false,
        marketInfo: false,
        latestTrades: false,
    })

    // Fetch Latest Trades
    const fetchLatestTrades = async () => {
        setLoadingStates((prev) => ({ ...prev, latestTrades: true }))
        try {
            const { data } = await axios.get(
                process.env.NEXT_PUBLIC_GET_LATEST_TRADES as string
            )
            if (data.status === 200 && Array.isArray(data.data)) {
                setLatestTrades(data.data)
            } else {
                console.error('Failed to fetch latest trades:', data)
            }
        } catch (error) {
            console.error('Error fetching latest trades:', error)
        } finally {
            setLoadingStates((prev) => ({ ...prev, latestTrades: false }))
        }
    }

    // Fetch Funding Countdown
    const fetchFundingCountdown = async () => {
        setLoadingStates((prev) => ({ ...prev, fundingCountdown: true }))
        try {
            const { data } = await axios.get(
                process.env.NEXT_PUBLIC_GET_FUNDING_RATE_COUNTDOWN as string
            )
            if (data.status === 200) {
                setFundingCountdown(data.data.timeLeft)
            } else {
                console.error('Failed to fetch funding countdown:', data.msg)
            }
        } catch (error) {
            console.error('Error fetching funding countdown:', error)
        } finally {
            setLoadingStates((prev) => ({ ...prev, fundingCountdown: false }))
        }
    }

    // Fetch BTC Entry Price
    const fetchBtcEntryPrice = async () => {
        setLoadingStates((prev) => ({ ...prev, btcEntryPrice: true }))
        try {
            const { data } = await axios.get(
                process.env.NEXT_PUBLIC_GET_ENTRY_PRICING as string
            )
            if (data && data.open) {
                setBtcEntryPrice(data.open)
            } else {
                console.error('Failed to fetch BTC entry price:', data)
            }
        } catch (error) {
            console.error('Error fetching BTC entry price:', error)
        } finally {
            setLoadingStates((prev) => ({ ...prev, btcEntryPrice: false }))
        }
    }

    // Fetch Market Info
    const fetchMarketInfo = async () => {
        setLoadingStates((prev) => ({ ...prev, marketInfo: true }))
        try {
            const { data } = await axios.get(
                process.env.NEXT_PUBLIC_GET_MARKET_INFO as string
            )
            if (data.status === 200 && data.data) {
                setGetMarketInfo(data.data)
            } else {
                console.error('Failed to fetch market info:', data.msg)
            }
        } catch (error) {
            console.error('Error fetching market info:', error)
        } finally {
            setLoadingStates((prev) => ({ ...prev, marketInfo: false }))
        }
    }

    // WebSocket for Live Market Data
    useEffect(() => {
        const socket = new WebSocket(
            process.env.NEXT_PUBLIC_GET_MARKET_DATA as string
        )

        socket.onopen = () => {
            console.log('WebSocket connected for market data')
        }

        socket.onmessage = (event) => {
            try {
                const liveData: MarketData = JSON.parse(event.data)
                console.log('Live Market Data:', liveData)
                setMarketData(liveData)
            } catch (error) {
                console.error('Error parsing WebSocket data:', error)
            }
        }

        socket.onerror = (error) => {
            console.error('WebSocket error:', error)
        }

        socket.onclose = () => {
            console.log('WebSocket disconnected')
        }

        return () => {
            socket.close()
        }
    }, [])

    useEffect(() => {
        fetchFundingCountdown()
        fetchBtcEntryPrice()
        fetchMarketInfo()
        fetchLatestTrades() // Fetch latest trades on mount
    }, [])

    return (
        <ApiContext.Provider
            value={{
                fundingCountdown,
                btcEntryPrice,
                getMarketInfo,
                latestTrades,
                loadingStates,
                marketData,
                fetchFundingCountdown,
                fetchBtcEntryPrice,
                fetchMarketInfo,
                fetchLatestTrades,
            }}
        >
            {children}
        </ApiContext.Provider>
    )
}

export const useApi = () => {
    const context = useContext(ApiContext)
    if (!context) {
        throw new Error('useApi must be used within an ApiProvider')
    }
    return context
}
