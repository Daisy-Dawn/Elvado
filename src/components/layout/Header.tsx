'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { RiCloseLargeLine } from 'react-icons/ri'
import { usePathname } from 'next/navigation'
import '../../app/globals.css'
import Image from 'next/image'

const Header = () => {
    const pathname = usePathname() // Get the current path dynamically
    const [toggle, setToggle] = useState(false)
    const [componentMount, setComponentMount] = useState(false)

    const handleToggle = () => {
        setToggle(!toggle) // Toggle between showing and hiding the navbar
        if (!componentMount) {
            setComponentMount(true) // Set componentMount to true when toggle is first triggered
        }
    }

    const navLinks = [
        { title: 'Meme', link: '/meme' },
        { title: 'Trade', link: '/' },
        { title: 'Dashboard', link: '/dashboard' },
    ]
    return (
        <div className="flex px-[2rem] font-inter header sticky top-0 w-full z-[50] justify-between  items-center h-[70px] ">
            {/* links and logo */}
            <div className="md:flex md:gap-[2rem] lg:gap-[4rem] hidden items-center">
                {/* logo */}
                <div className="flex items-center gap-[2px]">
                    <div className="w-[40px] h-[40px]">
                        <Image
                            src="/images/Elvado logo.png"
                            alt="Elvado Logo"
                            width={40}
                            height={40}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <p className="text-appPurple font-medium text-[21px]">
                        Elvado
                    </p>
                </div>

                {/* links */}
                <div className="w-full hidden md:flex gap-2 p-[2px] ">
                    <div className="h-[30px] bg-appStroke w-[3px]"></div>
                    <div className="items-center justify-between md:flex p-[2px] gap-8">
                        {navLinks.map((link, index) => (
                            <Link
                                href={link.link}
                                key={index}
                                className={` capitalize text-center  ${
                                    pathname === link.link
                                        ? 'text-appPurple underline'
                                        : 'text-appGrey'
                                }`}
                            >
                                {link.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* button */}
            <div className="hidden md:block">
                <button
                    className="btn-flip "
                    data-back="Connect wallet"
                    data-front="Connect wallet"
                ></button>
            </div>

            {/* RESPONSIVENESS */}

            {/* {toggle && (
                <div className="fixed inset-0 bg-black md:bg-opacity-50 bg-opacity-30"></div>
            )} */}

            <span
                className="absolute right-[2rem] md:hidden"
                onClick={handleToggle}
            >
                {toggle ? (
                    <RiCloseLargeLine
                        size={25}
                        className="text-appDarkerPurple"
                    />
                ) : (
                    <Image
                        width={32}
                        height={32}
                        src="/images/Menu.svg"
                        alt="main tree "
                    />
                )}
            </span>
            {/*  */}
            <div
                className={`flex flex-col ${
                    !componentMount && !toggle
                        ? 'hidden'
                        : toggle && componentMount
                        ? 'slide-in-left'
                        : 'slide-out-left'
                } items-start justify-start glass-background opacity-50 top-0 bg-appDarkerPurple text-appDarkBlue absolute py-[38px] px-[20px] left-0  z-10 w-[65%]  h-dvh nav shadow-lg transition-all duration-300 gap-4 md:hidden`}
            >
                <div className="h-[50px]">
                    {/* logo */}
                    <div className="flex items-center gap-[2px]">
                        <div className="w-[40px] h-[40px]">
                            <Image
                                src="/images/Elvado logo.png"
                                alt="Elvado Logo"
                                width={40}
                                height={40}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <p className="text-appDarkBlue font-medium text-[21px]">
                            Elvado
                        </p>
                    </div>
                </div>
                {navLinks.map((link, index) => (
                    <Link
                        href={link.link}
                        key={index}
                        onClick={handleToggle}
                        className={`my-[5px] capitalize text-center ${
                            pathname === link.link
                                ? 'text-brown-gradient underline '
                                : 'text-appBrown'
                        }`}
                    >
                        {link.title}
                    </Link>
                ))}

                <button className="min-h-[30px] py-[8px] px-[20px] rounded-[8px] bg-appDarkBlue text-appGrey min-w-[100px]">
                    Connect Wallet
                </button>
            </div>
        </div>
    )
}

export default Header
