import Image from 'next/image'
import React from 'react'

interface MemeCardTypes {
    image: React.ReactNode
    name: string
    createdBy: string
    marketCap: string
    delegated: number
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
        <div className="w-full md:border-[#816A6A] border-opacity-40 rounded-none md:rounded-[11px] flex gap-[1rem] xl:gap-[1.5rem] shadow-sm inset-shadow-xs md:shadow-[#B5A8F7] py-2 md:py-[0.7rem] xl:py-[1.2rem] 2xl:py-[1.5rem] px-[1rem]  2xl:px-[2rem] md:border-[1px]">
            <div className="bg-[#2C2D31] w-[47%] 2xl:w-[45%] overflow-hidden  md:h-full flex justify-center rounded-[17px]">
                {typeof image === 'string' ? (
                    <Image
                        width={200}
                        height={200}
                        className="h-full w-full md:object-cover"
                        src={image}
                        alt={name}
                    />
                ) : (
                    image // If it's not a string, render it as a React element
                )}
            </div>

            <div className="flex leading-tight flex-col w-[53%] 2xl:w-[55%] text-[#F5F5F5] gap-[3px] 2xl:gap-1">
                <h3 className="font-medium uppercase text-[15px] xl:text-[17px] leading-none md:leading-tight md:text-[18px] text-appPurple">
                    {name}
                </h3>
                <p className=" text-[13px] font-[200] xl:text-[16px]">
                    Created by {createdBy}
                </p>
                <div className="flex justify-between w-full items-center">
                    <p className=" text-[13px] font-[200] xl:text-[14px]">
                        Market cap:
                    </p>
                    <p className="text-appPurple font-semibold text-[14.5px] xl:text-[18px]">
                        {marketCap}
                    </p>
                </div>
                <div className="flex justify-between w-full items-center">
                    <p className=" text-[13px] font-[200] xl:text-[14px]">
                        Delegated%:
                    </p>
                    <p className="text-appPurple font-semibold text-[14.5px] xl:text-[18px]">
                        {delegated}%
                    </p>
                </div>
                <p className="text-appPurple font-[200] italic text-[12px] xl:text-[13px]">
                    {remark}
                </p>
            </div>
        </div>
    )
}

export default MemeCard
