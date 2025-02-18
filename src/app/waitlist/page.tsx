'use client'
import HideHeader from '@/components/layout/HideHeader'
import { useRouter } from 'next/navigation'

export default function Waitlist() {
    const router = useRouter()
    return (
        <div className="waitlist justify-center w-full h-screen">
            <HideHeader />
            <div className="w-full flex flex-col items-center">
                <p className="w-[40%] text-appPurple leading-tight pt-[5rem] pb-[2rem] text-center font-bold text-[50px] ">
                    Join the growing movement
                </p>

                <button
                    onClick={() => router.push('/waitlist/join-waitlist')}
                    className="w-[15%] font-semibold rounded-[12px] hidden h-full md:flex justify-center hover:bg-appPurpleHover items-center text-center py-[12px] text-[#1C1C1C] text-[14px] px-[20px] bg-appPurple"
                >
                    Join waitlist
                </button>
            </div>
        </div>
    )
}
