import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    styled,
    Button,
} from '@mui/material'
import { IoChatboxOutline } from 'react-icons/io5'
import { FaCirclePlus } from 'react-icons/fa6'

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

const PositionsTable = () => {
    const positions = [
        {
            symbol: 'BTC',
            leverage: '2x',
            size: '2,000,000.00 USD',
            margin: '1,000,000.00 USD',
            entryPrice: '100,000.49',
            markPrice: '200,057.25',
            liqPrice: '100,000.00',
            marginRatio: '0.40%',
            pnl: '+0.06',
            roe: '+0.31',
        },
        {
            symbol: 'BTC',
            size: '2,000.00 USD',
            margin: '20.00 USD',
            entryPrice: '100,000.49',
            markPrice: '200,057.25',
            liqPrice: '100,000.00',
            marginRatio: '0.40%',
            pnl: '+0.06',
            roe: '+0.31',
        },
        {
            symbol: 'BTC',
            size: '2,000.00 USD',
            margin: '20.00 USD',
            entryPrice: '100,000.49',
            markPrice: '200,057.25',
            liqPrice: '100,000.00',
            marginRatio: '0.40%',
            pnl: '+0.06',
            roe: '+0.31',
        },
    ]
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
                    {positions.length > 0 ? (
                        positions.map((position, index) => (
                            <TableRow key={index}>
                                {/* symbol */}
                                <TableCell>
                                    <div className="ml-[20px]">
                                        <div className="flex  items-center gap-1">
                                            <span className="font-semibold text-foreground">
                                                {position.symbol}
                                            </span>
                                            {index === 0 && (
                                                <span className="flex justify-center items-center text-[10px] leading-none py-[3px] px-1 text-center text-[#CDB064] bg-[#353120]">
                                                    {position.leverage}
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
                                        {position.size}
                                    </p>
                                </TableCell>
                                {/* margin */}
                                <TableCell sx={{ textAlign: 'end' }}>
                                    <div className="flex justify-end gap-1">
                                        <p>{position.margin}</p>
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
                                    {position.entryPrice}
                                </TableCell>
                                {/* mark price */}
                                <TableCell sx={{ textAlign: 'end' }}>
                                    {position.markPrice}
                                </TableCell>
                                {/* liq price */}
                                <TableCell sx={{ textAlign: 'end' }}>
                                    {position.liqPrice}
                                </TableCell>
                                {/* margin ratio */}
                                <TableCell sx={{ textAlign: 'end' }}>
                                    {position.marginRatio}
                                </TableCell>
                                {/* pnl */}
                                <TableCell sx={{ textAlign: 'end' }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'end',
                                            gap: '4px',
                                        }}
                                    >
                                        <span style={{ color: '#4caf50' }}>
                                            {position.pnl} USD
                                        </span>
                                        <span style={{ color: '#4caf50' }}>
                                            ({position.roe}%)
                                        </span>

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
                                        <button className="bg-[#2C2D31] text-[#CFD3E5] py-[2px] px-[5px] rounded-[8px] text-[10px] hover:bg-[#B7ABF7] hover:text-[#1C1C1C]">
                                            TP/SL
                                        </button>
                                        <button className="bg-[#FF6B6B] text-[#fff] py-[2px] px-[5px] rounded-[8px] text-[9px] hover:bg-[#cc2f2f] ">
                                            Close
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
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
