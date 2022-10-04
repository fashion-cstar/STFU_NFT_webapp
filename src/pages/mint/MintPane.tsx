/* eslint-disable react-hooks/exhaustive-deps */
import LoadingButton from '@mui/lab/LoadingButton'
import { useEthers } from '@usedapp/core'
import { BigNumber } from 'ethers'
import React, { useEffect, useState } from 'react'
import { useNFT } from 'src/contexts'

export const MintPane = () => {
    const { mintStatus, userNfts, bnbBalance, stfuBalance } = useNFT()
    const [amount, setAmount] = useState(1)
    const [availableAmount, setAvailableAmount] = useState(0)
    const { account } = useEthers()
    const [reqBNB, setReqBNB] = useState(BigNumber.from(0))
    const [reqSTFU, setReqSTFU] = useState(BigNumber.from(0))
    const [isMinting, setIsMinting] = useState(false)

    useEffect(() => {
        if (mintStatus) {
            setReqBNB(mintStatus.bnbPerMint.mul(BigNumber.from(amount)))
            setReqSTFU(mintStatus.tokenPerMint.mul(BigNumber.from(amount)))
        }
    }, [mintStatus, amount])

    useEffect(() => {
        if (mintStatus && userNfts) {
            setAvailableAmount(mintStatus.maxBalance - userNfts.balance)
            if ((mintStatus.maxBalance - userNfts.balance) <= 0) setAmount(0)
        }
    }, [mintStatus, userNfts])

    const handleDec = () => {
        if (account) {
            if (amount >= 2) setAmount((n) => n - 1)
            if (availableAmount === 0) setAmount(0)
        }
    }

    const handleInc = () => {
        if (account) {
            if (amount < availableAmount) setAmount((n) => n + 1)
        }
    }

    const onMint = async () => {

    }

    return (
        <div className="w-full max-w-[700px] flex flex-col gap-2 items-center">
            <div className='text-[25px] text-white uppercase text-center' style={{ textShadow: '2px 2px #000000' }}>
                ammount to mint:
            </div>
            <div className='flex items-center justify-center gap-8 md:gap-10'>
                <div className={`${amount <= 1 || availableAmount === 0 ? 'bg-grey' : 'cursor-pointer bg-[#000]'} rounded-[5px] w-[30px] h-[30px] flex justify-center items-center`} onClick={handleDec}>
                    <svg width="17" height="2" viewBox="0 0 17 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.07849 1H15.0785" stroke="#6FFF39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className='text-[35px] text-white border-b border-white p-0 leading-[1]'>1</div>
                <div className={`${amount >= availableAmount ? 'bg-grey' : 'cursor-pointer bg-[#000]'} rounded-[5px] w-[30px] h-[30px] flex justify-center items-center`} onClick={handleInc}>
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.07849 1V15" stroke="#6FFF39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1.07849 8H15.0785" stroke="#6FFF39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>     
            <LoadingButton
                variant="contained"
                sx={{ width: "280px", height: '50px', fontFamily: 'agressive', boxShadow: '3px 3px #000' }}
                loading={isMinting}
                loadingPosition="start"
                color="primary"
                onClick={onMint}
                disabled={!account || bnbBalance.lt(reqBNB) || stfuBalance.lt(reqSTFU) || amount<=0}
            >                
                <span className='text-[28px] text-[#000000] uppercase'>{isMinting?'Minting...':'mint now*'}</span>
            </LoadingButton>
            <div className='text-[20px] text-white uppercase font-normal text-center' style={{ fontFamily: 'Bebas' }}>
                {`your minted nfts: 0  total nfts minted: 000/600`}
                <span className='text-[#FFFF00] text-[16px]' style={{ fontFamily: 'Bebas' }}>No enough BNB to mint</span>
                <span className='text-[#FFFF00] text-[16px]' style={{ fontFamily: 'Bebas' }}>No enough $STFU to mint</span>
            </div>
        </div>
    )
}
