import { useState } from "react";

type Props = {
    counter: number;
    handleClickUp: () => void;
    handleClickDown: () => void;
};

export const useCounter = (): Props => {
    const [counter, setCounter] = useState<number>(1);

    const handleClickUp = () => {
        if (counter === 10) return;

        setCounter((prevCounter) => prevCounter + 1);
    };

    const handleClickDown = () => {
        if (counter === 1) return;

        setCounter((prevCounter) => prevCounter - 1);
    };

    return {
        counter,
        handleClickUp,
        handleClickDown,
    };
};