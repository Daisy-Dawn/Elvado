'use client'
import { Button, styled } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { IoCloseSharp } from 'react-icons/io5'

const CustomButton = styled(Button)({
    backgroundColor: '#B5A8F7',
    minWidth: '55%',
    borderRadius: '14px',
    color: '#222',
    fontWeight: '500',
    textTransform: 'none',
    padding: '10px 25px',
    // fontSize: '14px',
    '&:hover': {
        backgroundColor: '#9186C6',
    },
})
const CustomButton1 = styled(Button)({
    backgroundColor: '#2C2D31',
    minWidth: '45%',
    borderRadius: '14px',
    color: '#fff',
    fontWeight: '500',
    textTransform: 'none',
    padding: '10px 25px',
    // fontSize: '14px',
    '&:hover': {
        backgroundColor: '#E6E6FA',
        color: '#222',
    },
})
export default function SigninMessage() {
    return (
        <div className="w-full h-screen flex justify-center items-start md:items-center">
            <div className="2xl:w-[32%] xl:w-[35%] lg:w-[45%] md:w-[75%] w-full shadow-sm rounded-[8px] py-[2rem] md:py-[3rem] px-[1rem] md:px-[2rem] bg-background flex flex-col gap-[1rem]">
                <Link
                    href="/connect-wallet"
                    className="flex w-full justify-end"
                >
                    <div className="relative border-[1px] flex justify-center items-center border-appPurple w-[24px] rounded-full h-[24px]">
                        <IoCloseSharp size={18} className="text-appPurple" />
                    </div>
                </Link>
                <p className="text-foreground text-center font-medium text-[21px]">
                    Sign Messages
                </p>

                {/* step 2 */}
                <div className="px-[1.7rem] rounded-[8px] flex flex-col  bg-[#171717] py-[1.5rem]">
                    {/* verify ownership */}
                    <div className="flex mt-[1rem]  gap-4">
                        {/* icon */}
                        <div className="w-[35px] h-[35px]">
                            <Image
                                src="/images/connect-wallet/verify.svg"
                                alt="verify logo"
                                width={35}
                                height={35}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div>
                            <p className="font-medium text-[15px] capitalize">
                                Verify ownership
                            </p>
                            <p className="text-appGrey text-[13px]">
                                Confirm you are the owner of this wallet
                            </p>
                        </div>
                    </div>
                    <div className="border-t-[1px] mt-3 border-appPurple w-full"></div>

                    {/* enable trading */}
                    <div className="flex w-full mt-7   gap-4">
                        {/* icon */}
                        <div className="w-[37px] h-[35px]">
                            <Image
                                src="/images/connect-wallet/enable-trading.svg"
                                alt="verify logo"
                                width={37}
                                height={37}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="w-full">
                            <p className="font-medium text-[15px] capitalize">
                                Enable trading
                            </p>
                            <p className="text-appGrey text-[13px]">
                                Signing this enables you trade on the platform
                                without constantly needing to sign trasactions.
                            </p>
                        </div>
                    </div>

                    {/* step 2 */}
                    <p className="text-end text-[13px] mt-[0.5rem] text-appGrey">
                        Step 2/2
                    </p>
                </div>

                {/* buttons */}
                <div className="flex w-full gap-4 items-center">
                    <CustomButton1>Verify Ownership</CustomButton1>
                    <CustomButton>Enable Trading</CustomButton>
                </div>
            </div>
        </div>
    )
}
