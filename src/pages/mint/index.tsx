/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import MintBy_desktop from 'src/common/svgs/MintBy_desktop'
import MintBy_mobile from 'src/common/svgs/MintBy_mobile'
import { MintPane } from './MintPane'
import { useNFT } from 'src/contexts'
import { formatEther } from '@ethersproject/units'

export const Mint = () => {
    const { mintStatus } = useNFT()

    return (
        <div className="w-full">
            <div className="w-full relative pt-[53px]">
                <div className={`absolute left-[0px] top-[-10px] h-[53px] bg-[#6FFF39] bg-center bg-repeat-x bg-[url('./assets/nft_mobile_side.svg')] lg:bg-[url('./assets/nft_desktop_side.svg')]`} style={{ width: 'calc(100% + 190px)' }}>

                </div>
                <div className='w-full flex flex-col xl:flex-row justify-center xl:items-end gap-2 px-8'>
                    <div className='flex flex-col lg:flex-row items-center justify-center lg:gap-4 leading-[1] mint-title-shadow lg:mt-4 xl:mt-8'>
                        <span className='lg:text-[70px] lg:text-[60px] text-[50px] text-[#000] uppercase'>mad</span>
                        <span className='lg:text-[70px] lg:text-[60px] text-[50px] text-[#000] uppercase'>scientists</span>
                    </div>
                    <div className='hidden lg:flex mb-2 px-4 justify-center'>
                        <MintBy_desktop />
                    </div>
                    <div className='lg:hidden px-4 flex justify-center'>
                        <MintBy_mobile />
                    </div>
                </div>
                <div className='w-full flex justify-center mt-8'>
                    <div className='w-full lg:mx-6 border border-b border-[#000]'></div>
                </div>
                <div className='w-full flex justify-center mt-[1px]'>
                    <div className='w-full lg:mx-6 border border-b border-[#6FFF39]'></div>
                </div>
                <div className='w-full flex flex-col lg:flex-row justify-center lg:mt-8'>
                    <div className='flex lg:hidden w-full bg-app-purple justify-center mb-16'>
                        <MintPane />
                    </div>
                    <div className='w-full lg:basis-1/2 px-5 xl:px-12'>
                        <div className={`w-full flex justify-center lg:justify-end`}>
                            <div>
                                <div className='relative'>
                                    <img src="./nft_logo.png" />
                                    <div className='absolute bottom-0 left-0 bg-app-purple p-2 lg:p-4 text-white text-[13px] lg:text-[15px] uppercase'>
                                        <span className='whitespace-nowrap'>Mint 1 of the 3 'Easter Egg' Mad</span><br />
                                        <span className='whitespace-nowrap'>Scientists and win up to 4 BNB'</span>
                                    </div>
                                </div>
                                <div className='w-full flex justify-center gap-[10px] mt-5 lg:mt-8'>
                                    <div className='bg-[#6FFF39] w-[60px] h-[60px]' style={{ borderRadius: '50%' }} />
                                    <div className='bg-[#6FFF39] w-[60px] h-[60px]' style={{ borderRadius: '50%' }} />
                                    <div className='bg-[#6FFF39] w-[60px] h-[60px]' style={{ borderRadius: '50%' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full lg:basis-1/2 mt-8 lg:mt-0'>
                        <div className='hidden lg:block w-full bg-app-purple'>
                            <MintPane />
                        </div>
                        <div className='mt-8 mb-12 px-5 lg:pr-8 lg:pl-0 font-semibold' style={{ fontFamily: 'Bebas' }}>
                            <div className='w-full max-w-[700px] text-[#000] text-[20px] lg:text-[25px] uppercase'>
                                The Mad Scientist NFT collection isn’t just your average ’PFP’ avatar NFT. It is a gateway into the STFU Labs NFT and De-Fi ecosystem. These exclusive ‘Scientists’ all have their own personality and character traits that make them unique by any definition. The entire collection was hand-painted by accomplished artist and STFU Labs lead graphics designer Charon Mortis.
                                <br /><br />
                                And staying true to our focus with the entire project of bringing you passive income, these 'Mad Scientists' NFT's can be staked to earn BNB!
                            </div>
                            <br />
                            <div className='w-full max-w-[700px] text-[#7F41E4] text-[20px] lg:text-[25px] uppercase'>
                                {`*each mint costs ${formatEther(mintStatus.tokenPerMint)} $STFU and ${formatEther(mintStatus.bnbPerMint)} BNB. Once nfts are minted you cannot undo this action`}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`absolute left-[0px] bottom-[-30px] h-[50px] lg:h-[30px] bg-[#6FFF39] bg-center lg:bg-top bg-repeat-x bg-[url('./assets/nft_mobile_side.svg')] lg:bg-[url('./assets/nft_desktop_side.svg')]`} style={{ width: 'calc(100% + 190px)' }}>
                </div>
            </div>
        </div>
    )
}
