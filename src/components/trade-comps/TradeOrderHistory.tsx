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
} from '@mui/material'
import PositionsTable from './PositionsTable'
import OpenOrdersTables from './OpenOrdersTables'

// Custom styled components to match the design
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

const TradeOrderHistory = () => {
    const [tabValue, setTabValue] = useState(0)

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
                    <StyledTab
                        label={<StyledBadge>Positions (5)</StyledBadge>}
                    />
                    <StyledTab
                        label={<StyledBadge>Open orders (4)</StyledBadge>}
                    />
                    <StyledTab label="Order History" />
                    <StyledTab label="Payments" />
                    <StyledTab label="Assets" />
                </Tabs>

                <FormControlLabel
                    control={<CustomCheckbox size="small" />}
                    label="Show All Positions"
                    sx={{
                        '& .MuiTypography-root': {
                            fontSize: '13px',
                        },
                    }}
                />
            </div>

            {/* display tabs */}
            {tabValue === 0 && <PositionsTable />}
            {tabValue === 1 && <OpenOrdersTables />}
        </div>
    )
}

export default TradeOrderHistory
