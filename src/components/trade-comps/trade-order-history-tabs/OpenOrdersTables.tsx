import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'

const OpenOrdersTables = () => {
    const openOrders = [
        {
            contracts: 'BTC',
            filledTotal: '-',
            orderPrice: '200,057.25',
            triggerPrice: '200,057.25',
            tradeType: 'Buy',
            orderType: 'Stop Limit',
            status: 'Expired',
            orderNo: '-',
            orderTime: '2022-06-20 20:40:30',
        },
        {
            contracts: 'BTC',
            filledTotal: '-',
            orderPrice: '200,057.25',
            triggerPrice: '200,057.25',
            tradeType: 'Buy',
            orderType: 'Stop Limit',
            status: 'Expired',
            orderNo: '-',
            orderTime: '2022-06-20 20:40:30',
        },
    ]
    return (
        <TableContainer sx={{ mb: '2rem' }}>
            <Table
                size="small"
                sx={{
                    color: '#CFD3E5',
                    '& .MuiTableCell-root': {
                        padding: '12px 10px !important',
                        color: '#CFD3E5',
                        fontWeight: '400',
                        fontSize: '12px',
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
                        openOrders.map((order, index) => (
                            <TableRow key={index}>
                                {/* contracts */}
                                <TableCell>
                                    <div className="ml-[20px]">
                                        <div className="flex items-center gap-1">
                                            <span className="font-semibold text-foreground">
                                                {order.contracts}
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
                                    {order.filledTotal}
                                </TableCell>
                                {/* order price */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.orderPrice}
                                </TableCell>
                                {/* trigger price */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.triggerPrice}
                                </TableCell>
                                {/* trade type */}
                                <TableCell
                                    sx={{
                                        textAlign: 'center',
                                    }}
                                >
                                    <p
                                        className={` ${
                                            order.tradeType === 'Buy'
                                                ? 'text-appGreen'
                                                : 'text-appDarkRed'
                                        }`}
                                    >
                                        {order.tradeType}
                                    </p>
                                </TableCell>
                                {/* order type  */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.orderType}
                                </TableCell>
                                {/* status */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.status}
                                </TableCell>
                                {/* order no. */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.orderNo}
                                </TableCell>
                                {/* order time */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.orderTime}
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
