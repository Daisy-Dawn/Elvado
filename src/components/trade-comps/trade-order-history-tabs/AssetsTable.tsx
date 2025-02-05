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
                            <p className="ml-[20px]">Assets</p>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            Wallet Balance
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            Unrealised PNL
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            Margin Balance
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            Available for Order
                        </TableCell>
                    </TableRow>
                </TableHead>
                {/* Table body */}
                <TableBody>
                    {!hideAssets ? (
                        assets.map((asset, index) => (
                            <TableRow key={index}>
                                {/* time */}
                                <TableCell>
                                    <div className="ml-[20px] flex items-center gap-2">
                                        <div className="w-[23px] h-[23px]">
                                            <Image
                                                width={23}
                                                height={23}
                                                className="w-full h-full object-contain"
                                                src={asset.assets.icon}
                                                alt="assest icon"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="font-semibold text-foreground">
                                                {asset.assets.name}
                                            </p>
                                            <p className="">
                                                {asset.assets.subName}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                                {/* wallet balance */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {asset.walletBalance}
                                </TableCell>

                                {/* unrealisedPNL */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {asset.unrealisedPNL}
                                </TableCell>
                                {/* marginBalance */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {asset.marginBalance}
                                </TableCell>
                                {/* availableForOrder */}
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {asset.availableForOrder}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={9} sx={{ textAlign: 'start' }}>
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
