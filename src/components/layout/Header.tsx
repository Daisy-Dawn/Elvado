'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { RiCloseLargeLine } from 'react-icons/ri'
import { usePathname } from 'next/navigation'
import '../../app/globals.css'
import Image from 'next/image'
import { FaRegBell } from 'react-icons/fa6'
import { BiSolidDownArrow } from 'react-icons/bi'
import { useAccount, useDisconnect, useEnsName } from 'wagmi'
import { Menu, MenuItem } from '@mui/material'

const Header = () => {
    const pathname = usePathname() // Get the current path dynamically
    const [toggle, setToggle] = useState(false)
    const [componentMount, setComponentMount] = useState(false)

    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const { data: ensName } = useEnsName({ address })

    const handleToggle = () => {
        setToggle(!toggle)
        if (!componentMount) {
            setComponentMount(true)
        }
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const navLinks = [
        { title: 'Meme', link: '/' },
        { title: 'Trade', link: '/trade' },
    ]

    const hideNav =
        pathname === '/connect-wallet' ||
        pathname === '/connect-wallet/signin-message' ||
        pathname === '/meme/create-meme' ||
        pathname === '/waitlist' ||
        pathname === '/waitlist/join-waitlist'

    return (
        <>
            {!hideNav && (
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

                        {/* links */}
                        {/* {!hideNav && ( */}
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
                        {/* )} */}
                    </div>

                    {/* button */}
                    {address ? (
                        <div className="items-center justify-between hidden md:flex p-[2px] gap-6">
                            <button className="border-x-[3px] px-4 border-appStroke">
                                <FaRegBell
                                    size={20}
                                    className="text-[#CFD3E5]"
                                />
                            </button>
                            <div className="flex gap-2 items-center">
                                <div className="w-[19px] h-[19px]">
                                    <Image
                                        src="/images/empty-wallet.svg"
                                        alt="ENS Avatar"
                                        width={19}
                                        height={19}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                {address && (
                                    <div className="flex text-[14px] gap-2">
                                        {ensName
                                            ? `${ensName} (${address.slice(
                                                  0,
                                                  4
                                              )}...${address.slice(-4)})`
                                            : `${address.slice(
                                                  0,
                                                  4
                                              )}...${address.slice(-4)}`}
                                        <button onClick={handleClick}>
                                            <BiSolidDownArrow
                                                size={14}
                                                className="text-foreground"
                                            />
                                        </button>
                                    </div>
                                )}

                                {/* Styled MUI Menu */}
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    disableScrollLock
                                    hideBackdrop
                                    // disableBackdropTransition
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem
                                        onClick={() => {
                                            disconnect()
                                            handleClose()
                                        }}
                                    >
                                        Disconnect
                                    </MenuItem>
                                </Menu>
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
                                        src="/elvado-logo.svg"
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
                        {address ? (
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
                                            alt="ENS Avatar"
                                            width={19}
                                            height={19}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    {address && (
                                        <div className="flex gap-2">
                                            {ensName
                                                ? `${ensName} (${address.slice(
                                                      0,
                                                      4
                                                  )}...${address.slice(-4)})`
                                                : `${address.slice(
                                                      0,
                                                      4
                                                  )}...${address.slice(-4)}`}
                                            <button onClick={handleClick}>
                                                <BiSolidDownArrow
                                                    size={15}
                                                    className="text-foreground"
                                                />
                                            </button>
                                        </div>
                                    )}
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem
                                            onClick={() => {
                                                disconnect()
                                                handleClose()
                                            }}
                                        >
                                            Disconnect
                                        </MenuItem>
                                    </Menu>
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
                    </div>
                </div>
            )}
        </>
    )
}

export default Header
