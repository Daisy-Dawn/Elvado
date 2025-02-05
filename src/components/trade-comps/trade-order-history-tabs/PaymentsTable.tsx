import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'

const PaymentsTable = () => {
    const payments = [
        {
            time: '2022-06-20 20:40:30',
            market: 'BTC',
            payment: '19,994.49 USD',
            fundingRate: '19,994.49 USD',
            position: '',
            oraclePrice: '19,994.49 USD',
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
                            <p className="ml-[20px]">Time</p>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'start' }}>
                            Market
                        </TableCell>
                        <TableCell sx={{ textAlign: 'start' }}>
                            Payment
                        </TableCell>
                        <TableCell sx={{ textAlign: 'start' }}>
                            Funding Rate
                        </TableCell>
                        <TableCell sx={{ textAlign: 'start' }}>
                            Position
                        </TableCell>
                        <TableCell sx={{ textAlign: 'start' }}>
                            Oracle Price
                        </TableCell>
                    </TableRow>
                </TableHead>
                {/* Table body */}
                <TableBody>
                    {payments.length > 0 ? (
                        payments.map((payment, index) => (
                            <TableRow key={index}>
                                {/* time */}
                                <TableCell>
                                    <p className="ml-[20px]">{payment.time}</p>
                                </TableCell>
                                {/* market */}
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <span className="font-semibold text-foreground">
                                            {payment.market}
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

                                {/* payment */}
                                <TableCell sx={{ textAlign: 'start' }}>
                                    {payment.payment}
                                </TableCell>
                                {/* fundingRate */}
                                <TableCell sx={{ textAlign: 'start' }}>
                                    {payment.fundingRate}
                                </TableCell>
                                {/* position */}

                                <TableCell sx={{ textAlign: 'start' }}>
                                    {payment.position}
                                </TableCell>
                                {/* oraclePrice */}
                                <TableCell sx={{ textAlign: 'start' }}>
                                    {payment.oraclePrice}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={9} sx={{ textAlign: 'start' }}>
                                <div className="flex min-h-[40vh] justify-center items-center">
                                    <p className="text-appGrey text-[15px] font-medium">
                                        You have no payments
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

export default PaymentsTable
