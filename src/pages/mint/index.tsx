/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import MintBy_desktop from 'src/common/svgs/MintBy_desktop'
import MintBy_mobile from 'src/common/svgs/MintBy_mobile'
import { MintPane } from './MintPane'

export const Mint = () => {

    return (
        <div className="w-full">
            <div className="w-full h-screen relative pt-[53px]">
                <div className={`absolute left-[0px] top-[-10px] h-[53px] bg-[#6FFF39] bg-center bg-repeat-x bg-[url('./assets/nft_mobile_side.svg')] md:bg-[url('./assets/nft_desktop_side.svg')]`} style={{ width: 'calc(100% + 190px)' }}>
                </div>
                <div className='w-full flex justify-center flex-wrap items-end gap-2 px-8'>
                    <div className='flex flex-col md:flex-row items-center justify-center md:gap-4 leading-[1] mint-title-shadow md:mt-4 xl:mt-8'>
                        <span className='lg:text-[70px] md:text-[60px] text-[50px] text-[#000] uppercase'>mad</span>
                        <span className='lg:text-[70px] md:text-[60px] text-[50px] text-[#000] uppercase'>scientists</span>
                    </div>
                    <div className='hidden md:block mb-2 px-4'>
                        <MintBy_desktop />
                    </div>
                    <div className='md:hidden px-4'>
                        <MintBy_mobile />
                    </div>
                </div>
                <div className='w-full flex justify-center mt-8'>
                    <div className='w-full md:mx-6 border border-b border-[#000]'></div>
                </div>
                <div className='w-full flex justify-center mt-[1px]'>
                    <div className='w-full md:mx-6 border border-b border-[#6FFF39]'></div>
                </div>
                <div className='w-full flex flex-col md:flex-row justify-center'>
                    <div className='w-full md:basis-1/2 px-2 xl:px-6'>
                        <div className={`w-full flex justify-center md:justify-end`}>
                            <div>
                                <div className='relative'>
                                    <img src="./nft_logo.png" />
                                    <div className='absolute bottom-0 left-0 bg-app-purple p-2 md:p-4 text-white text-[13px] md:text-[15px] uppercase'>
                                        <span className='whitespace-nowrap'>Mint 1 of the 3 'Easter Egg' Mad</span><br />
                                        <span className='whitespace-nowrap'>Scientists and win up to 4 BNB'</span>
                                    </div>
                                </div>
                                <div className='w-full flex justify-center gap-[10px] mt-5 md:mt-8'>
                                    <div className='bg-[#6FFF39] w-[60px] h-[60px]' style={{ borderRadius: '50%' }} />
                                    <div className='bg-[#6FFF39] w-[60px] h-[60px]' style={{ borderRadius: '50%' }} />
                                    <div className='bg-[#6FFF39] w-[60px] h-[60px]' style={{ borderRadius: '50%' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full md:basis-1/2'>
                        <div className='w-full bg-app-purple'>
                            <MintPane />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
