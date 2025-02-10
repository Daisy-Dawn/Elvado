'use client'
import { Button, styled } from '@mui/material'
import Image from 'next/image'

const CustomButton = styled(Button)({
    backgroundColor: '#B5A8F7',
    minWidth: '100px',
    borderRadius: '14px',
    color: '#222',
    fontWeight: '500',
    textTransform: 'none',
    padding: '10px 25px',
    // fontSize: '14px',
    '&:hover': {
        backgroundColor: '#E6E6FA',
    },
})
const CustomButton1 = styled(Button)({
    backgroundColor: '#2C2D31',
    minWidth: '100px',
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
            <div className="xl:w-[40%] lg:w-[60%] md:w-[75%] w-full shadow-sm rounded-[8px] py-[2rem] md:py-[3rem] px-[1rem] md:px-[2rem] bg-background flex flex-col gap-[1rem]">
                <p className="text-foreground text-center font-medium text-[21px]">
                    Sign Messages
                </p>

                {/* step 2 */}
                <div className="px-[1.5rem] rounded-[8px] flex flex-col gap-5  bg-[#171717] py-[1.5rem]">
                    {/* verify ownership */}
                    <div className="flex items-center gap-4">
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
                            <p className="text-appPurple">
                                Confirm you are the owner of this wallet
                            </p>
                        </div>
                    </div>

                    <div className="border-t-[1px] border-appPurple w-full"></div>

                    {/* enable trading */}
                    <div className="flex items-center gap-4">
                        {/* icon */}
                        <div className="w-[35px] h-[35px]">
                            <Image
                                src="/images/connect-wallet/enable-trading.svg"
                                alt="verify logo"
                                width={35}
                                height={35}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div>
                            <p className="font-medium text-[15px] capitalize">
                                Enable trading
                            </p>
                            <p className="text-appPurple">
                                Signing this enables you trade on the platform
                                without constantly needing to sign trasactions.
                            </p>
                        </div>
                    </div>

                    {/* step 2 */}
                    <p className="text-end mt-[0.5rem] text-appGrey">
                        Step 2/2
                    </p>
                </div>

                {/* buttons */}
                <div className="flex justify-between items-center gap-3">
                    <CustomButton1>Verify Ownership</CustomButton1>
                    <CustomButton>Enable Trading</CustomButton>
                </div>
            </div>
        </div>
    )
}
