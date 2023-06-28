// import AddButton from "components/Multi/AddButtton";
import { Product } from "interfaces/interfaces"
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

type Props = {
    products: Product[]
}
const ProductItemComponent: NextPage<Props> = ({ products }) => {

    // const { title, description, price, thumbnail, stock, _id } = products;
    return (
        <>
            {/* <div className="bg-white rounded-sm">
                <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-6">
                        <div className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={thumbnail}
                                    alt={description}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-m text-gray-700">
                                        <Link href={`/products/${_id}`}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {title} {description}
                                        </Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">Items Available: {stock}</p>
                                    <p className="mt-1 text-sm font-medium text-gray-900">Price: ${price}</p>
                                </div>
                            </div>
                        </div>
                </div>
            </div> */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map(p => {
                    return (
                        <Link href={`/products/${p._id}`} className="bg-white rounded-md" key={p._id}>
                            <Image className="h-auto w-auto rounded-lg" src={p.thumbnail} alt="item image" />
                            <div className="m-4 flex justify-between">
                                <div>
                                    <div className="text-m font-bold text-gray-700 mb-5">
                                        <p >
                                            {p.title} {p.description}
                                        </p>
                                    </div>
                                    {/* <p className="mt-1 text-sm text-gray-500">Items Available: {p.stock}</p> */}
                                    <p className="mt-1 text-sm font-medium text-gray-900">Price: ${p.price}</p>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

        </>
    )
}

export default ProductItemComponent