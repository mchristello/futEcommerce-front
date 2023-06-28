import { useState } from "react";

type Props = {
    counter: number;
    handleAddClick: () => void;
    handleSubClick: () => void;
};

export const useCounter = (): Props => {
    const [counter, setCounter] = useState<number>(1);

    const handleAddClick = () => {
        if (counter === 10) return;

        setCounter((prevCounter) => prevCounter + 1);
    };

    const handleSubClick = () => {
        if (counter === 1) return;

        setCounter((prevCounter) => prevCounter - 1);
    };

    return {
        counter,
        handleAddClick,
        handleSubClick,
    };
};