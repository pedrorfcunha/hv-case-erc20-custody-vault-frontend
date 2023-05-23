import { useContractRead } from "wagmi";
import { ethers } from "ethers";

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";

import { bigNumToNumber, formatAddress } from "../../utils/util.functions";
import custodyVaultAbi from "../../constants/custody-vault-abi.json";
import "./custody-vault-container.styles.scss";

const CustodyVaultContainer = () => {
    const custodyVaultAddress =
        process.env.REACT_APP_CUSTODY_VAULT_CONTRACT_ADDRESS;

    const getAllDeposits = useContractRead({
        address: custodyVaultAddress,
        abi: custodyVaultAbi,
        functionName: "getAllDeposits",
    });

    return (
        <div className="custody-vault-container">
            <TableContainer>
                <Table variant="simple">
                    <TableCaption>Transactions in custody</TableCaption>
                    <Thead>
                        <Tr>
                            <Td isNumeric>Batch Id</Td>
                            <Td isNumeric>Amount</Td>
                            <Td>Sender</Td>
                            <Td>Receiver</Td>
                            <Td isNumeric>Status</Td>
                        </Tr>
                    </Thead>
                    {getAllDeposits.data > 0 ? (
                        <Tbody>
                            {getAllDeposits.data.map((deposit) => (
                                <Tr key={deposit.depositId}>
                                    <Td isNumeric>
                                        {bigNumToNumber(deposit.batchId)}
                                    </Td>
                                    <Td isNumeric>
                                        {ethers.utils.formatUnits(
                                            deposit.amount,
                                            18
                                        )}
                                    </Td>
                                    <Td>
                                        {formatAddress(deposit.senderAddress)}
                                    </Td>
                                    <Td>
                                        {formatAddress(deposit.receiverAddress)}
                                    </Td>
                                    <Td isNumeric>
                                        {deposit.status === 0
                                            ? "Pending"
                                            : deposit.status === 1
                                            ? "Transferred"
                                            : deposit.status === 2
                                            ? "Reverted"
                                            : ""}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    ) : (
                        <div>There aren't transactions in custody</div>
                    )}
                </Table>
            </TableContainer>
        </div>
    );
};

export default CustodyVaultContainer;
