import hvcTokenAbi from "../../constants/hvc-token-abi.json";
import { useAccount, useContractWrite, useContractRead } from "wagmi";
import { useContext } from "react";
import { ethers } from "ethers";
import { Button, useToast } from "@chakra-ui/react";

import { UiDataContext } from "../../contexts/ui-data.context";
import TransferPanel from "../transfer-panel/transfer-panel.component";

import "./sample-token-container.styles.scss";
import hvcLogo from "../../assets/hvc-logo.png";

const SampleTokenContainer = () => {
    const { userTokenBalance, updateUIValues } = useContext(UiDataContext);

    const amount = "10000000000000000000";

    const hvcTokenAddress = process.env.REACT_APP_HVC_TOKEN_CONTRACT_ADDRESS;
    const custodyVaultAddress =
        process.env.REACT_APP_CUSTODY_VAULT_CONTRACT_ADDRESS;

    const { address } = useAccount();

    const toast = useToast();
    const sucessToast = () => {
        toast({
            title: "Transaction succedded",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    };
    const errorToast = () => {
        toast({
            title: "Transaction failed",
            status: "error",
            duration: 9000,
            isClosable: true,
        });
    };

    const { writeAsync: mintTokens } = useContractWrite({
        address: hvcTokenAddress,
        abi: hvcTokenAbi,
        functionName: "mint",
        args: [address, amount],
        onError(error) {
            console.log("Error", error);
            errorToast();
        },
        onSuccess(data) {
            console.log("Success", data);
            sucessToast();
        },
    });

    const handleMintTokens = async () => {
        try {
            const tx = await mintTokens();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const receipt = await provider.waitForTransaction(tx.hash);

            if (receipt.status === 1) {
                updateUIValues();
                console.log("Transaction successful");
            } else {
                console.log("Transaction failed");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const { writeAsync: increaseAllowance } = useContractWrite({
        address: hvcTokenAddress,
        abi: hvcTokenAbi,
        functionName: "increaseAllowance",
        args: [custodyVaultAddress, amount],
        onError(error) {
            console.log("Error", error);
            errorToast();
        },
        onSuccess(data) {
            console.log("Success", data);
            sucessToast();
        },
    });

    const handleIncreaseAllowance = async () => {
        try {
            const tx = await increaseAllowance();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const receipt = await provider.waitForTransaction(tx.hash);

            if (receipt.status === 1) {
                updateUIValues();
                console.log("Transaction successful");
            } else {
                console.log("Transaction failed");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const getTokenAddress = useContractRead({
        address: hvcTokenAddress,
        abi: hvcTokenAbi,
        functionName: "getTokenAddress",
    });

    return (
        <div className="sample-token-container">
            <div className="hvc-token-container">
                <img className="token-logo" src={hvcLogo}></img>
                <p className="hvc-token">{getTokenAddress.data}</p>
                <div className="mint-token">
                    <p>Your current balance of HVC Token is:</p>
                    <p>{userTokenBalance ? userTokenBalance : 0} HVC</p>
                    <p>
                        If you need more balance mint 10 tokens{" "}
                        <Button
                            colorScheme="teal"
                            size="xs"
                            onClick={handleMintTokens}
                        >
                            HERE
                        </Button>
                    </p>
                    <p>
                        Allow the transfer of your new token balance{" "}
                        <Button
                            colorScheme="teal"
                            size="xs"
                            onClick={handleIncreaseAllowance}
                        >
                            HERE
                        </Button>
                    </p>
                </div>
            </div>
            <TransferPanel />
        </div>
    );
};

export default SampleTokenContainer;
