import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
import Image from 'next/image'

interface AssetsTableProps {
    hideAssets: boolean
}
const AssetsTable: React.FC<AssetsTableProps> = ({ hideAssets }) => {
    const assets = [
        {
            assets: {
                icon: '/images/assest-icons/bitcoin.svg',
                name: 'Bitcon',
                subName: 'BTC-USD',
            },
            walletBalance: '100,000.49',
            unrealisedPNL: '200,057.25',
            marginBalance: '100,000.49',
            availableForOrder: '100,000.49',
        },
        {
            assets: {
                icon: '/images/assest-icons/ethereum.png',
                name: 'Ethereum',
                subName: 'ETH-USD',
            },
            walletBalance: '100,000.49',
            unrealisedPNL: '200,057.25',
            marginBalance: '100,000.49',
            availableForOrder: '100,000.49',
        },
        {
            assets: {
                icon: '/images/assest-icons/avalanche.png',
                name: 'Avalanche',
                subName: 'AVAX-USD',
            },
            walletBalance: '100,000.49',
            unrealisedPNL: '200,057.25',
            marginBalance: '100,000.49',
            availableForOrder: '100,000.49',
        },
        {
            assets: {
                icon: '/images/assest-icons/dodgecoin.png',
                name: 'Dodgecoin',
                subName: 'DODGE-USD',
            },
            walletBalance: '100,000.49',
            unrealisedPNL: '200,057.25',
            marginBalance: '100,000.49',
            availableForOrder: '100,000.49',
        },
        {
            assets: {
                icon: '/images/assest-icons/solana.png',
                name: 'Solana',
                subName: 'SOL-USD',
            },
            walletBalance: '100,000.49',
            unrealisedPNL: '200,057.25',
            marginBalance: '100,000.49',
            availableForOrder: '100,000.49',
        },
    ]
    return (
        <TableContainer sx={{ mb: '2rem' }}>
            <Table
                size="small"
                sx={{
                    color: '#CFD3E5',
                    tableLayout: 'fixed', // Ensures fixed column widths
                    width: '100%', // Ensures table spans full width
                    '& .MuiTableCell-root': {
                        padding: '8px 10px !important',
                        color: '#CFD3E5',
                        fontWeight: '400',
                        fontSize: '11px',
                        borderBottom: '1px solid #2C2D31',
                        overflow: 'hidden', // Prevents content overflow
                        whiteSpace: 'nowrap', // Keeps content inline
                        textOverflow: 'ellipsis', // Trims overflowing text
                    },
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: '20%' }}>
                            <p className="ml-[20px]">Assets</p>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center', width: '20%' }}>
                            Wallet Balance
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center', width: '20%' }}>
                            Unrealised PNL
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center', width: '20%' }}>
                            Margin Balance
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center', width: '20%' }}>
                            Available for Order
                        </TableCell>
                    </TableRow>
                </TableHead>
                {/* Table body */}
                <TableBody>
                    {!hideAssets ? (
                        assets.map((asset, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ width: '20%' }}>
                                    <div className="ml-[20px] flex items-center gap-2">
                                        <div className="w-[23px] h-[23px]">
                                            <Image
                                                width={23}
                                                height={23}
                                                className="w-full h-full object-contain"
                                                src={asset.assets.icon}
                                                alt="asset icon"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="font-semibold text-foreground">
                                                {asset.assets.name}
                                            </p>
                                            <p>{asset.assets.subName}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell
                                    sx={{ textAlign: 'center', width: '20%' }}
                                >
                                    {asset.walletBalance}
                                </TableCell>
                                <TableCell
                                    sx={{ textAlign: 'center', width: '20%' }}
                                >
                                    {asset.unrealisedPNL}
                                </TableCell>
                                <TableCell
                                    sx={{ textAlign: 'center', width: '20%' }}
                                >
                                    {asset.marginBalance}
                                </TableCell>
                                <TableCell
                                    sx={{ textAlign: 'center', width: '20%' }}
                                >
                                    {asset.availableForOrder}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} sx={{ textAlign: 'start' }}>
                                <div className="flex min-h-[40vh] justify-center items-center">
                                    <p className="text-appGrey text-[15px] font-medium">
                                        Assets Hidden
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

export default AssetsTable
