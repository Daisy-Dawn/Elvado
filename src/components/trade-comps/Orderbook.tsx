import React from 'react'

const Orderbook = () => {
    return (
        <div className="min-h-[50vh]">
            <div className="border-b-[1px] text-[12px] py-[0.85rem] px-[2rem] border-b-[#374151] flex justify-between items-center ">
                <p className="font-medium text-[15px]">Order Book</p>
                <div className="flex justify-end items-center">
                    <button className="bg-[#222222] px-[1rem] py-[2px] text-center ">
                        10
                    </button>
                    <button className="bg-[#2C2D31] rounded-full text-appPurple text-[12.5px] text-center h-[20px] w-[20px]  ">
                        +
                    </button>
                    <button className="bg-[#2C2D31] rounded-full text-appPurple text-[12.5px] text-center  h-[20px] w-[20px]  ">
                        -
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Orderbook
