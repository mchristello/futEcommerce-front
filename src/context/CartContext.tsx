import { CartContextProvider, Product } from 'interfaces/interfaces';
import { useSession } from 'next-auth/react';
import { createContext, useContext, useState, useEffect } from 'react';
import { connectNextURL } from 'utils/serverConnection';

type Props = {
    children: React.ReactNode
}

// Crear el contexto
export const CartContext = createContext<CartContextProvider | undefined>(undefined);


export const CartProvider: React.FC<Props> = ({ children }) => {

    const [ cartItems, setCartItems ] = useState<number>(0)
    const { data: session } = useSession();

    useEffect(() => {
        try {
            if(session && session?.user?.cart) {
                const fetchCart = async () => {
                    
                    const response = await connectNextURL.get(`/carts/${session.user?.cart._id}`, {
                        headers: {
                            Authorization: `Bearer ` + session.user?.token
                        }
                    })
    
                    const productsInCart = response.data.payload[0].products.length
                    setCartItems(productsInCart)
                    // console.log(`useEffect CARTITEMS----------->`, cartItems);
                }
    
                fetchCart()
                
            }
        } catch (error:any) {
            console.log(`ERROR EN USE EFFECT DE CARTCONTEXT`, error);
        }
    }, [session, setCartItems])

    const addProduct = async (pid: Product["_id"]) => {
        const { data: result } = await connectNextURL.post(`/carts/${session?.user?.cart._id}/products/${pid}`, {pid}, {
            headers: {
                Authorization: "Bearer " + session?.user?.token
            }
        })

        setCartItems(cartItems + 1);
        console.log(`NEW CARTITEMS----------->`, cartItems);
        return result;
    };

    const deleteProd = async (pid: Product["_id"]) => {
        const { data: result } = await connectNextURL.delete(`/carts/${session?.user?.cart._id}/products/${pid}`, {
            headers: {
                Authorization: "Bearer " + session?.user?.token
            }
        })

        setCartItems((cartItems) => cartItems - 1)
        console.log(`NEW VALUE FOR CARTITEMS----------->`, cartItems);

        return result;
    };

    const emptyCart = async () => {
        const { data: result } = await connectNextURL.delete(`/carts/${session?.user?.cart._id}`, {
            headers: {
                Authorization: "Bearer " + session?.user?.token
            }
        })

        return result;
    };

    const purchase = async () => {
        const { data: result } = await connectNextURL.post(`/carts/${session?.user?.cart}/purchase`, {
            headers: {
                Autorization: "Bearer " + session?.user?.token
            }
        })

        return result;
    };


    const utils = {
        cartItems,
        addProduct,
        deleteProd,
        emptyCart,
        purchase,
    };

    return (
        <CartContext.Provider value={( utils )} >
            {children}
        </CartContext.Provider>
    )
}