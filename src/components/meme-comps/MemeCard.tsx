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
        <div className="w-full md:border-[#B5A8F7] rounded-none md:rounded-[11px] flex  gap-[1rem] shadow-sm inset-shadow-xs md:shadow-[#B5A8F7] py-2 md:py-[0.7rem] xl:py-[1.5rem] px-[1rem] md:px-[1.5rem] xl:px-[2rem] md:border-[1px]">
            <div className="bg-[#2C2D31] overflow-hidden w-[130px] h-[80px] md:w-[200px] md:h-[160px] flex justify-center rounded-[17px]">
                <Image
                    width={200}
                    height={145}
                    className="h-full w-full md:object-cover"
                    src={image}
                    alt={name}
                />
            </div>

            <div className="flex flex-col w-full text-appGrey gap-1">
                <h3 className="font-medium uppercase text-[17px] leading-none md:leading-normal md:text-[18px] text-appPurple">
                    {name}
                </h3>
                <p className=" text-[14px] md:text-[17px]">
                    Created by {createdBy}
                </p>
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
                <p className="text-appPurple italic text-[13px] md:text-[15px]">
                    {remark}
                </p>
            </div>
        </div>
    )
}

export default MemeCard
