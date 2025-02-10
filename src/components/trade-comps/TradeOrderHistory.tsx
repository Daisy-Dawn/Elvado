'use client'
import React from 'react'
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
import PositionsTable from './trade-order-history-tabs/PositionsTable'
import OpenOrdersTables from './trade-order-history-tabs/OpenOrdersTables'
import OrderHistoryTable from './trade-order-history-tabs/OrderHistoryTable'
import PaymentsTable from './trade-order-history-tabs/PaymentsTable'
import AssetsTable from './trade-order-history-tabs/AssetsTable'

const StyledTab = styled(Tab)({
    textTransform: 'none',
    minWidth: 'auto',
    padding: '2px 14px !important',
    // minHeight: '32px !important',
    marginRight: '7px',
    // marginBottom: '5px',
    fontSize: '13px',
    borderRight: '1px solid #2C2D31',
    color: '#CFD3E5',
    '&.Mui-selected': {
        color: '#B5A8F7',
        fontWeight: '500',
        borderBottom: 'none !important',
    },
})
const StyledTab1 = styled(Tab)({
    textTransform: 'none',
    minWidth: 'auto',
    padding: '2px 14px !important',
    // minHeight: '32px !important',
    marginRight: '7px',
    marginLeft: '20px',
    // marginBottom: '5px',
    fontSize: '13px',
    borderRight: '1px solid #2C2D31',
    color: '#CFD3E5',
    '&.Mui-selected': {
        color: '#B5A8F7',
        borderBottom: 'none !important',
    },
})

const StyledBadge = styled(Badge)({
    '& .MuiBadge-badge': {
        fontSize: ' 13px',
        // backgroundColor: '#333',
        // color: '#999',
        // right: -15,
    },
})

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
    padding: '1.5px 16px',
    fontSize: '12px',
    '&:hover': {
        backgroundColor: '#cc2f2f',
    },
})

const TradeOrderHistory = () => {
    const [tabValue, setTabValue] = useState(0)
    const [hideAssets, setHideAssets] = useState<boolean>(false)

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setHideAssets(event.target.checked)
    }

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
                        label={<StyledBadge>Positions (5)</StyledBadge>}
                    />
                    <StyledTab
                        label={<StyledBadge>Open orders (4)</StyledBadge>}
                    />
                    <StyledTab label="Order History" />
                    <StyledTab label="Payments" />
                    <StyledTab label="Assets" />
                </Tabs>

                {tabValue === 0 && (
                    <FormControlLabel
                        control={<CustomCheckbox size="small" />}
                        label="Show All Positions"
                        sx={{
                            '& .MuiTypography-root': {
                                fontSize: '13px',
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
            {tabValue === 0 && <PositionsTable />}
            {tabValue === 1 && <OpenOrdersTables />}
            {tabValue === 2 && <OrderHistoryTable />}
            {tabValue === 3 && <PaymentsTable />}
            {tabValue === 4 && <AssetsTable hideAssets={hideAssets} />}
        </div>
    )
}

export default TradeOrderHistory
