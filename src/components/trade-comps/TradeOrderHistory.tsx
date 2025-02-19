'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import {
    Tabs,
    Tab,
    Badge,
    styled,
    FormControlLabel,
    Checkbox,
    Button,
} from '@mui/material'
import PositionsTable, {
    UserPosition,
} from './trade-order-history-tabs/PositionsTable'
import OpenOrdersTables, {
    ApiResponse,
    OpenOrder,
} from './trade-order-history-tabs/OpenOrdersTables'
import OrderHistoryTable from './trade-order-history-tabs/OrderHistoryTable'
import PaymentsTable from './trade-order-history-tabs/PaymentsTable'
import AssetsTable from './trade-order-history-tabs/AssetsTable'
import { useAccount } from 'wagmi'
import axios from 'axios'

const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    minWidth: 'auto',
    padding: '2px 14px !important',
    marginRight: '7px',
    fontSize: '13px',
    borderRight: '1px solid #2C2D31',
    color: '#CFD3E5',
    '&.Mui-selected': {
        color: '#B5A8F7',
        fontWeight: '500',
        borderBottom: 'none !important',
    },
    [theme.breakpoints.down('xl')]: {
        padding: '0px 14px !important',
        fontSize: '12px',
    },
}))

const StyledTab1 = styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    minWidth: 'auto',
    padding: '2px 14px !important',
    marginRight: '7px',
    marginLeft: '20px',
    fontSize: '13px',
    borderRight: '1px solid #2C2D31',
    color: '#CFD3E5',
    '&.Mui-selected': {
        color: '#B5A8F7',
        borderBottom: 'none !important',
    },
    [theme.breakpoints.down('xl')]: {
        padding: '0px 14px !important',
        fontSize: '12px',
    },
}))

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        fontSize: '13px',
        [theme.breakpoints.down('xl')]: {
            fontSize: '12px',
        },
    },
}))

const CustomCheckbox = styled(Checkbox)({
    color: '#40E080', // Purple border when unchecked
    '&.Mui-checked': {
        color: '#40E080', // White checkmark
    },
    '&.Mui-checked + .MuiSvgIcon-root': {
        backgroundColor: '#111111', // Purple background
    },
    '&.Mui-checked .MuiSvgIcon-root': {
        backgroundColor: '#111111', // Purple background when checked
        borderRadius: '4px',
    },
})

const CloseAllButton = styled(Button)({
    backgroundColor: '#DC2626',
    borderRadius: '8px',
    color: 'white',
    textTransform: 'none',
    padding: '1.5px 10px',
    fontSize: '12px',
    '&:hover': {
        backgroundColor: '#cc2f2f',
    },
})

const TradeOrderHistory = () => {
    const [tabValue, setTabValue] = useState(0)
    const [hideAssets, setHideAssets] = useState<boolean>(false)
    const [showPositions, setShowPositions] = useState<boolean>(true)
    const [userPositions, setUserPositions] = useState<UserPosition[]>([])
    const [openOrders, setOpenOrders] = useState<OpenOrder[]>([])

    const { address } = useAccount()
    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setHideAssets(event.target.checked)
    }
    const handleCheckboxChangePositions = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setShowPositions(event.target.checked)
    }

    useEffect(() => {
        const fetchUserOpenOrders = async () => {
            try {
                const response = await axios.get<ApiResponse<OpenOrder[]>>(
                    `${process.env.NEXT_PUBLIC_GET_USERS_OPEN_ORDERS}/${address}`
                )

                if (response.data.status === 200) {
                    setOpenOrders(response.data.data)
                }
            } catch (error) {
                console.log('Error fetching open orders:', error)
            }
        }

        fetchUserOpenOrders()
    }, [address])

    // Fetch user positions
    const fetchUserPositions = async () => {
        try {
            const response = await axios.get<ApiResponse<UserPosition[]>>(
                `${process.env.NEXT_PUBLIC_GET_USERS_POSITIONS}/${address}`
            )

            if (response.data.status === 200) {
                setUserPositions(response.data.data)
            } else {
                console.log(
                    'Failed to fetch user positions:',
                    response.data.msg
                )
            }
        } catch (error) {
            console.log('Error fetching user positions:', error)
        }
    }

    useEffect(() => {
        fetchUserPositions()
    }, [])

    return (
        <div className="min-h-[50vh] text-[13px] py-[0.5rem]">
            {/* Navigation Tabs */}

            <div className="border-b-[1px] border-b-[#2C2D31] flex justify-between items-center">
                <Tabs
                    value={tabValue}
                    onChange={(_, newValue) => setTabValue(newValue)}
                    sx={{
                        '& .MuiTabs-indicator': {
                            display: 'none',
                        },
                    }}
                >
                    <StyledTab1
                        label={
                            <StyledBadge>
                                Positions ({userPositions.length}){' '}
                            </StyledBadge>
                        }
                    />
                    <StyledTab
                        label={
                            <StyledBadge>
                                Open orders ({openOrders.length}){' '}
                            </StyledBadge>
                        }
                    />
                    <StyledTab label="Order History" />
                    <StyledTab label="Payments" />
                    <StyledTab label="Assets" />
                </Tabs>

                {tabValue === 0 && (
                    <FormControlLabel
                        control={
                            <CustomCheckbox
                                checked={showPositions}
                                onChange={handleCheckboxChangePositions}
                                size="small"
                            />
                        }
                        label="Show All Positions"
                        sx={{
                            '& .MuiTypography-root': {
                                fontSize: '12px',
                            },
                        }}
                    />
                )}
                {tabValue === 1 && (
                    <div className="flex justify-end mr-4">
                        <CloseAllButton>Close all positions</CloseAllButton>
                    </div>
                )}
                {tabValue === 4 && (
                    <FormControlLabel
                        control={
                            <CustomCheckbox
                                size="small"
                                checked={hideAssets}
                                onChange={handleCheckboxChange}
                            />
                        }
                        label="Hide Assets"
                        sx={{
                            '& .MuiTypography-root': {
                                fontSize: '13px',
                            },
                        }}
                    />
                )}
            </div>

            {/* display tabs */}
            {tabValue === 0 && <PositionsTable showPositions={showPositions} />}
            {tabValue === 1 && <OpenOrdersTables />}
            {tabValue === 2 && <OrderHistoryTable />}
            {tabValue === 3 && <PaymentsTable />}
            {tabValue === 4 && <AssetsTable hideAssets={hideAssets} />}
        </div>
    )
}

export default TradeOrderHistory
