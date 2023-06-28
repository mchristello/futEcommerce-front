import { useCart } from "hooks/useCart";
import { IoBagOutline, IoBagCheckSharp } from "react-icons/io5";


interface CartIconPropr {
    onMouseOver: () => void;
}

const CartIcon: React.FC<CartIconPropr> = ({ onMouseOver }) => {

    const { cartItems } = useCart()

    return (
        <div className="relative">
                { cartItems.length > 0 
                    ? <li onMouseOver={onMouseOver} className="text-4xl m-auto">
                        <IoBagCheckSharp />
                        <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs absolute -top-1 -right-1">
                            {cartItems.length}
                        </span>
                    </li> 
                    : <li className="text-4xl m-auto"><IoBagOutline /></li>
                }
        </div>
    )    
}

export default CartIcon;