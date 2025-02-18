import Image from 'next/image'
import Link from 'next/link'
import { BsTwitterX } from 'react-icons/bs'
import { BsSendFill } from 'react-icons/bs'

export default function HideHeader() {
    return (
        <div className="flex px-[0.8rem] font-inter header bg-background sticky top-0 w-full z-[20] justify-between  items-center h-[60px] ">
            {/* links and logo */}
            <div className="md:flex md:gap-[2rem] lg:gap-[4rem] hidden items-center">
                {/* logo */}
                <Link href="/" className="flex items-center ">
                    <div className="w-[37px] h-[37px]">
                        <Image
                            src="/elvado-logo.svg"
                            alt="Elvado Logo"
                            width={37}
                            height={37}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <p className="text-appPurple font-medium text-[19px]">
                        Elvado
                    </p>
                </Link>
            </div>

            <div className="flex gap-[3.5rem] items-center pr-[2rem]">
                <div className="flex items-center gap-[1rem]">
                    <button className="bg-appPurple py-[6px] px-[6px] rounded-[7px] text-appDarkBlue">
                        <BsTwitterX className="text-appDarkBlue" size={17} />
                    </button>
                    <button className="bg-appPurple py-[6px] px-[6px] rounded-full text-appDarkBlue">
                        <BsSendFill className="text-appDarkBlue" size={17} />
                    </button>
                </div>
                <button className=" font-semibold rounded-[12px]  flex justify-center hover:bg-appPurpleHover items-center text-center py-[6px] text-[#1C1C1C] text-[13px] px-[20px] bg-appPurple">
                    Join waitlist
                </button>
            </div>
        </div>
    )
}
