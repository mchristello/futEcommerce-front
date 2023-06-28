// import AddButton from "components/Multi/AddButtton";
import { Product } from "interfaces/interfaces"
import { NextPage } from "next";
import Link from "next/link";

type Props = {
    products: Product[]
}
const ProductItemComponent: NextPage<Props> = ({ products }) => {

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map(p => {
                    return (
                        <Link href={`/products/${p._id}`} className="bg-white rounded-md" key={p._id}>
                            <img className="h-auto w-auto rounded-lg" src={p.thumbnail} alt="item image" />
                            <div className="m-4 flex justify-between">
                                <div>
                                    <div className="text-m font-bold text-gray-700 mb-5">
                                        <p >
                                            {p.title} {p.description}
                                        </p>
                                    </div>
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