'use client'
import { useState } from 'react'
import {
    Slider,
    Checkbox,
    FormControlLabel,
    styled,
    CircularProgress,
} from '@mui/material'
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { FaCirclePlus } from 'react-icons/fa6'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { IoMdArrowDropdown } from 'react-icons/io'
import { IoMdCloseCircle } from 'react-icons/io'
import { LuDot } from 'react-icons/lu'
import { RiErrorWarningLine } from 'react-icons/ri'
import { useAccount, useBalance } from 'wagmi'

const CustomCheckbox = styled(Checkbox)({
    color: '#B7ABF7', // Purple border when unchecked
    '&.Mui-checked': {
        color: '#B7ABF7', // White checkmark
    },
    '&.Mui-checked + .MuiSvgIcon-root': {
        backgroundColor: '#111111', // Purple background
    },
    '&.Mui-checked .MuiSvgIcon-root': {
        backgroundColor: '#111111', // Purple background when checked
        borderRadius: '4px',
    },
})

type ActiveButtonProp = {
    activeButton: string
}

const SideViewComp = ({ activeButton }: ActiveButtonProp) => {
    const [buyorSellBtn, setBuyorSellBtn] = useState('buy/long')
    const [amount, setAmount] = useState<string>('')

    const { address } = useAccount()

    // Get balance details
    const { data, error, isLoading } = useBalance({
        address: address,
    })

    const availableBalance = data?.value
        ? Number((BigInt(data.value) / BigInt(1e18)).toString()) // Convert balance to number
        : 0

    // Handle Input Change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()

        if (value === '') {
            setAmount('') // Allow input to be empty
        } else {
            const numericValue = Number(value)
            if (!isNaN(numericValue)) {
                if (numericValue > availableBalance) {
                    alert('The entered amount exceeds your available balance.')
                } else {
                    setAmount(value) // Keep it as a string to allow smooth typing
                }
            }
        }
    }

    // Handle Slider Change
    const handleSliderChange = (_: Event, value: number | number[]) => {
        const percentage = value as number
        const calculatedAmount = (percentage / 100) * availableBalance
        setAmount(calculatedAmount.toFixed(2)) // Keep 2 decimal places
    }

    // Fix NaN issue in Slider
    const sliderValue =
        availableBalance > 0 ? (Number(amount) / availableBalance) * 100 : 0

    // modal
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    //leverage
    const [leverage, setLeverage] = useState<number>(15)

    // Handle loading and error states
    // if (isLoading) return <CircularProgress color="secondary" size={17} />
    if (error) return <p>Error: {error.message}</p>

    const leverageMarks = [
        { value: 1, label: '1X' },
        { value: 5, label: '5X' },
        { value: 10, label: '10X' },
        { value: 15, label: '15X' },
        { value: 20, label: '20X' },
        { value: 25, label: '25X' },
    ]

    const handleIncrease = () => {
        setLeverage((prev) => Math.min(prev + 1, 25))
    }

    const handleDecrease = () => {
        setLeverage((prev) => Math.max(prev - 1, 1))
    }

    return (
        <div className="min-h-screen flex flex-col gap-[0.5rem] px-[1rem] py-[0.5rem]">
            {/* Leverage Selector */}
            <div
                onClick={handleOpen}
                className="flex cursor-pointer items-center gap-[1px]"
            >
                <div className="min-w-[70px] text-[10px] rounded-l-[6px] h-[25px] flex justify-center items-center  bg-[#2C2D31]">
                    Leverage
                </div>

                <div className="min-w-[70px] text-[10px] rounded-r-[6px] font-semibold h-[25px] flex justify-center items-center gap-1  bg-[#2C2D31]">
                    <p>{leverage}x</p>
                    <IoMdArrowDropdown className="text-foreground" size={16} />
                </div>
            </div>

            {/* modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="bg-[#111111] flex flex-col gap-1 leverage-modal border-[1px] border-[#1D2135] px-[1rem] py-[1rem] rounded-[6px]">
                    <button
                        className="flex w-full justify-end"
                        onClick={handleClose}
                    >
                        <IoMdCloseCircle
                            className="text-appStroke fill-appPurple"
                            size={24}
                        />
                    </button>

                    <p className="text-[#CFD3E5] text-[14px]">Leverage</p>

                    <div className="bg-[#171717] py-[0.5rem] px-[0.5rem] flex justify-between items-center rounded-[4px]">
                        <button
                            className="text-appPurple text-[18px]"
                            onClick={handleDecrease}
                            disabled={leverage === 1}
                        >
                            -
                        </button>
                        <div className="font-semibold">{leverage}</div>
                        <button
                            className="text-appPurple text-[18px]"
                            onClick={handleIncrease}
                            disabled={leverage === 25}
                        >
                            +
                        </button>
                    </div>

                    <Slider
                        value={leverage}
                        onChange={handleSliderChange}
                        defaultValue={15}
                        valueLabelDisplay="auto"
                        step={null}
                        marks={leverageMarks}
                        min={1}
                        max={25}
                        sx={{
                            color: '#A78BFA',
                            '& .MuiSlider-thumb': {
                                bgcolor: '#A78BFA',
                                width: '8px',
                                height: '8px',
                                borderRadius: '100%',
                            },
                            '& .MuiSlider-mark': {
                                width: '8px',
                                height: '8px',
                                borderRadius: '100%',
                                backgroundColor: '#CFD3E5',
                            },
                            '& .MuiSlider-markLabel': {
                                color: '#CFD3E5',
                                fontSize: '12px',
                            },
                        }}
                    />

                    <div className="flex mt-[2rem] text-[#CFD3E5] items-center gap-1">
                        <LuDot className="" size={18} />
                        <p className="text-[13px]">
                            Total size allowed: 2,500,000 USDC
                        </p>
                    </div>
                    {/* warning */}
                    <div className="border-[1px] mt-[1rem] rounded-[6px] border-[#D3AB38] py-2 px-2 flex text-[#D3AB38] bg-[rgba(211,172,56,0.2)] gap-1">
                        <RiErrorWarningLine
                            size={30}
                            className="text-[#D3AB38]"
                        />
                        <p className="text-[11px] ">
                            Selecting higher leverage such as [10x] increases
                            your liquidation risk. Always manage your risk
                            levels.
                        </p>
                    </div>

                    {/* buttons */}
                    <div
                        onClick={handleClose}
                        className="flex mt-[1rem] w-full gap-4 items-center"
                    >
                        <button className="bg-[#282828] w-[40%] text-[14px] hover:bg-opacity-30 rounded-[8px] py-2 px-4">
                            Isolated
                        </button>
                        <button className="bg-appPurple w-[60%] text-appDarkBlue text-[14px] hover:bg-[#9186C6]  rounded-[8px] py-2 px-4">
                            Confirm leverage
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Available Balance */}
            <div className="justify-between mt-[1rem] text-[11px] xl:text-[13.5px] flex items-center">
                <p className="text-appGrey text-[11px] 2xl:text-[13px]">
                    Available Balance
                </p>

                <p className="text-end flex gap-1 text-[11px] 2xl:text-[13px] xl:items-center font-semibold">
                    {availableBalance} USD
                    <button>
                        <FaCirclePlus color="#B7ABF7" />
                    </button>
                </p>
            </div>

            {/* active button display  */}
            <div className="bg-[#2C2D31] w-full text-appPurple rounded-[8px] py-[0.4rem] px-4 justify-center flex flex-col font-medium text-[13px]  min-h-[40px]">
                {activeButton === 'limit' && (
                    <div className="flex w-full justify-between items-center">
                        <p className="capitalize text-[14px] text-appPurple">
                            price
                        </p>
                        <p className="uppercase text-[14px] text-appPurple">
                            usd
                        </p>
                    </div>
                )}
                {activeButton === 'market' && (
                    <p className="capitalize text-center w-full text-[14px] text-appPurple">
                        Market Price
                    </p>
                )}
                {activeButton === 'stop-limit' && (
                    <p className="capitalize text-center w-full text-[14px] text-appPurple">
                        Market Price
                    </p>
                )}
            </div>

            {/* Amount Section */}
            <div className=" w-full bg-[#2C2D31] mt-[0.3rem] rounded-[8px] py-[0.4rem] font-medium min-h-[40px] gap-2 px-[1rem] flex items-center text-[13px]  ">
                <p className="">Amount</p>
                <input
                    type="text"
                    name="amount"
                    value={amount}
                    onChange={handleInputChange} // Only updates input locally
                    className="py-[5px] w-full rounded-[8px] outline-none bg-transparent placeholder:text-appGrey2 px-1 md:px-2"
                />
                <p className="text-end gap-1 text-appGrey ">USD </p>
            </div>

            {/* Slider */}
            <Slider
                value={sliderValue}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                step={20}
                marks
                min={0}
                max={100}
                sx={{
                    color: '#A78BFA',
                    '& .MuiSlider-thumb': {
                        bgcolor: '#A78BFA',
                        width: '8px',
                        height: '8px',
                        borderRadius: '100%',
                    },
                    '& .MuiSlider-mark': {
                        width: '8px',
                        height: '8px',
                        borderRadius: '100%',
                        backgroundColor: '#CFD3E5',
                    },
                }}
            />

            <div className="flex text-appGrey mt-[-1rem] text-[12px] justify-between items-center">
                <p className="text-appGrey text-[13px]">0</p>
                <p className="text-appGrey text-[13px]">100%</p>
            </div>

            <div className=" border-t-[1px] mb-[0.5rem]  mt-[1.5rem] border-[#4B5563]" />

            {/* Checkboxes */}
            <div className="flex flex-col">
                <FormControlLabel
                    control={<CustomCheckbox size="small" />}
                    label="TP/SL"
                    sx={{
                        '& .MuiTypography-root': {
                            fontSize: '13px',
                        },
                    }}
                />
                <FormControlLabel
                    control={<CustomCheckbox size="small" />}
                    label="Advanced"
                    sx={{
                        '& .MuiTypography-root': {
                            fontSize: '13px',
                        },
                        marginTop: '-0.7rem',
                    }}
                />
            </div>

            {/* Total Fee */}
            <div className="flex justify-end items-center">
                <div className="flex items-center gap-[1px]">
                    <div className="min-w-[70px] text-[11px] rounded-l-[6px] h-[30px] flex justify-center items-center  bg-[#2C2D31]">
                        Total Fee
                    </div>

                    <div className="min-w-[70px] text-[11px] rounded-r-[6px] h-[30px] flex justify-center items-center font-semibold  bg-[#2C2D31]">
                        $10
                    </div>
                </div>
            </div>

            <div className=" border-t-[1px] mb-[0.5rem]  mt-[1.5rem] border-[#4B5563]" />

            {/* Action Buttons */}
            <div className="flex w-full capitalize justify-center items-center mt-[1rem] gap-4">
                <Button
                    variant="contained"
                    sx={{
                        bgcolor:
                            buyorSellBtn === 'buy/long' ? '#B5A8F7' : '#2C2D31',
                        color: buyorSellBtn === 'buy/long' ? '#1C1C1C' : '',
                        borderRadius: '8px',
                        textTransform: 'capitalize',
                        minWidth: '100px',
                        '&:hover': {
                            bgcolor: '#9186C6',
                            color: '#1C1C1C',
                        },
                    }}
                    onClick={() => setBuyorSellBtn('buy/long')}
                >
                    Buy/Long
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor:
                            buyorSellBtn === 'sell/short'
                                ? '#B5A8F7'
                                : '#2C2D31',
                        borderRadius: '8px',
                        textTransform: 'capitalize',
                        minWidth: '100px',
                        color: buyorSellBtn === 'sell/short' ? '#1C1C1C' : '',
                        '&:hover': {
                            bgcolor: '#2C2D31',
                            color: '#fff',
                            opacity: 2,
                        },
                    }}
                    onClick={() => setBuyorSellBtn('sell/short')}
                >
                    Sell/Short
                </Button>
            </div>

            {/* account details  */}
            <div className="mt-[3rem] text-[12px] flex flex-col gap-2">
                <h2 className=" text-[14.5px] font-semibold text-appPurple">
                    Account
                </h2>
                <div className="flex justify-between items-center">
                    <p className="text-[#CFD3E5]">Equity</p>
                    <p className="text-end font-semibold">$2,999,765</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-[#CFD3E5] capitalize">
                        Available balance
                    </p>
                    <p className="text-end font-semibold">
                        ${availableBalance}{' '}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-[#CFD3E5]">Unrealized PNL</p>
                    <p className="text-end font-semibold">+$999</p>
                </div>
            </div>

            {/* deposit/withdraw Buttons */}
            <div className="flex w-full capitalize justify-center items-center mt-[1.5rem] gap-4">
                <Button
                    variant="contained"
                    sx={{
                        fontSize: '12px',
                        bgcolor: '#B5A8F7',
                        fontWeight: '500',
                        color: '#1C1C1C',
                        borderRadius: '8px',
                        width: '100%',
                        textTransform: 'capitalize',
                        // color: '#1C1C1C',
                        '&:hover': { bgcolor: '#9061F9' },
                    }}
                >
                    Deposit
                </Button>
            </div>
        </div>
    )
}

export default SideViewComp
