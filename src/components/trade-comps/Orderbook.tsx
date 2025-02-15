'use client'
import React, { useState } from 'react'
import OrderBookComp from './order-book/OrderBookComp'

const Orderbook = () => {
    const values = [0.1, 1, 10, 100]
    const [currentIndex, setCurrentIndex] = useState(2) // Default to 10 (index 2)

    const increment = () => {
        setCurrentIndex((prevIndex) =>
            Math.min(prevIndex + 1, values.length - 1)
        )
    }

    const decrement = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
    }
    return (
        <div className="min-h-[50vh] rounded-[8px] pb-1 bg-background">
            <div className="border-b-[1px] text-[12px] py-[0.5rem] px-[0.7rem]  border-b-[#374151] flex justify-between items-center ">
                <p className="font-medium text-[12px]">Order Book</p>
                <div className="flex justify-end items-center">
                    <button className="bg-[#222222] px-[1rem] py-[2px] text-center">
                        {values[currentIndex]}
                    </button>
                    <button
                        className="bg-[#2C2D31] rounded-full text-appPurple text-[12.5px] text-center h-[20px] w-[20px]"
                        onClick={increment}
                        disabled={currentIndex === values.length - 1}
                    >
                        +
                    </button>
                    <button
                        className="bg-[#2C2D31] rounded-full text-appPurple text-[12.5px] text-center h-[20px] w-[20px]"
                        onClick={decrement}
                        disabled={currentIndex === 0}
                    >
                        -
                    </button>
                </div>
            </div>
            {/* order book comp */}
            <OrderBookComp />
        </div>
    )
}

export default Orderbook
