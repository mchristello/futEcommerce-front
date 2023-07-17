import { CartContextProvider, Product, Products } from 'interfaces/interfaces';
import { useSession } from 'next-auth/react';
import { createContext, useState, useEffect } from 'react';
import { connectNextURL } from 'utils/serverConnection';

type Props = {
    children: React.ReactNode
}

// Crear el contexto
export const CartContext = createContext<CartContextProvider | null>(null);


export const CartProvider: React.FC<Props> = ({ children }) => {

    const [ cartItems, setCartItems ] = useState<number>(0)
    const { data: session } = useSession();

    useEffect(() => {
        try {
            if(session && session?.user?.cart) {

                const fetchCart = async () => {
                    const { data: response } = await connectNextURL.get(`/carts/${session.user?.cartId}`, {
                        headers: {
                            Authorization: `Bearer ` + session.user?.token
                        }
                    })
    
                    const productsInCart = response.payload[0].products.length
                    setCartItems(productsInCart)
                    // console.log(`useEffect CARTITEMS----------->`, cartItems);
                }
                fetchCart()
            }
        } catch (error:any) {
            console.log(`ERROR EN USE EFFECT DE CARTCONTEXT`, error);
        }
    }, [session, setCartItems, cartItems]);

    const addProduct = async (pid: Product["_id"], qty: Products["quantity"]) => {
        const { data: result } = await connectNextURL.post(`/carts/${session?.user?.cartId}/products/${pid}`, {pid, qty}, {
            headers: {
                Authorization: "Bearer " + session?.user?.token
            }
        })

        setCartItems(cartItems + 1);
        console.log(`NEW CARTITEMS----------->`, cartItems);
        return result;
    };

    const deleteProd = async (pid: Product["_id"]) => {
        const { data: result } = await connectNextURL.delete(`/carts/${session?.user?.cartId}/products/${pid}`, {
            headers: {
                Authorization: "Bearer " + session?.user?.token
            }
        })

        setCartItems((cartItems) => cartItems - 1)
        console.log(`NEW VALUE FOR CARTITEMS----------->`, cartItems);

        return result;
    };

    const emptyCart = async () => {
        const { data: result } = await connectNextURL.delete(`/carts/${session?.user?.cartId}`, {
            headers: {
                Authorization: "Bearer " + session?.user?.token
            }
        })

        return result;
    };

    const purchase = async () => {
        const { data: result } = await connectNextURL.post(`/carts/${session?.user?.cartId}/purchase`, {
            headers: {
                Autorization: "Bearer " + session?.user?.token
            }
        })

        return result;
    };

    const data = {
        cartItems,
        addProduct,
        deleteProd,
        emptyCart,
        purchase,
    };

    return (
        <CartContext.Provider value={( data )} >
            {children}
        </CartContext.Provider>
    )
}
