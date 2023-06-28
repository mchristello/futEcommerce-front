// import useRol from "hooks/useRol"
import CartResumeList from "components/Cart/CartResumeList";
import CartIcon from "components/Multi/CartIcon";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { connectNextURL } from "utils/serverConnection";


const SessionNav: React.FC = () => {

    const { data: session } = useSession()
    const [ cart , setCart ] = useState([])
    const [ isCartOpen, setIsCartOpen ] = useState<boolean>(false)

    useEffect(() => {
        try {
            if(session && session?.user?.cart) {
                const fetchCart = async () => {
                    const response = await connectNextURL.get(`/carts/${session.user?.cartId}`, {
                        headers: {
                            Authorization: `Bearer ` + session.user?.token
                        }
                    })
    
                    const productsInCart = response.data.payload[0].products
                    setCart(productsInCart)
                }
                fetchCart()
            }
        } catch (error:any) {
            console.log(`ERROR EN USE EFFECT DE SESSIONNAV`, error);
        }
    }, [session, setCart])
    
    const handleMouseOver = () => {
        setIsCartOpen(true)
    }

    const handleMouseLeave = () => {
        setIsCartOpen(false)
    }

    return (
        <nav>
            <ul className="flex flex-row items-center justify-end">
                <Link href="/" className="underline_effect m-4 hover:bg-neutral-300 hover:scale-110 active:bg-sky-900 focus:outline-none focus:ring focus:ring-violet-300 rounded-md w-36">
                    <li>Products</li>
                </Link>
                <Link href="/users/account" className="underline_effect m-4 hover:bg-neutral-300 hover:scale-125 active:bg-sky-900 focus:outline-none focus:ring focus:ring-violet-300 rounded-md w-36">
                    <li>My Account</li>
                </Link>
                <Link href={`/carts/${session?.user?.cartId}`} className="underline_effect m-4 hover:bg-neutral-300 hover:scale-125 active:bg-sky-900 focus:outline-none focus:ring focus:ring-violet-300 rounded-md w-36">
                    <li>My Cart</li>
                </Link>
                {/* <Link href="/message" className="underline_effect m-4 hover:bg-neutral-300 hover:scale-125 active:bg-sky-900 focus:outline-none focus:ring focus:ring-violet-300 rounded-md w-36">
                    <li>Chat With Us</li>
                </Link> */}
                <Link href="/" onClick={()=> signOut() } className="underline_effect m-4 hover:bg-neutral-300 hover:scale-125 active:bg-sky-900 focus:outline-none focus:ring focus:ring-violet-300 rounded-md w-36">
                    <li>Logout</li>
                </Link>
                {
                    session?.user?.rol === 'admin' ? 
                        <Link href="/products/addNew" className="underline_effect m-4 hover:bg-neutral-300 hover:scale-125 active:bg-sky-900 focus:outline-none focus:ring focus:ring-violet-300 rounded-md w-36">
                            <li>Add New Product.</li>
                        </Link>
                    : null
                }
                <div className="fixed top-0 right-0 p-4">
                    <CartIcon onMouseOver={handleMouseOver} />

                    {isCartOpen && (
                        <div onMouseLeave={handleMouseLeave} className="fixed top-0 right-0 p-4 mt-2 mr-2 bg-white shadow rounded-lg">
                            <CartResumeList cart={cart} />
                        </div>
                    )}
                </div>
            </ul>
        </nav>
    )
}

export default SessionNav;