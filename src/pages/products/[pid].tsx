import { Product } from "interfaces/interfaces"
import { connectAPI } from "utils/serverConnection"
import { GetServerSideProps, NextPage } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"
import Head from "next/head"
import ProductDetailComponent from "components/Products/ProductDetail/ProductDetailComponent"

type Props = {
    product: Product
}

type RequestType = {
    payload: Product[]
}

const onAdd = (num: number) => {
    return num;
};

const Productdetail: NextPage<Props> = ({ product }) => {

    return (
        <>
            <Head>
                <title>Product Detail</title>
            </Head>
            <ProductDetailComponent product={product} />
        </>
    )
}

export default Productdetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    // if (session && session.user) {
        const {data: product} = await connectAPI.get<RequestType>(`/products/${context.params!.pid}`,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            })
    
        return {
            props: {
                product: product.payload[0]
            }
        }
    }
    // return {
    //     redirect: {
    //         destination: '/',
    //         permanent: false
    //     }
    // }
// }



