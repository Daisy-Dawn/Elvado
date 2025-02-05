'use client'
import React from 'react'
import { useState } from 'react'
import { Tabs, Tab, Badge, styled, Button } from '@mui/material'
import OrderHistoryTimeTable from './order-history-comps/OrderHistoryTimeTable'

const StyledTab = styled(Tab)({
    textTransform: 'none',
    minWidth: 'auto',
    padding: '2px 14px !important',
    // minHeight: '32px !important',
    marginRight: '7px',
    // marginBottom: '5px',
    fontSize: '12px',
    color: '#CFD3E5',
    '&.Mui-selected': {
        color: '#fff',
        borderBottom: 'none !important',
        backgroundColor: '#2C2D31',
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
    fontSize: '12px',
    color: '#CFD3E5',
    '&.Mui-selected': {
        color: '#fff',
        borderBottom: 'none !important',
        backgroundColor: '#2C2D31',
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

const CloseAllButton = styled(Button)({
    backgroundColor: '#fff',
    borderRadius: '8px',
    color: '#000',
    fontWeight: '500',
    textTransform: 'none',
    padding: '1.5px 16px',
    fontSize: '12px',
    '&:hover': {
        backgroundColor: '#CFD3E5',
    },
})
const OrderHistoryTable = () => {
    const [tabValue, setTabValue] = useState(0)
    return (
        <div>
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
                    {/* <div className="ml-[2rem]"> */}
                    <StyledTab1 label={<StyledBadge>Past day</StyledBadge>} />
                    {/* </div> */}
                    <StyledTab label={<StyledBadge>Past week</StyledBadge>} />
                    <StyledTab label="Past month" />
                </Tabs>

                <CloseAllButton>Search dates</CloseAllButton>
            </div>

            {/* display tabs */}
            {tabValue === 0 && <OrderHistoryTimeTable />}
            {tabValue === 1 && <OrderHistoryTimeTable />}
            {tabValue === 2 && <OrderHistoryTimeTable />}
        </div>
    )
}

export default OrderHistoryTable
