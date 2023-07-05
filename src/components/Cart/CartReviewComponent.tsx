'use client';

import { Button, Card } from 'flowbite-react';
import { useCart } from 'hooks/useCart';
import { Cart } from "interfaces/interfaces"
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { connectNextURL } from 'utils/serverConnection';


type Props = {
    cart: Cart
}

const CartReviewComponent: React.FC<Props> = ({ cart }) => {

    const { data: session } = useSession()
    const [ cartTotal, setCartTotal ] = useState<number>(0)
    const { emptyCart, deleteProd } = useCart();
    const newCart: any = cart;


    useEffect(() => {
        try {
            const fetchCart = async () => {
                const response = await connectNextURL.get(`/carts/${session?.user?.cartId}`, {
                    headers: {
                        Authorization: "Bearer " + session?.user?.token
                    }
                })

                const products = response.data.payload[0].products
                const total: any = products.map((p: any) => {
                    let amount = p.product.price * p.quantity;
                    return amount
                })

                const acc = total.reduce((acc: number, acum: number) => acc + acum, 0)
                setCartTotal(acc)
            }
            fetchCart()
        } catch (error: any) {
            console.log(`Error in USEEFFECT for carTotal`, error.message);
        }
    }, [setCartTotal])

    return (
        <section id="cart_section" className='m-10'>
            <h3 className='text-4xl font-semibold text-center'> My Cart! </h3>
            {newCart.products.length > 0 ? 
                <table className="table-auto bg-slate-200/75 text-center w-[80vw] m-10 rounded-md text-xl">
                    <thead className='mt-10'>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Go to Detail</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    { newCart.products.map((p: any) => {
                        return (
                                <tr key={p.product._id}>
                                    <td><img width="60" src={p.product.thumbnail} className='m-auto rounded-xl my-2' alt='product image'/></td>
                                    <th scope="row"> {p.product.description} </th>
                                    <td>$ {p.product.price}</td>
                                    <td>{p.quantity}</td>
                                    <td><Button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm text-center mx-auto"><Link href={`/products/${p.product._id}`}>To Detail</Link></Button></td>
                                    <td><Button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm text-center mx-auto" id="delete_btn" onClick={() => deleteProd(p.product._id)}>DELETE</Button></td>
                                </tr>
                        )
                    })}
                        <tr className="m-10">
                            <td><h4><strong>TOTAL AMOUNT</strong></h4></td>
                            <td> --------------------------------------- </td>
                            <td><h4>Total: $<b>{cartTotal}</b>.-</h4></td>
                            <td> ---------- </td>
                            <td>
                                <Button className="text-black bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm text-center my-10 mx-auto" value={cart._id} id="purchase">
                                    <Link href={`/carts/${cart._id}/payment`}>Confirm!</Link>
                                </Button>
                            </td>
                            <td>
                                <Button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm text-center my-10 mx-auto" id="empty_cart" onClick={() => emptyCart()}>
                                    Delete All.
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table> : <p className="text-4xl bg-slate-200/75 text-center w-[80vw] m-10 rounded-md p-20">There are no products in your cart, yet...</p>
            }
        </section>
    )
}

export default CartReviewComponent;