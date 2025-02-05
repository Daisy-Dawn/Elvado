'use client'
import { useState } from 'react'
import {
    Select,
    MenuItem,
    Slider,
    Checkbox,
    Button,
    FormControlLabel,
    styled,
    SelectChangeEvent,
} from '@mui/material'
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { FaCirclePlus } from 'react-icons/fa6'

const StyledSelect = styled(Select)({
    backgroundColor: '#2C2D31',
    color: '#fff',
    padding: '3px 3px',
    borderRadius: '0px 6px 6px 0px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '0px 6px 6px 0px', // Apply border-radius to top-right and bottom-right
        backgroundColor: '#2C2D31', // Ensure the background remains consistent
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '& .MuiSelect-icon': {
        color: '#fff',
    },
    '& .MuiSelect-root': {
        padding: '0 6px', // Add extra padding if needed for spacing consistency
    },
})

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

const Marketcomp = () => {
    const [leverage, setLeverage] = useState<number>(15)
    const [activeButton, setActiveButton] = useState('buy/long')
    const [DepositButton, setDepositButton] = useState('deposit')
    const [amount, setAmount] = useState(0)

    const handleAmountChange = (event: SelectChangeEvent<unknown>) => {
        setLeverage(event.target.value as number)
    }

    return (
        <div className="min-h-screen flex flex-col gap-[0.5rem] px-[1rem] py-[0.5rem]">
            {/* Leverage Selector */}
            <div className="flex items-center gap-[1px]">
                <div className="min-w-[70px] text-[12px] rounded-l-[6px] h-[30px] flex justify-center items-center  bg-[#2C2D31]">
                    Leverage
                </div>

                <StyledSelect
                    value={leverage}
                    onChange={handleAmountChange}
                    size="small"
                    className="min-w-[70px] text-[12px] font-semibold flex justify-center items-center rounded-r-[6px] h-[30px]"
                >
                    <MenuItem value="5">5x</MenuItem>
                    <MenuItem value="10">10x</MenuItem>
                    <MenuItem value="15">15x</MenuItem>
                    <MenuItem value="20">20x</MenuItem>
                </StyledSelect>
            </div>

            {/* Available Balance */}
            <div className="justify-between mt-[0.3rem] text-[13.5px] flex items-center">
                <p className="text-appPurple">Available Balance</p>
                <p className="text-end flex gap-1 items-center font-semibold">
                    1,550.85 USD{' '}
                    <button>
                        <FaCirclePlus color="#B7ABF7" />
                    </button>
                </p>
            </div>

            {/* Market Price  */}
            <div className="bg-[#2C2D31] w-full text-appPurple rounded-[8px] py-[0.4rem] flex items-center justify-center font-medium text-[13px]  min-h-[40px]">
                Market Price
            </div>

            {/* Amount Section */}
            <div className=" w-full bg-[#2C2D31] mt-[0.3rem] rounded-[8px] py-[0.4rem] font-medium min-h-[40px] justify-between px-[1rem] flex items-center text-[13px]  ">
                <p className="">Amount</p>
                <p className="text-end gap-1 text-appGrey ">USD </p>
            </div>
            <Slider
                value={amount}
                onChange={(_, value) => setAmount(value as number)}
                defaultValue={40}
                valueLabelDisplay="auto"
                shiftStep={20}
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
            <div className="flex text-appGrey text-[12px] justify-between items-center">
                <p>0</p>
                <p>100%</p>
            </div>

            <div className=" border-[1px] my-[0.7rem] border-[#4B5563] bg-[#4B5563]" />

            {/* Checkboxes */}
            <div className="flex flex-col gap-1">
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
                    }}
                />
            </div>

            {/* Total Fee */}
            <div className="flex justify-end items-center">
                <div className="flex items-center gap-[1px]">
                    <div className="min-w-[70px] text-[12px] rounded-l-[6px] h-[30px] flex justify-center items-center  bg-[#2C2D31]">
                        Total Fee
                    </div>

                    <div className="min-w-[70px] text-[12px] rounded-l-[6px] h-[30px] flex justify-center items-center font-semibold  bg-[#2C2D31]">
                        $10
                    </div>
                </div>
            </div>

            <div className=" border-[1px] border-[#4B5563] bg-[#4B5563]" />

            {/* Action Buttons */}
            <div className="flex w-full capitalize justify-center items-center mt-[1rem] gap-4">
                <Button
                    variant="contained"
                    sx={{
                        bgcolor:
                            activeButton === 'buy/long' ? '#B5A8F7' : '#2C2D31',
                        color: activeButton === 'buy/long' ? '#1C1C1C' : '',
                        borderRadius: '8px',
                        textTransform: 'capitalize',
                        minWidth: '120px',
                        '&:hover': { bgcolor: '#9061F9', color: '#1C1C1C' },
                    }}
                    onClick={() => setActiveButton('buy/long')}
                >
                    Buy/Long
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor:
                            activeButton === 'sell/short'
                                ? '#B5A8F7'
                                : '#2C2D31',
                        borderRadius: '8px',
                        textTransform: 'capitalize',
                        minWidth: '120px',
                        color: activeButton === 'sell/short' ? '#1C1C1C' : '',
                        '&:hover': { bgcolor: '#9061F9', color: '#1C1C1C' },
                    }}
                    onClick={() => setActiveButton('sell/short')}
                >
                    Sell/Short
                </Button>
            </div>

            {/* account details  */}
            <div className="mt-[2rem] text-[13.5px] flex flex-col gap-2">
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
                    <p className="text-end font-semibold">$2,999,765</p>
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
                        bgcolor:
                            DepositButton === 'deposit' ? '#B5A8F7' : '#2C2D31',
                        fontWeight: DepositButton === 'deposit' ? '500' : '400',
                        color:
                            DepositButton === 'deposit' ? '#1C1C1C' : '#CFD3E5',
                        borderRadius: '8px',
                        minWidth: '120px',
                        textTransform: 'capitalize',
                        // color: '#1C1C1C',
                        '&:hover': { bgcolor: '#9061F9' },
                    }}
                    onClick={() => setDepositButton('deposit')}
                >
                    Deposit
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor:
                            DepositButton === 'withdraw'
                                ? '#B5A8F7'
                                : '#2C2D31',
                        fontWeight:
                            DepositButton === 'withdraw' ? '500' : '400',
                        borderRadius: '8px',
                        minWidth: '120px',
                        textTransform: 'capitalize',
                        color:
                            DepositButton === 'withdraw'
                                ? '#1C1C1C'
                                : '#CFD3E5',
                        '&:hover': { bgcolor: '#9061F9' },
                    }}
                    onClick={() => setDepositButton('withdraw')}
                >
                    Withdraw
                </Button>
            </div>
        </div>
    )
}

export default Marketcomp
