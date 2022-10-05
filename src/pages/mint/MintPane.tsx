/* eslint-disable react-hooks/exhaustive-deps */
import LoadingButton from '@mui/lab/LoadingButton'
import { useEthers } from '@usedapp/core'
import { BigNumber } from 'ethers'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { AppTokenAddress, MetaData_base_URL, NFTContractAddress } from 'src/constants/AppConstants'
import { useNFT } from 'src/contexts'
import { formatEther, maxAmount } from 'src/utils'
import { useApproveCallback, useTokenAllowance } from 'src/hooks/hooks'
import { debounce } from "lodash"

export const MintPane = () => {
    const { mintStatus, userNfts, bnbBalance, stfuBalance, totalSupply, bnbPerMint, tokenPerMint, maxBalance, maxSupply, updateNFTStats, mintCallback } = useNFT()
    const [amount, setAmount] = useState(1)
    const [availableAmount, setAvailableAmount] = useState(0)
    const { account } = useEthers()
    const [reqBNB, setReqBNB] = useState(BigNumber.from(0))
    const [reqSTFU, setReqSTFU] = useState(BigNumber.from(0))
    const [isMinting, setIsMinting] = useState(false)
    const { tokenAllowanceCallback } = useTokenAllowance()
    const { approveCallback } = useApproveCallback()
    const [isWalletApproving, setIsWalletApproving] = useState(false)
    const [isApproved, setIsApproved] = useState(false)
    const [isCheckingAllowance, setIsCheckingAllowance] = useState(false)

    useEffect(() => {
        if (mintStatus) {            
            if (mintStatus.isPaymentForMint) {
                setReqBNB(bnbPerMint.mul(BigNumber.from(amount)))
                setReqSTFU(tokenPerMint.mul(BigNumber.from(amount)))
            } else {
                setReqBNB(BigNumber.from(0))
                setReqSTFU(BigNumber.from(0))
            }
        }
    }, [bnbPerMint, tokenPerMint, amount, mintStatus])

    const init = () => {
        setIsApproved(false)
        setIsMinting(false)
        setIsWalletApproving(false)
        setIsCheckingAllowance(false)
        setAmount(1)
    }

    const checkUserApproved = useRef(
        debounce(async () => {
            setIsCheckingAllowance(true)
        }, 500)
    ).current;

    const checkAllowance = async (): Promise<boolean> => {
        try {
            let res = await tokenAllowanceCallback(account, NFTContractAddress, AppTokenAddress, 'bsc')
            if (res.gte(reqSTFU) && reqSTFU.gt(0)) {
                return true
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    }

    useEffect(() => {
        const fetch = async () => {
            let res = await checkAllowance()
            if (res) setIsApproved(true)
            setIsCheckingAllowance(false)
        }
        if (isCheckingAllowance) {
            fetch()
        }
    }, [isCheckingAllowance])

    useEffect(() => {
        checkUserApproved()
    }, [amount, account])

    const onApprove = async () => {
        setIsWalletApproving(true)
        let res = await checkAllowance()
        if (!res) {
            try {
                await approveCallback(NFTContractAddress, AppTokenAddress, maxAmount, 'bsc').then((hash: string) => {
                    setIsWalletApproving(false)
                    setIsApproved(true)
                    toast.success('Approved!')
                }).catch((error: any) => {
                    console.log(error)
                    setIsWalletApproving(false)
                    let err: any = error
                    toast.error((err.data?.message || err?.message || err).toString())
                })
            } catch (error) {
                console.log(error)
                setIsWalletApproving(false)
            }
        } else {
            toast.success('Approved!')
            setIsWalletApproving(false)
            setIsApproved(true)
        }
        return null;
    }

    useEffect(() => {
        init()
    }, [account])

    useEffect(() => {
        if (userNfts) {
            setAvailableAmount(maxBalance - userNfts.balance)
            if ((maxBalance - userNfts.balance) <= 0) setAmount(0)
        }
    }, [maxBalance, userNfts])

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
        setIsMinting(true)
        let tokenURIs: string[] = []
        for (let i = totalSupply + 1; i <= totalSupply + amount; i++) {
            tokenURIs[i - totalSupply - 1] = MetaData_base_URL + "/" + i + ".json"
        }
        try {            
            mintCallback(tokenURIs, reqSTFU, reqBNB).then((res: any) => {
                if (res.status === 1) {
                    updateNFTStats()
                    toast.success(`Successfully Minted!`)
                } else {
                    toast.error(`Transaction reverted! Tx:${res.hash}`)
                }
                setIsMinting(false)
            }).catch(error => {
                setIsMinting(false)
                console.log(error)
                let err: any = error
                toast.error((err.data?.message || err?.message || err).toString())
            })
        } catch (error) {
            setIsMinting(false)
            console.log(error)
        }
        return null;
    }

    return (
        <div className="w-full max-w-[700px] flex flex-col gap-2 items-center py-2">
            <div className='text-[25px] text-white uppercase text-center' style={{ textShadow: '2px 2px #000000' }}>
                ammount to mint:
            </div>
            <div className='flex items-center justify-center gap-8 md:gap-10'>
                <div className={`${amount <= 1 || availableAmount === 0 ? 'bg-[#404040]' : 'cursor-pointer bg-[#000]'} rounded-[5px] w-[30px] h-[30px] flex justify-center items-center`} onClick={handleDec}>
                    <svg width="17" height="2" viewBox="0 0 17 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.07849 1H15.0785" stroke="#6FFF39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className='text-[35px] text-white border-b border-white p-0 leading-[1]'>{amount}</div>
                <div className={`${amount >= availableAmount ? 'bg-[#404040]' : 'cursor-pointer bg-[#000]'} rounded-[5px] w-[30px] h-[30px] flex justify-center items-center`} onClick={handleInc}>
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.07849 1V15" stroke="#6FFF39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1.07849 8H15.0785" stroke="#6FFF39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            {!isApproved && <LoadingButton
                variant="contained"
                sx={{ width: "280px", height: '50px', fontFamily: 'agressive', boxShadow: '3px 3px #000' }}
                loading={isWalletApproving}
                loadingPosition="start"
                color="primary"
                onClick={onApprove}
                disabled={isApproved || isCheckingAllowance || amount <= 0 || bnbBalance.lt(reqBNB) || stfuBalance.lt(reqSTFU) || !account}
            >
                <span className='text-[26px] text-[#000000]'>{isWalletApproving ? 'Approving ...' : isApproved ? "Approved" : "Approve"}</span>
            </LoadingButton>}
            {isApproved && <LoadingButton
                variant="contained"
                sx={{ width: "280px", height: '50px', fontFamily: 'agressive', boxShadow: '3px 3px #000' }}
                loading={isMinting}
                loadingPosition="start"
                color="primary"
                onClick={onMint}
                disabled={!account || bnbBalance.lt(reqBNB) || stfuBalance.lt(reqSTFU) || amount <= 0 || !userNfts}
            >
                <span className='text-[28px] text-[#000000] uppercase'>{isMinting ? 'Minting...' : 'mint now*'}</span>
            </LoadingButton>}
            <div className='w-full flex flex-col'>
                <div className='text-[20px] text-white uppercase font-normal text-center flex gap-4 justify-center w-full' style={{ fontFamily: 'Bebas' }}>
                    {userNfts && <div>your minted nfts:{' '}<span className='text-[#6FFF39]'>{userNfts.balance}</span></div>}
                    <div>total nfts minted:{' '}<span className='text-[#6FFF39]'>{totalSupply}/{maxSupply}</span></div>
                </div>
                {account && <div className="w-full flex justify-center gap-4" style={{ fontFamily: 'Bebas' }}>
                    <div className='text-[18px] text-white uppercase'>BNB balance:{' '}<span className='text-[#6FFF39]'>{formatEther(bnbBalance, 18, 3, true)}</span></div>
                    <div className='text-[18px] text-white uppercase'>STFU balance:{' '}<span className='text-[#6FFF39]'>{formatEther(stfuBalance, 18, 3, true)}</span></div>
                </div>
                }
                {account && bnbBalance.lt(reqBNB) ?
                    <div className='text-[#FFFF00] text-[16px] text-center' style={{ fontFamily: 'Bebas' }}>Insufficient BNB balance!</div> :
                    <>
                        {account && stfuBalance.lt(reqSTFU) && <div className='text-[#FFFF00] text-[16px] text-center' style={{ fontFamily: 'Bebas' }}>Insufficient STFU balance!</div>}
                    </>
                }
            </div>
        </div>
    )
}
