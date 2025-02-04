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
    padding: '1.5px 16px',
    fontSize: '12px',
    '&:hover': {
        backgroundColor: '#cc2f2f',
    },
})

const CloseButton = styled(Button)(() => ({
    backgroundColor: '#FF6B6B',
    color: 'white',
    textTransform: 'none',
    fontSize: '10px',
    padding: '2px 2px',
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: '#cc2f2f',
    },
}))

const TPSLBadge = styled(Button)(() => ({
    backgroundColor: '#2C2D31',
    color: '#CFD3E5',
    padding: '2px 2px',
    borderRadius: '8px',
    fontSize: '10px',
    '&:hover': {
        backgroundColor: '#B7ABF7',
        color: '#1C1C1C',
    },
}))
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
        <TableContainer>
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
                        <TableCell>Symbol</TableCell>
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
                                    <div className="flex items-center gap-1">
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
                                <TableCell sx={{ textAlign: 'end' }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'end',
                                            gap: '8px',
                                        }}
                                    >
                                        <TPSLBadge>TP/SL</TPSLBadge>
                                        <CloseButton>Close</CloseButton>
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
