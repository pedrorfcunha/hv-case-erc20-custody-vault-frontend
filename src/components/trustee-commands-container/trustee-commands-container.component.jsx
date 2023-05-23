import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { useState, useContext } from "react";
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";

import { UiDataContext } from "../../contexts/ui-data.context";
import TrusteeAddressRegBox from "../trustee-address-reg-box/trustee-address-reg-box.component";
import TrusteeTrxApprovalBox from "../trustee-trx-approval-box/trustee-trx-approval-box.component";

import { bigNumToNumber } from "../../utils/util.functions";
import custodyVaultAbi from "../../constants/custody-vault-abi.json";
import "./trustee-commands-container.styles.scss";

const TrusteeCommandsContainer = () => {
    const { address } = useAccount();
    const { updateUIValues, custodyVaultData } = useContext(UiDataContext);

    const [trusteeInputData, setTrusteeInputData] = useState();
    const [senderInputData, setSenderInputData] = useState();
    const [tokenInputData, setTokenInputData] = useState();
    const [trxIdInputData, setTrxIdInputData] = useState(1);

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

    const isTrustee = useContractRead({
        address: custodyVaultAddress,
        abi: custodyVaultAbi,
        functionName: "isTrustee",
        args: [address],
    });

    const { write: setTrusteeAddress } = useContractWrite({
        address: custodyVaultAddress,
        abi: custodyVaultAbi,
        functionName: "setTrusteeAddress",
        args: [trusteeInputData],
        onError(error) {
            console.log("Error", error);
            errorToast();
        },
        onSuccess(data) {
            console.log("Success", data);
            sucessToast();
        },
    });

    const { write: removeTrusteeAddress } = useContractWrite({
        address: custodyVaultAddress,
        abi: custodyVaultAbi,
        functionName: "removeTrusteeAddress",
        args: [trusteeInputData],
        onError(error) {
            console.log("Error", error);
        },
        onSuccess(data) {
            console.log("Success", data);
        },
    });

    const { write: setAllowedTokens } = useContractWrite({
        address: custodyVaultAddress,
        abi: custodyVaultAbi,
        functionName: "setAllowedTokens",
        args: [tokenInputData],
        onError(error) {
            console.log("Error", error);
            errorToast();
        },
        onSuccess(data) {
            console.log("Success", data);
            sucessToast();
        },
    });

    const { write: removeAllowedTokens } = useContractWrite({
        address: custodyVaultAddress,
        abi: custodyVaultAbi,
        functionName: "removeAllowedTokens",
        args: [tokenInputData],
        onError(error) {
            console.log("Error", error);
            errorToast();
        },
        onSuccess(data) {
            console.log("Success", data);
            sucessToast();
        },
    });

    const { write: setAllowedSenders } = useContractWrite({
        address: custodyVaultAddress,
        abi: custodyVaultAbi,
        functionName: "setAllowedSenders",
        args: [senderInputData],
        onError(error) {
            console.log("Error", error);
            errorToast();
        },
        onSuccess(data) {
            console.log("Success", data);
            sucessToast();
        },
    });

    const { write: removeAllowedSenders } = useContractWrite({
        address: custodyVaultAddress,
        abi: custodyVaultAbi,
        functionName: "removeAllowedSenders",
        args: [senderInputData],
        onError(error) {
            console.log("Error", error);
            errorToast();
        },
        onSuccess(data) {
            console.log("Success", data);
            sucessToast();
        },
    });

    const { writeAsync: approveTransfer } = useContractWrite({
        address: custodyVaultAddress,
        abi: custodyVaultAbi,
        functionName: "approveTransfer",
        onError(error) {
            console.log("Error", error);
            errorToast();
        },
        onSuccess(data) {
            console.log("Success", data);
            sucessToast();
        },
    });

    const { writeAsync: revertTransfer } = useContractWrite({
        address: custodyVaultAddress,
        abi: custodyVaultAbi,
        functionName: "revertTransfer",
        args: [trxIdInputData],
        onError(error) {
            console.log("Error", error);
            errorToast();
        },
        onSuccess(data) {
            console.log("Success", data);
            sucessToast();
        },
    });

    const handleApproveClick = async () => {
        const matchingDepositIds = custodyVaultData.filter(
            (deposit) => bigNumToNumber(deposit.transferId) == trxIdInputData
        );

        try {
            for (let i = 0; i < matchingDepositIds.length; i++) {
                const tx = await approveTransfer({
                    args: [bigNumToNumber(matchingDepositIds[i].depositId)],
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

    const handleRevertClick = async () => {
        const matchingDepositIds = custodyVaultData.filter(
            (deposit) => bigNumToNumber(deposit.batchId) == trxIdInputData
        );

        try {
            for (let i = 0; i < matchingDepositIds.length; i++) {
                const tx = await revertTransfer({
                    args: [bigNumToNumber(matchingDepositIds[i].depositId)],
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

    return (
        <div className="trustee-commands-container">
            <h2>Trustee panel:</h2>
            {isTrustee.data ? (
                <>
                    <TrusteeAddressRegBox
                        placeholder="Set/Remove allowed Trustee"
                        onInsert={setTrusteeAddress}
                        onRemove={removeTrusteeAddress}
                        handleChange={setTrusteeInputData}
                    ></TrusteeAddressRegBox>
                    <TrusteeAddressRegBox
                        placeholder="Set/Remove allowed Sender"
                        onInsert={setAllowedSenders}
                        onRemove={removeAllowedSenders}
                        handleChange={setSenderInputData}
                    ></TrusteeAddressRegBox>
                    <TrusteeAddressRegBox
                        placeholder="Set/Remove allowed Token"
                        onInsert={setAllowedTokens}
                        onRemove={removeAllowedTokens}
                        handleChange={setTokenInputData}
                    ></TrusteeAddressRegBox>
                    <p>Select the batch ID:</p>
                    <TrusteeTrxApprovalBox
                        handleChange={setTrxIdInputData}
                        onApprove={handleApproveClick}
                        onRevert={handleRevertClick}
                    ></TrusteeTrxApprovalBox>
                </>
            ) : (
                <div>This panel is available only for Trustee/Admin profiles</div>
            )}
        </div>
    );
};

export default TrusteeCommandsContainer;
