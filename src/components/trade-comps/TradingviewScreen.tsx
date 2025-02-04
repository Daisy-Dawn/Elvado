import Image from 'next/image'
import React from 'react'

const TradingviewScreen = () => {
    const viewList = [
        { name: ' Time' },
        { name: '15m' },
        { name: '1H' },
        { name: '4H' },
        { name: '1D' },
        { name: '1W' },
    ]
    const viewIcons = [
        { icon: '/images/icons/down-arrow.svg' },
        { icon: '/images/icons/candle-horizontal.svg' },
        { icon: '/images/icons/candle-vertical.svg' },
        { icon: '/images/icons/camera2.svg' },
        { icon: '/images/icons/plus.svg' },
    ]
    return (
        <div className="min-h-[50vh]">
            <div className="border-b-[1px] text-[12px] py-[1rem] px-[2rem] border-[#374151] flex justify-between items-center ">
                <div className="flex justify-between text-appGrey w-1/2 items-center">
                    {viewList.map((item, index) => (
                        <p key={index} className="flex gap-2">
                            {item.name}
                        </p>
                    ))}
                    {viewIcons.map((item, index) => (
                        <div key={index} className="flex gap-2">
                            <div className="w-[18px] h-[18px]">
                                <Image
                                    src={item.icon}
                                    alt="Elvado Logo"
                                    width={18}
                                    height={18}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex gap-6 justify-end items-center">
                    <p>Trading view</p>
                    <p className="text-appGrey">Depth</p>
                    <div className="w-[18px] h-[18px]">
                        <Image
                            src="/images/icons/arrows.svg"
                            alt="Elvado Logo"
                            width={18}
                            height={18}
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TradingviewScreen
