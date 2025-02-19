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
import { useAccount } from 'wagmi'

export interface OpenOrder {
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

export interface ApiResponse<T> {
    status: number
    msg: string
    data: T
}

const OpenOrdersTables = () => {
    const [openOrders, setOpenOrders] = useState<OpenOrder[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const { address } = useAccount()

    useEffect(() => {
        const fetchUserOpenOrders = async () => {
            setLoading(true) // Set loading before starting the request
            try {
                const response = await axios.get<ApiResponse<OpenOrder[]>>(
                    `${process.env.NEXT_PUBLIC_GET_USERS_OPEN_ORDERS}/${address}`
                )

                if (response.data.status === 200) {
                    setOpenOrders(response.data.data)
                }
            } catch (error) {
                console.log('Error fetching open orders:', error)
                setError('Error fetching open orders')
            } finally {
                setLoading(false) // Ensure loading is always set to false
            }
        }

        fetchUserOpenOrders()
    }, [address]) // Include `address` in dependency array if it changes

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
                    {address && openOrders.length > 0 ? (
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
                                            order.leverageType === 'Buy'
                                                ? 'text-appGreen'
                                                : 'text-appDarkRed'
                                        }`}
                                    >
                                        {order.leverageType}
                                    </p>
                                </TableCell>
                                {/* order type  */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.type}
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
                                <div className="flex min-h-[40vh] w-full justify-center items-center">
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
