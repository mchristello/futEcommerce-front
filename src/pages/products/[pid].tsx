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

    // console.log(`PRODUCTO DESDE DETAIL`, product);

    return (
        // <>
        //     <div className="flex justify-center items-evenly h-full w-[1000px] bg-white gap-4 border-2">
        //         <img
        //             src={thumbnail}
        //             width={100}
        //             height={100}
        //             alt={title}
        //             className="max-h-[400px] w-full max-w-[400px] bg-white p-10 self-center border-2"
        //         />
        //         <div className="flex flex-col items-start justify-center max-w-[700px] gap-8 p-4 bg-green">
        //             <h2 className="text-l font-bold self-center">{title}</h2>
        //             <span className="text-m font-bold items-center justify-center">
        //                 $ {price}
        //             </span>
        //             <div className="flex gap-2">
        //                 {/* <ProductQtyComponent initial={1} onAdd={onAdd} /> */}
        //                 {/* <AddToCartButton
        //                     pid={product._id}
        //                     className="text-s bg-font w-full rounded text-white p-2 px-4 uppercase shadow-xl font-bold hover:bg-footer"
        //                 /> */}
        //             </div>
        //             <p className="uppercase text-justify text-s">{description}</p>
        //             <p className="uppercase text-justify text-s">{stock}</p>
        //         </div>
        //     </div>
        // </>
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

    if (session && session.user) {
        const {data: product} = await connectAPI.get<RequestType>(`/products/${context.params!.pid}`,
            {
                headers: {
                    Authorization: `Bearer ${session.user.token}`,
                }
            })
    
        return {
            props: {
                product: product.payload[0]
            }
        }
    }
    return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }
}



