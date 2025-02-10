import Image from 'next/image'
import React from 'react'

const MinHeader = () => {
    const tradingList = [
        {
            name: 'Index Price',
            amount: '1,811.30',
            color: 'white',
            prefix: '$',
        },
        {
            name: 'Oracle Price',
            amount: '1,811.30',
            color: 'white',
            prefix: '$',
        },
        {
            name: '24h Change',
            amount: '23.4 (2.1)%',
            color: '#40E080',
            prefix: '$',
        },
        {
            name: 'open interest',
            amount: '920,543,875',
            color: 'white',
            prefix: '$',
        },
        {
            name: 'Funding/Countdown',
            amount: '0.001%/ 39:24',
            color: 'white',
        },
        {
            name: '24h Volume',
            amount: '5,123,987,654',
            color: 'white',
            prefix: '$',
        },
        {
            name: '24h Trades',
            amount: '900,000',
            color: 'white',
        },
        {
            name: '24H high/24H low',
            amount: '1,811.30',
            subAmount: '1,543.40',
            color: '#40E080',
            subColor: '#FF6B6B',
            prefix: '$',
        },
    ]
    return (
        <div className="w-full flex items-center border-y-[4px] border-y-[#2C2D31] min-h-[40px]">
            <div className="flex px-[1rem] py-[0.5rem] w-full gap-[2rem] items-center">
                {/* btc logo and balance */}
                <div className="flex w-[18%] justify-between items-center">
                    {/* btc logo */}
                    <div className="flex items-center gap-[12px]">
                        <div className="w-[16px] h-[16px]">
                            <Image
                                src="/images/header-square.svg"
                                alt="Elvado Logo"
                                width={16}
                                height={16}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="w-[18px] h-[18px]">
                            <Image
                                src="/images/bitcoin logo.svg"
                                alt="Elvado Logo"
                                width={18}
                                height={18}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* btcusd */}
                        <p className="font-semibold text-[15px]">BTCUSD</p>
                    </div>

                    {/* balance */}
                    <p className="text-appPurple font-semibold text-[18px]">
                        $90,672.00
                    </p>
                </div>

                {/* trade chart */}
                <div className="flex items-center w-[82%]">
                    {tradingList.map((list, index) => (
                        <div
                            key={index}
                            className="px-4 flex flex-col gap-0 justify-center border-r-[1px] border-r-[#374151]"
                        >
                            <p className="text-appLightGrey text-[12px] capitalize">
                                {' '}
                                {list.name}{' '}
                            </p>
                            <div
                                style={{ color: list.color }}
                                className={`${
                                    list.subAmount
                                        ? 'flex justify-start'
                                        : 'block'
                                } text-[13px]`}
                            >
                                <p>
                                    {' '}
                                    {list.prefix && <span>$</span>}
                                    {list.amount}{' '}
                                </p>
                                {list.subAmount && (
                                    <p style={{ color: list.subColor }}>
                                        /${list.subAmount}{' '}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MinHeader
