'use client'
import React from 'react'
import SideViewComp from './trade-sidebar-comps/SideViewComp'

const TradeSidebar = () => {
    const [activeButton, setActiveButton] = React.useState('market')

    return (
        <div className="min-h-[50vh]">
            <div className="border-b-[1px] text-[11.5px] xl:text-[12px]  border-b-[#374151] grid grid-cols-3  ">
                <button
                    className={` ${
                        activeButton === 'limit'
                            ? 'bg-appPurple text-appDarkBlue'
                            : 'bg-[#1C1C1C] text-foreground'
                    }   h-[40px] px-[0.25rem] flex justify-center items-center xl:px-[0.5rem] transition-all duration-200`}
                    onClick={() => setActiveButton('limit')}
                >
                    Limit
                </button>
                <button
                    className={` ${
                        activeButton === 'market'
                            ? 'bg-appPurple text-appDarkBlue'
                            : 'bg-[#1C1C1C] text-foreground'
                    }
                      h-[40px] flex justify-center items-center  py-[1rem] px-[0.25rem] xl:px-[0.5rem] transition-all duration-200 border-x-[1px] border-x-[#374151]`}
                    onClick={() => setActiveButton('market')}
                >
                    Market
                </button>
                <button
                    className={` ${
                        activeButton === 'stop-limit'
                            ? 'bg-appPurple text-appDarkBlue'
                            : 'bg-[#1C1C1C] text-foreground'
                    } h-[40px] py-[1rem] flex justify-center items-center px-[0.25rem] xl:px-[0.5rem] transition-all duration-200`}
                    onClick={() => setActiveButton('stop-limit')}
                >
                    Stop Limit
                </button>
            </div>

            {/* Display */}
            <SideViewComp activeButton={activeButton} />
        </div>
    )
}

export default TradeSidebar
