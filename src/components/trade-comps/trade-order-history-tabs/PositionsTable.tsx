import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    styled,
    Button,
    CircularProgress,
} from '@mui/material'
import { IoChatboxOutline } from 'react-icons/io5'
import { FaCirclePlus } from 'react-icons/fa6'
import axios from 'axios'
import { useApi } from '@/components/context/ApiContext'
import { useAccount } from 'wagmi'

interface UserPosition {
    _id: string
    orderId: string
    positionId: string
    opener: string
    positionType: 'long' | 'short'
    market: string
    entryPrice: number
    liquidationPrice: number
    size: number
    leverage: number
    leverageType: 'fixed' | 'cross'
    closureInProgress: boolean
    tp: number
    sl: number
    openingMargin: number
    fundingRate: number
    time: string // ISO date string
    __v: number
}

interface ApiResponse<T> {
    status: number
    msg: string
    data: T
}

interface PositionsTableProps {
    showPositions: boolean
}

const CloseAllButton = styled(Button)({
    backgroundColor: '#FF6B6B',
    borderRadius: '8px',
    color: 'white',
    textTransform: 'none',
    padding: '1.5px 14px',
    fontSize: '11px',
    '&:hover': {
        backgroundColor: '#cc2f2f',
    },
})

const PositionsTable: React.FC<PositionsTableProps> = ({ showPositions }) => {
    const [userPositions, setUserPositions] = useState<UserPosition[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const { marketData } = useApi()

    const { address } = useAccount()

    // Fetch user positions
    const fetchUserPositions = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await axios.get<ApiResponse<UserPosition[]>>(
                `${process.env.NEXT_PUBLIC_GET_USERS_POSITIONS}/${address}`
            )

            if (response.data.status === 200) {
                setUserPositions(response.data.data)
            } else {
                console.log(
                    'Failed to fetch user positions:',
                    response.data.msg
                )
                setError('Failed to fetch user positions')
            }
        } catch (error) {
            console.log('Error fetching user positions:', error)
            setError('Error fetching user positions')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUserPositions()
    }, [])

    const calculatePnl = (
        positionType: 'long' | 'short',
        size: number,
        entryPrice: number,
        marketPrice: number
    ): number => {
        if (positionType === 'long') {
            return size * (marketPrice - entryPrice)
        } else {
            return size * (entryPrice - marketPrice)
        }
    }

    const calculateRoe = (pnl: number, openingMargin: number): number => {
        return (pnl / openingMargin) * 100
    }

    if (loading)
        return (
            <div className="min-h-[40vh] flex justify-center items-center">
                <CircularProgress color="secondary" size={25} />
            </div>
        )
    if (error) return <div>{error}</div>

    return (
        <TableContainer sx={{ mb: '2rem' }}>
            <Table
                size="small"
                sx={{
                    color: '#CFD3E5',
                    '& .MuiTableCell-root': {
                        padding: '8px 10px !important',
                        color: '#CFD3E5',
                        fontWeight: '400',
                        fontSize: '11px',

                        borderBottom: '1px solid #2C2D31',
                    },
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <p className="ml-[20px]">Symbol</p>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'end' }}>Size</TableCell>
                        <TableCell sx={{ textAlign: 'end' }}>Margin</TableCell>
                        <TableCell sx={{ textAlign: 'end' }}>
                            Entry Price
                        </TableCell>
                        <TableCell sx={{ textAlign: 'end' }}>
                            Mark Price
                        </TableCell>
                        <TableCell sx={{ textAlign: 'end' }}>
                            Liq. Price
                        </TableCell>
                        <TableCell sx={{ textAlign: 'end' }}>
                            Margin Ratio
                        </TableCell>
                        <TableCell sx={{ textAlign: 'end' }}>
                            PNL (ROE %)
                        </TableCell>
                        <TableCell>
                            <div className="flex justify-end">
                                <CloseAllButton>
                                    Close all positions
                                </CloseAllButton>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                {/* Table body */}
                <TableBody>
                    {address && showPositions && userPositions.length > 0 ? (
                        userPositions.map((position, index) => {
                            const marketPrice = marketData?.marketPrice ?? 0
                            const pnl = calculatePnl(
                                position.positionType,
                                position.size,
                                position.entryPrice,
                                marketPrice
                            )
                            const roe = calculateRoe(
                                pnl,
                                position.openingMargin
                            )

                            return (
                                <TableRow key={position._id}>
                                    {/* symbol */}
                                    <TableCell>
                                        <div className="ml-[20px]">
                                            <div className="flex  items-center gap-1">
                                                <span className="font-semibold uppercase text-foreground">
                                                    {position.market}
                                                </span>
                                                {index === 0 && (
                                                    <span className="flex justify-center items-center text-[10px] leading-none py-[3px] px-1 text-center text-[#CDB064] bg-[#353120]">
                                                        {position.leverage}x
                                                    </span>
                                                )}
                                            </div>
                                            <div
                                                style={{
                                                    color: '#CFD3E5',
                                                    fontSize: '12px',
                                                }}
                                            >
                                                Perpetual
                                            </div>
                                        </div>
                                    </TableCell>
                                    {/* size */}
                                    <TableCell sx={{ textAlign: 'end' }}>
                                        <p className="text-appPurple font-semibold">
                                            {position.size} USD
                                        </p>
                                    </TableCell>
                                    {/* margin */}
                                    <TableCell sx={{ textAlign: 'end' }}>
                                        <div className="flex justify-end gap-1">
                                            <p>
                                                {position.openingMargin.toFixed(
                                                    2
                                                )}{' '}
                                                USD
                                            </p>
                                            <button>
                                                <FaCirclePlus
                                                    size={14}
                                                    color="#B7ABF7"
                                                />
                                            </button>
                                        </div>
                                    </TableCell>
                                    {/* entry price */}
                                    <TableCell sx={{ textAlign: 'end' }}>
                                        {position.entryPrice.toFixed(2)}
                                    </TableCell>
                                    {/* mark price */}
                                    <TableCell sx={{ textAlign: 'end' }}>
                                        {position.entryPrice.toFixed(2)}
                                    </TableCell>
                                    {/* liq price */}
                                    <TableCell sx={{ textAlign: 'end' }}>
                                        {position.liquidationPrice.toFixed(2)}
                                    </TableCell>
                                    {/* margin ratio */}
                                    <TableCell sx={{ textAlign: 'end' }}>
                                        {(
                                            (position.entryPrice *
                                                position.size) /
                                            position.openingMargin
                                        ).toFixed(2)}
                                        %
                                    </TableCell>
                                    {/* pnl */}
                                    <TableCell
                                        width="150px"
                                        sx={{ textAlign: 'end' }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'end',
                                                gap: '4px',
                                            }}
                                        >
                                            <div className="flex  flex-col">
                                                <span
                                                    className={`${
                                                        position.positionType ===
                                                        'long'
                                                            ? '#4caf50'
                                                            : '#DC2626'
                                                    }`}
                                                >
                                                    {pnl.toFixed(2)} USD
                                                </span>
                                                {/* ROE */}
                                                <span
                                                    style={{ color: '#4caf50' }}
                                                >
                                                    ({roe.toFixed(2)}%)
                                                </span>
                                            </div>

                                            <IoChatboxOutline
                                                size={14}
                                                className="text-appPurple"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        colSpan={2}
                                        sx={{ textAlign: 'end' }}
                                    >
                                        <div className="flex gap-[8px] justify-end items-end">
                                            <button className="bg-[#2C2D31] text-[#CFD3E5] text-center flex justify-center items-center py-[2px] px-[5px] rounded-[8px] text-[10px] hover:bg-[#B7ABF7] hover:text-[#1C1C1C]">
                                                TP/SL
                                            </button>
                                            <button className="bg-[#FF6B6B] text-[#fff] flex justify-center items-center py-[2px] px-[5px] rounded-[8px] text-[9px] hover:bg-[#cc2f2f] ">
                                                Close
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={9} sx={{ textAlign: 'center' }}>
                                <div className="flex min-h-[40vh] justify-center items-center">
                                    <p className="text-appGrey text-[15px] font-medium">
                                        You have no open positions
                                    </p>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PositionsTable
