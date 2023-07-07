import { useCounter } from "hooks/useCount";
import AddButton from "./AddButtton";
import { Product } from "interfaces/interfaces";

type Props = {
    initial: number;
    onAdd (num: number): number,
    pid: Product["_id"]
}

const ProductQtyComponent: React.FC<Props> = ({ initial, onAdd, pid }) => {

    
    const { counter, handleClickUp, handleClickDown } = useCounter();
    
    return (
        <>
            <div className="flex gap-2 justify-center items-center rounded bg-font px-4 p-2 text-black text-xl">
                <button onClick={handleClickDown} className="text-m w-[40px] rounded text-black uppercase shadow-xl font-bold" > - </button>
                <span>{counter}</span>
                <button onClick={handleClickUp} className="text-m w-[40px] rounded text-black uppercase shadow-xl font-bold" > + </button>
            </div>
            <AddButton pid={pid} qty={counter}/>
        </>
    )
}

export default ProductQtyComponent