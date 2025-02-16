'use client'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'

interface OpenOrder {
    _id: string
    orderId: string
    positionType: string
    type: string
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
    positionIdClosing: string | null
    deleted: boolean
    time: string
}

interface ApiResponse<T> {
    status: number
    msg: string
    data: T
}

const fetchUserOpenOrders = async (address: string): Promise<OpenOrder[]> => {
    try {
        const response = await axios.get<ApiResponse<OpenOrder[]>>(
            `${process.env.NEXT_PUBLIC_GET_USERS_OPEN_ORDERS}/${address}`
        )

        if (response.data.status === 200) {
            return response.data.data
        } else {
            console.error('Failed to fetch open orders:', response.data.msg)
            return []
        }
    } catch (error) {
        console.error('Error fetching open orders:', error)
        return []
    }
}

const OpenOrdersTables = () => {
    const [openOrders, setOpenOrders] = useState<OpenOrder[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const address = '0x65f6Dd5E5f4745B61E0f4b68d3dD5BD0B960F5b1'

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(null)
            const orders = await fetchUserOpenOrders(address)
            if (orders.length === 0) {
                setError('No open orders found.')
            }
            setOpenOrders(orders)
            setLoading(false)
        }

        fetchData()
    }, [])

    const formatTime = (isoString: string): string => {
        const date = new Date(isoString)
        return date.toLocaleTimeString('en-GB', { hour12: false })
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
                            <p className="ml-[20px]">Contracts</p>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            Filled/Total
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            Order Price
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            Trigger Price
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            Trade Type
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            Order Type
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            Status
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            Order No.
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            Order Time
                        </TableCell>
                    </TableRow>
                </TableHead>
                {/* Table body */}
                <TableBody>
                    {openOrders.length > 0 ? (
                        openOrders.map((order) => (
                            <TableRow key={order._id}>
                                {/* contracts */}
                                <TableCell>
                                    <div className="ml-[20px]">
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
                                    </div>
                                </TableCell>
                                {/* filled/total */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.filled === false ? 'false' : 'true'}
                                </TableCell>
                                {/* order price */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.price.toFixed(2)}
                                </TableCell>
                                {/* trigger price */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.price.toFixed(2)}
                                </TableCell>
                                {/* trade type */}
                                <TableCell
                                    sx={{
                                        textAlign: 'center',
                                    }}
                                >
                                    <p
                                        className={` ${
                                            order.type === 'Buy'
                                                ? 'text-appGreen'
                                                : 'text-appDarkRed'
                                        }`}
                                    >
                                        {order.type}
                                    </p>
                                </TableCell>
                                {/* order type  */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.leverageType}
                                </TableCell>
                                {/* status */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.pickedUp === false
                                        ? 'false'
                                        : 'true'}
                                </TableCell>
                                {/* order no. */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.orderId}
                                </TableCell>
                                {/* order time */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {formatTime(order.time)}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={9} sx={{ textAlign: 'center' }}>
                                <div className="flex min-h-[40vh] justify-center items-center">
                                    <p className="text-appGrey text-[15px] font-medium">
                                        You have no open orders
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

export default OpenOrdersTables
