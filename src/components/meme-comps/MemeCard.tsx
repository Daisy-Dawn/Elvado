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
        <div className="w-full md:border-[#816A6A] border-opacity-40 rounded-none md:rounded-[11px] flex  gap-[1.5rem] shadow-sm inset-shadow-xs md:shadow-[#B5A8F7] py-2 md:py-[0.7rem] xl:py-[1.5rem] px-[1rem] md:px-[1.5rem] xl:px-[2rem] md:border-[1px]">
            <div className="bg-[#2C2D31] w-[45%] overflow-hidden  md:h-full flex justify-center rounded-[17px]">
                <Image
                    width={200}
                    height={200}
                    className="h-full w-full md:object-cover"
                    src={image}
                    alt={name}
                />
            </div>

            <div className="flex leading-tight flex-col w-[55%] text-[#F5F5F5] gap-1">
                <h3 className="font-medium uppercase text-[17px] leading-none md:leading-tight md:text-[18px] text-appPurple">
                    {name}
                </h3>
                <p className=" text-[14px] md:text-[16px]">
                    Created by {createdBy}
                </p>
                <div className="flex justify-between w-full items-center">
                    <p className=" text-[15px]">Market cap:</p>
                    <p className="text-appPurple font-semibold text-[18px]">
                        {marketCap}
                    </p>
                </div>
                <div className="flex justify-between w-full items-center">
                    <p className=" text-[15px]">Delegated%:</p>
                    <p className="text-appPurple font-semibold text-[18px]">
                        {delegated}
                    </p>
                </div>
                <p className="text-appPurple italic text-[13px] md:text-[15px]">
                    {remark}
                </p>
            </div>
        </div>
    )
}

export default MemeCard
