import { Button } from "flowbite-react"
import { useCart } from "hooks/useCart"
import { Product } from "interfaces/interfaces"
import Link from "next/link"
// import { useContext } from "react"


type Props ={
    pid: Product["_id"],
    qty: number
}

const AddButton: React.FC<Props> = ({ pid, qty }) => {

    const { addProduct } = useCart()
    
    return (
        <section id="addButon_component">
            <Button onClick={ () => addProduct(pid, qty) } className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-small rounded-lg text-md text-center">
                Add to cart
            </Button>
        </section>
    )
}


export default AddButton