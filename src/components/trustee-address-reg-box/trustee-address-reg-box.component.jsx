import { Button, Input } from "@chakra-ui/react";

import "./trustee-address-reg-box.styles.scss";

const TrusteeAddressRegBox = ({
    placeholder,
    onInsert,
    onRemove,
    handleChange,
}) => {
    return (
        <div className="trustee-address-reg-box">
            <Input
                placeholder={placeholder}
                onChange={(event) => handleChange(event.target.value)}
            />
            <Button colorScheme="teal" onClick={onInsert}>
                Insert
            </Button>
            <Button colorScheme="red" onClick={onRemove}>
                Remove
            </Button>
        </div>
    );
};

export default TrusteeAddressRegBox;
