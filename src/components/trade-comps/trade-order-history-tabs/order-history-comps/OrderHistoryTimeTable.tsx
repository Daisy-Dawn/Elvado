'use client'
import React, { useEffect, useState } from 'react'
import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
import axios from 'axios'
import { useAccount } from 'wagmi'

interface OrderHistoryTimeTableProps {
    value: 'day' | 'week' | 'month'
}
interface Order {
    _id: string
    orderId: string
    positionType: 'long' | 'short'
    type: 'limit' | 'market'
    opener: string
    market: string
    margin: number
    leverage: number
    leverageType: string
    size: number | null
    sizeLeft: number | null
    price: number
    tp: number
    sl: number
    pickedUp: boolean
    filled: boolean
    fillingOrders: unknown[]
    isClosingPositionOrder: boolean
    positionIdClosing: string
    deleted: boolean
    time: string // ISO string
    __v: number
}

export interface OrdersResponse {
    status: number
    msg: string
    data: Order[]
}

const OrderHistoryTimeTable: React.FC<OrderHistoryTimeTableProps> = ({
    value,
}) => {
    const { address } = useAccount()
    const API_URL = process.env.NEXT_PUBLIC_GET_USERS_ORDERS_RANGE
    const fetchOrders = async () => {
        try {
            const response = await axios.get<OrdersResponse>(
                `${API_URL}/${address}/${value}`
            )
            setOrders(response.data.data)
        } catch (error) {
            console.error('Error fetching orders:', error)
            setError('Failed to fetch orders')
            return []
        } finally {
            setLoading(false)
        }
    }

    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const formatTime = (isoString: string): string => {
        const date = new Date(isoString)
        return date.toLocaleTimeString('en-GB', { hour12: false })
    }

    useEffect(() => {
        fetchOrders()
    }, [value])

    if (loading)
        return (
            <div className="min-h-[40vh] w-full flex justify-center items-center">
                <CircularProgress color="secondary" size={25} />
            </div>
        )
    if (error)
        return (
            <div className="min-h-[40vh] flex justify-center items-center">
                <p>{error}</p>
            </div>
        )

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
                            <p className="ml-[10px]">Time</p>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            Symbol
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Type</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Side</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            Avergae
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            Price
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            Executed
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            Amount
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            Reduce Only
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            Post Only
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            Trigger Conditions
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            Status
                        </TableCell>
                    </TableRow>
                </TableHead>
                {/* Table body */}
                <TableBody>
                    {address && orders.length > 0 ? (
                        orders.map((order) => (
                            <TableRow key={order.orderId}>
                                {/* time */}
                                <TableCell>
                                    <p className="ml-[10px]">
                                        {formatTime(order.time)}
                                    </p>
                                </TableCell>
                                {/* symbol */}
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <span className="font-semibold uppercase text-foreground">
                                            {order.market}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            color: '#CFD3E5',
                                            fontSize: '12px',
                                        }}
                                    >
                                        Perpetual
                                    </div>
                                </TableCell>
                                {/* type */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.type}
                                </TableCell>
                                {/* side */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <p
                                        className={` ${
                                            order.positionType === 'long'
                                                ? 'text-appGreen'
                                                : 'text-appDarkRed'
                                        }`}
                                    >
                                        {order.positionType}
                                    </p>
                                </TableCell>
                                {/* average */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.price}
                                </TableCell>
                                {/* price */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.price}
                                </TableCell>
                                {/* executed */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.price}
                                </TableCell>
                                {/* amount */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.price}
                                </TableCell>
                                {/* reduceOnly */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.pickedUp}
                                </TableCell>
                                {/* postOnly */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.filled}
                                </TableCell>
                                {/* triggerConditions */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    -
                                </TableCell>
                                {/* status */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.leverageType}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={12}
                                sx={{ textAlign: 'center' }}
                            >
                                <div className="flex min-h-[40vh] w-full justify-center items-center">
                                    <p className="text-appGrey text-[15px] font-medium">
                                        You have no order history
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

export default OrderHistoryTimeTable
