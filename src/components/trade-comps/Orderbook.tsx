'use client'
import React, { useState } from 'react'

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
        <div className="min-h-[50vh]">
            <div className="border-b-[1px] text-[12px] py-[0.85rem] px-[2rem] border-b-[#374151] flex justify-between items-center ">
                <p className="font-medium text-[15px]">Order Book</p>
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
        </div>
    )
}

export default Orderbook
