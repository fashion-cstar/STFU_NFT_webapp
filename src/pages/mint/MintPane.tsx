/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@mui/material'
import React, { useState } from 'react'

export const MintPane = () => {

    const handleDec = () => {

    }

    const handleInc = () => {

    }

    const onMint = async () => {

    }

    return (
        <div className="w-full max-w-[700px] flex flex-col gap-2 items-center">
            <div className='text-[25px] text-white uppercase text-center' style={{ textShadow: '2px 2px #000000' }}>
                ammount to mint:
            </div>
            <div className='flex items-center justify-center gap-8 md:gap-10'>
                <div className='cursor-pointer' onClick={handleDec}>
                    <svg width="17" height="2" viewBox="0 0 17 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.07849 1H15.0785" stroke="#6FFF39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className='text-[35px] text-white underline'>1</div>
                <div className='cursor-pointer' onClick={handleInc}>
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.07849 1V15" stroke="#6FFF39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1.07849 8H15.0785" stroke="#6FFF39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            <Button
                variant="contained"
                sx={{ width: "280px", height: '50px', fontFamily: 'agressive', boxShadow: '3px 3px #000' }}
                color="primary"
                onClick={onMint}
                // disabled={!isApproved || amount.lte(0) || amount.gt(stfuBalance) || !account}
            >
                <span className='text-[30px] text-[#000000] uppercase'>mint now*</span>
            </Button>
            <div className='text-[20px] text-white uppercase font-normal text-center' style={{fontFamily: 'Bebas'}}>
                your minted nfts: 0  total nfts minted: 000/600
            </div>
        </div>
    )
}
