import React from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useEffect } from "react"
const LotteryEntrance = () => {
    const { chainId, isWeb3Enabled } = useMoralis()
    //console.log(parseInt(chainId))
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    let entranceFee = ""
    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        // msgValue:?,
    })
    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
        // msgValue:?,
    })
    async function updateUI() {
        if (isWeb3Enabled) {
            const entranceFeeFromCall = (await getEntranceFee()).toString()
            console.log(entranceFeeFromCall)
        }
    }
    useEffect(() => {
        // await function wont work in useEffect

        updateUI()
    }, [isWeb3Enabled])
}

export default LotteryEntrance
