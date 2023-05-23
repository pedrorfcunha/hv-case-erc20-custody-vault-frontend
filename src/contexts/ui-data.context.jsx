import { createContext, useState, useEffect } from "react";
import { useAccount, useContractRead } from "wagmi";
import { ethers } from "ethers";

import custodyVaultAbi from "../constants/custody-vault-abi.json";
import hvcTokenAbi from "../constants/hvc-token-abi.json";

export const UiDataContext = createContext({
    custodyVaultData: [],
    updateUIValues: () => {},
    userTokenBalance: null,
});

export const UiDataProvider = ({ children }) => {
    const { address, isConnected } = useAccount();
    const [custodyVaultData, setCustodyVaultData] = useState([]);
    const [userTokenBalance, setUserTokenBalance] = useState([]);

    const custodyVaultAddress =
        process.env.REACT_APP_CUSTODY_VAULT_CONTRACT_ADDRESS;
    const hvcTokenAddress = process.env.REACT_APP_HVC_TOKEN_CONTRACT_ADDRESS;

    const getAllDeposits = useContractRead({
        address: custodyVaultAddress,
        abi: custodyVaultAbi,
        functionName: "getAllDeposits",
        enabled: false,
    });

    const checkUserBalance = useContractRead({
        address: hvcTokenAddress,
        abi: hvcTokenAbi,
        functionName: "balanceOf",
        args: [address],
        enabled: false,
        onError(error) {
            console.log("Error", error);
        },
    });

    const updateUIValues = async () => {
        const userTokenBalanceFromCall = await checkUserBalance.refetch();
        const formattedUserTokenBalance = ethers.utils.formatUnits(
            userTokenBalanceFromCall.data,
            18
        );
        setUserTokenBalance(formattedUserTokenBalance);
        const custodyVaultDataFromCall = await getAllDeposits.refetch();
        setCustodyVaultData(custodyVaultDataFromCall.data);
    };

    useEffect(() => {
        if (isConnected) {
            updateUIValues();
        }
    }, [address]);

    const value = {
        custodyVaultData,
        userTokenBalance,
        updateUIValues,
    };

    return (
        <UiDataContext.Provider value={value}>
            {children}
        </UiDataContext.Provider>
    );
};
