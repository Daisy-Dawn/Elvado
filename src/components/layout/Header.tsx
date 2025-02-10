'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { RiCloseLargeLine } from 'react-icons/ri'
import { usePathname } from 'next/navigation'
import '../../app/globals.css'
import Image from 'next/image'
import { FaRegBell, FaWallet } from 'react-icons/fa6'
import { useAuth } from '../context/AuthContext'
import { BiSolidDownArrow } from 'react-icons/bi'

const Header = () => {
    const pathname = usePathname() // Get the current path dynamically
    const [toggle, setToggle] = useState(false)
    const [componentMount, setComponentMount] = useState(false)
    const { isAuthenticated } = useAuth()

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

    const hideNav = pathname === '/meme/create-meme'
    const hideNav2 =
        pathname === '/connect-wallet' ||
        pathname === '/connect-wallet/signin-message'

    return (
        <>
            {!hideNav2 && (
                <div className="flex px-[2rem] font-inter header bg-background sticky top-0 w-full z-[20] justify-between  items-center h-[60px] ">
                    {/* links and logo */}
                    <div className="md:flex md:gap-[2rem] lg:gap-[4rem] hidden items-center">
                        {/* logo */}
                        <Link href="/" className="flex items-center ">
                            <div className="w-[37px] h-[37px]">
                                <Image
                                    src="/images/Elvado logo.png"
                                    alt="Elvado Logo"
                                    width={37}
                                    height={37}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <p className="text-appPurple font-medium text-[19px]">
                                Elvado
                            </p>
                        </Link>

                        {/* links */}
                        {!hideNav && (
                            <div className="w-full hidden md:flex gap-2 p-[2px] ">
                                <div className="h-[30px] bg-appStroke mr-3 w-[3px]"></div>
                                <div className="items-center justify-between md:flex p-[2px] gap-8">
                                    {navLinks.map((link, index) => (
                                        <Link
                                            href={link.link}
                                            key={index}
                                            className={` capitalize hover:text-appPurple text-center  ${
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
                        )}
                    </div>

                    {/* button */}
                    {isAuthenticated || hideNav ? (
                        <div className="items-center justify-between hidden md:flex p-[2px] gap-6">
                            <button className="border-x-[3px] px-4  border-appStroke">
                                {' '}
                                <FaRegBell
                                    size={20}
                                    className="text-[#CFD3E5]"
                                />
                            </button>
                            <div className="flex gap-2 items-center">
                                {' '}
                                <div className="w-[19px] h-[19px]">
                                    <Image
                                        src="/images/empty-wallet.svg"
                                        alt="Wallet"
                                        width={19}
                                        height={19}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <p className="flex gap-2">
                                    0x6d....2342{' '}
                                    <button>
                                        <BiSolidDownArrow
                                            size={15}
                                            className="text-foreground"
                                        />
                                    </button>{' '}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="hidden md:block">
                            <Link href="/connect-wallet">
                                <button
                                    className="btn-flip"
                                    data-back="Connect wallet"
                                    data-front="Connect wallet"
                                ></button>
                            </Link>
                        </div>
                    )}

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
                        <Link href="/" className="h-[50px]">
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
                        </Link>
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

                        {/* button */}
                        {isAuthenticated ? (
                            <div className=" flex flex-col gap-6">
                                <button className="flex gap-2 ">
                                    {' '}
                                    <FaRegBell
                                        size={20}
                                        className="text-appStroke"
                                    />
                                    <p>Notifications</p>
                                </button>
                                <div className="flex gap-2 items-center">
                                    {' '}
                                    <FaWallet
                                        className="text-appStroke"
                                        size={19}
                                    />
                                    <p className="flex gap-2">
                                        0x6d....2342{' '}
                                        <button>
                                            <BiSolidDownArrow
                                                size={15}
                                                className="text-appDarkBlue"
                                            />
                                        </button>{' '}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <Link href="/connect-wallet">
                                <button className="min-h-[30px] py-[8px] px-[20px] rounded-[8px] bg-appDarkBlue text-appGrey min-w-[100px]">
                                    Connect Wallet
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Header
