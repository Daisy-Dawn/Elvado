'use client'
import React from 'react'
import LimitComp from './trade-sidebar-comps/LimitComp'
import StopLimitComp from './trade-sidebar-comps/StopLimitComp'
import Marketcomp from './trade-sidebar-comps/Marketcomp'

const TradeSidebar = () => {
    const [activeButton, setActiveButton] = React.useState('market')

    return (
        <div className="min-h-[50vh]">
            <div className="border-b-[1px]  text-[12px]  border-b-[#374151] grid grid-cols-3  ">
                <button
                    className={`h-full ${
                        activeButton === 'limit'
                            ? 'bg-appPurple text-appDarkBlue'
                            : 'bg-[#1C1C1C] text-appPurple'
                    }   py-[1rem] px-[0.5rem] transition-all duration-200`}
                    onClick={() => setActiveButton('limit')}
                >
                    Limit
                </button>
                <button
                    className={`h-full ${
                        activeButton === 'market'
                            ? 'bg-appPurple text-appDarkBlue'
                            : 'bg-[#1C1C1C] text-appPurple'
                    }
                        py-[1rem] px-[0.5rem] transition-all duration-200 border-x-[1px] border-x-[#374151]`}
                    onClick={() => setActiveButton('market')}
                >
                    Market
                </button>
                <button
                    className={`h-full ${
                        activeButton === 'stop-limit'
                            ? 'bg-appPurple text-appDarkBlue'
                            : 'bg-[#1C1C1C] text-appPurple'
                    } py-[1rem] px-[0.5rem] transition-all duration-200`}
                    onClick={() => setActiveButton('stop-limit')}
                >
                    Stop Limit
                </button>
            </div>

            {/* Display */}
            <div className="">
                {activeButton === 'limit' && <LimitComp />}
                {activeButton === 'market' && <Marketcomp />}
                {activeButton === 'stop-limit' && <StopLimitComp />}
            </div>
        </div>
    )
}

export default TradeSidebar
