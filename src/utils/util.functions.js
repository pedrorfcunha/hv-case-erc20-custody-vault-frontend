import { ethers } from "ethers";

const bigNumToNumber = (value) => {
    const bigNumberValue = ethers.BigNumber.from(value);

    return bigNumberValue.toNumber();
};

const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export { bigNumToNumber, formatAddress };
