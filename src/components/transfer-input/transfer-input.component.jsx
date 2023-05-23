import { useContext } from "react";

import { TransferContext } from "../../contexts/transfer.context";

import {
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react";

import "./transfer-input.styles.scss";

const TransferInput = ({
    index,
    transferAddressData,
    setTransferAddressData,
    transferAmountData,
    setTransferAmountData,
}) => {
    const { updatePercentagesArray } = useContext(TransferContext);

    const handlePercentageChange = (valueNumber) => {
        updatePercentagesArray(index, valueNumber);
        const newData = [...transferAmountData];
        newData[index] = valueNumber;
        setTransferAmountData(newData);
    };

    return (
        <div className="transfer-input">
            <Input
                placeholder="Enter the receiver address"
                onChange={(event) => {
                    const updatedData = event.target.value;
                    const newData = [...transferAddressData];
                    newData[index] = updatedData;
                    setTransferAddressData(newData);
                }}
            />
            <NumberInput
                defaultValue={0}
                min={1}
                max={100}
                onChange={handlePercentageChange}
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper bg="gray.100" />
                    <NumberDecrementStepper bg="gray.100" />
                </NumberInputStepper>
            </NumberInput>
        </div>
    );
};

export default TransferInput;
