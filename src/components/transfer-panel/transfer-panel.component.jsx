import { useState, useContext } from "react";
import { useContractWrite, useContractRead } from "wagmi";
import { ethers } from "ethers";

import { TransferContext } from "../../contexts/transfer.context";
import { UiDataContext } from "../../contexts/ui-data.context";

import TransferInput from "../transfer-input/transfer-input.component";
import {
    Button,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    useToast,
} from "@chakra-ui/react";
import { ReactComponent as CheckLogo } from "../../assets/check.svg";
import { ReactComponent as AlertLogo } from "../../assets/alert.svg";

import { bigNumToNumber } from "../../utils/util.functions";
import custodyVaultAbi from "../../constants/custody-vault-abi.json";
import "./transfer-panel.styles.scss";

const TransferPanel = () => {
    const [numberOfTransfers, setNumberOfTransfers] = useState(1);
    const [numberOfTokens, setNumberOfTokens] = useState(1);
    const [selectedTokenAddress, setSelectedTokenAddress] = useState("");
    const [transferAddressData, setTransferAddressData] = useState([""]);
    const [transferAmountData, setTransferAmountData] = useState([1]);

    const { totalPercentage } = useContext(TransferContext);
    const { updateUIValues } = useContext(UiDataContext);

    const custodyVaultAddress =
        process.env.REACT_APP_CUSTODY_VAULT_CONTRACT_ADDRESS;

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

    const getMaxBatchId = useContractRead({
        address: custodyVaultAddress,
        abi: custodyVaultAbi,
        functionName: "getMaxBatchId",
        enabled: false,
    });

    const { writeAsync: deposit } = useContractWrite({
        address: custodyVaultAddress,
        abi: custodyVaultAbi,
        functionName: "deposit",
        onError(error) {
            console.log("Error", error);
            errorToast();
        },
        onSuccess(data) {
            console.log("Success", data);
            sucessToast();
        },
    });

    const handleDeposit = async () => {
        const getMaxBatchIdFromCall = await getMaxBatchId.refetch();
        const formattedBatchId =
            bigNumToNumber(getMaxBatchIdFromCall.data) + 1;
        console.log(formattedBatchId);

        try {
            for (let i = 0; i < numberOfTransfers; i++) {
                console.log(formattedBatchId);
                const tx = await deposit({
                    args: [
                        selectedTokenAddress,
                        (numberOfTokens / 100) *
                            transferAmountData[i] *
                            1000000000000000000,
                        transferAddressData[i],
                        formattedBatchId,
                    ],
                });
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                const receipt = await provider.waitForTransaction(tx.hash);

                if (receipt.status === 1) {
                    updateUIValues();
                    console.log("Transaction successful");
                } else {
                    console.log("Transaction failed");
                }
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const sendersArray = Array.from(
        { length: numberOfTransfers },
        (_, index) => (
            <TransferInput
                key={index}
                index={index}
                transferAddressData={transferAddressData}
                setTransferAddressData={setTransferAddressData}
                transferAmountData={transferAmountData}
                setTransferAmountData={setTransferAmountData}
            />
        )
    );

    const isTransferDisabled =
        totalPercentage !== 100 ||
        selectedTokenAddress.trim() === "" ||
        transferAmountData.length != numberOfTransfers ||
        transferAddressData.length != numberOfTransfers ||
        transferAmountData.some((amount) => isNaN(amount)) ||
        transferAddressData.some(
            (address) => address.trim() === "" || address.length !== 42
        );

    return (
        <div className="set-transfer-container">
            <h2>Transfer your HVC tokens:</h2>
            <div className="transfer-inputs-container">
                <p>How many addresses will receive your tokens (máx 4)?</p>
                <NumberInput
                    defaultValue={1}
                    min={1}
                    max={4}
                    onChange={(valueNumber) =>
                        setNumberOfTransfers(valueNumber)
                    }
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper bg="gray.100" />
                        <NumberDecrementStepper bg="gray.100" />
                    </NumberInputStepper>
                </NumberInput>
                <p>How many tokens do you want to send?</p>
                <NumberInput
                    defaultValue={1}
                    min={1}
                    max={100}
                    precision={2}
                    step={0.1}
                    onChange={(valueNumber) => setNumberOfTokens(valueNumber)}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper bg="gray.100" />
                        <NumberDecrementStepper bg="gray.100" />
                    </NumberInputStepper>
                </NumberInput>
                <Input
                    placeholder="Enter the Token address"
                    onChange={(event) =>
                        setSelectedTokenAddress(event.target.value)
                    }
                />
                <div className="transfer-btn-container">
                    <Button
                        colorScheme={!isTransferDisabled ? "teal" : "red"}
                        size="sm"
                        onClick={handleDeposit}
                        isDisabled={isTransferDisabled}
                    >
                        TRANSFER
                    </Button>
                    {!isTransferDisabled ? (
                        <CheckLogo className="check-logo" />
                    ) : (
                        <AlertLogo className="check-logo" />
                    )}
                </div>
                <div>Percentage sum (must sum 100): {totalPercentage}</div>
                <div>Difference: {totalPercentage - 100}</div>
                <div className="sender-inputs-container">{sendersArray}</div>
            </div>
        </div>
    );
};

export default TransferPanel;
