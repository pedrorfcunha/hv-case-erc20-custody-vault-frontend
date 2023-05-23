import {
    Button,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react";

import "./trustee-trx-approval-box.styles.scss";

const TrusteeTrxApprovalBox = ({ handleChange, onApprove, onRevert }) => {
    return (
        <div className="trustee-trx-approval-box">
            <NumberInput
                defaultValue={1}
                min={0}
                width="100%"
                onChange={(valueNumber) => handleChange(valueNumber)}
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper bg="gray.100" />
                    <NumberDecrementStepper bg="gray.100" />
                </NumberInputStepper>
            </NumberInput>
            <Button colorScheme="teal" onClick={onApprove}>
                Approve
            </Button>
            <Button colorScheme="red" onClick={onRevert}>
                Revert
            </Button>
        </div>
    );
};

export default TrusteeTrxApprovalBox;
