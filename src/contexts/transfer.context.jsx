import { createContext, useState, useEffect } from "react";

export const TransferContext = createContext({
    percentagesArray: [],
    updatePercentagesArray: () => {},
    totalPercentage: null,
    setTotalPercentage: () => {},
});

export const TransferProvider = ({ children }) => {
    const [percentagesArray, setPercentagesArray] = useState([]);
    const [totalPercentage, setTotalPercentage] = useState(0);

    const updatePercentagesArray = (index, value) => {
        const updatedArray = [...percentagesArray];
        updatedArray[index] = parseInt(value, 10);
        setPercentagesArray(updatedArray);
    };

    const calculateTotalPercentage = () => {
        const sum = percentagesArray.reduce(
            (total, percentage) => total + percentage,
            0
        );
        setTotalPercentage(sum);
    };

    useEffect(() => {
        calculateTotalPercentage();
    }, [percentagesArray]);

    const value = {
        percentagesArray,
        updatePercentagesArray,
        totalPercentage,
        setTotalPercentage,
    };

    return (
        <TransferContext.Provider value={value}>
            {children}
        </TransferContext.Provider>
    );
};
