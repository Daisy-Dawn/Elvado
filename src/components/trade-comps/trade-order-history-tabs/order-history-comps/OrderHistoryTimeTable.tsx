import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'

const OrderHistoryTimeTable = () => {
    const orderHistoryTable = [
        {
            time: '2022-06-20 20:40:30',
            symbol: 'BTC',
            type: 'Stop Limit',
            side: 'Sell',
            average: '19, 994.49',
            price: '19, 994.49',
            executed: '19, 994.49 USDC',
            amount: '19, 994.49 USDC',
            reduceOnly: 'Yes',
            postOnly: 'Yes',
            triggerConditions: '',
            status: 'Filled',
        },
        {
            time: '2022-06-20 20:40:30',
            symbol: 'BTC',
            type: 'Stop Limit',
            side: 'Buy',
            average: '19, 994.49',
            price: '19, 994.49',
            executed: '19, 994.49 USDC',
            amount: '19, 994.49 USDC',
            reduceOnly: 'No',
            postOnly: 'No',
            triggerConditions: '',
            status: 'Expired',
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
                    {orderHistoryTable.length > 0 ? (
                        orderHistoryTable.map((order, index) => (
                            <TableRow key={index}>
                                {/* time */}
                                <TableCell>
                                    <p className="ml-[10px]">{order.time}</p>
                                </TableCell>
                                {/* symbol */}
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <span className="font-semibold text-foreground">
                                            {order.symbol}
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
                                            order.side === 'Buy'
                                                ? 'text-appGreen'
                                                : 'text-appDarkRed'
                                        }`}
                                    >
                                        {order.side}
                                    </p>
                                </TableCell>
                                {/* average */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.average}
                                </TableCell>
                                {/* price */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.price}
                                </TableCell>
                                {/* executed */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.executed}
                                </TableCell>
                                {/* amount */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.amount}
                                </TableCell>
                                {/* reduceOnly */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.reduceOnly}
                                </TableCell>
                                {/* postOnly */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.postOnly}
                                </TableCell>
                                {/* triggerConditions */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.triggerConditions}
                                </TableCell>
                                {/* status */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.status}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={9} sx={{ textAlign: 'center' }}>
                                <div className="flex min-h-[40vh] justify-center items-center">
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
