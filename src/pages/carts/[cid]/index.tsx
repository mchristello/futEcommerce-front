import CartReviewComponent from "components/Cart/CartReviewComponent"
import { Cart } from "interfaces/interfaces"
import { GetServerSideProps, NextPage } from "next"
import { getServerSession } from "next-auth"
import Head from "next/head"
import { authOptions } from "pages/api/auth/[...nextauth]"
import { connectAPI } from "utils/serverConnection"

type Props = {
    cart: Cart
}

type Response = {
    payload: Cart
}

const CartReview: NextPage<Props> = ({ cart }) => {

    // console.log(`FROM CARTREVIEW`, cart);

    return (
        <>
            <Head>
                <title>Cart Review</title>
            </Head>
            <CartReviewComponent cart={cart[0]} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
    const session = await getServerSession(context.req, context.res, authOptions)

    if(session && session.user) {
        const { data: request } = await connectAPI.get<Response>(`/carts/${context.params!.cid}`, {
            headers: {
                Authorization: `Bearer ${session.user.token}`,
            }
        })

        return {
            props: { cart: request.payload }
        }
    }

    return {
        props: {}
    }
}

export default CartReview