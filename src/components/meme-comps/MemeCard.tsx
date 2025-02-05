import Image from 'next/image'
import React from 'react'

interface MemeCardTypes {
    image: string
    name: string
    createdBy: string
    marketCap: string
    delegated: string
    remark: string
}
const MemeCard = ({
    image,
    name,
    createdBy,
    marketCap,
    delegated,
    remark,
}: MemeCardTypes) => {
    return (
        <div className="w-full border-[#B5A8F7] rounded-[11px] flex  gap-[1rem] shadow-sm inset-shadow-xs shadow-[#B5A8F7] py-[1.5rem] px-[2rem] border-[1px]">
            <div className="bg-[#2C2D31] overflow-hidden w-[200px] h-[160px] flex justify-center rounded-[17px]">
                <Image
                    width={200}
                    height={145}
                    className="h-full w-full object-cover"
                    src={image}
                    alt={name}
                />
            </div>

            <div className="flex flex-col w-full text-appGrey gap-1">
                <h3 className="font-medium uppercase text-[18px] text-appPurple">
                    {name}
                </h3>
                <p className=" text-[17px]">Created by {createdBy}</p>
                <div className="flex justify-between w-full items-center">
                    <p className=" text-[14px]">Market cap:</p>
                    <p className="text-appPurple font-medium text-[16px]">
                        {marketCap}
                    </p>
                </div>
                <div className="flex justify-between w-full items-center">
                    <p className=" text-[14px]">Delegated%:</p>
                    <p className="text-appPurple font-medium text-[16px]">
                        {delegated}
                    </p>
                </div>
                <p className="text-appPurple italic text-[15px]">{remark}</p>
            </div>
        </div>
    )
}

export default MemeCard
