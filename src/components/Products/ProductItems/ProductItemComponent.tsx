// import AddButton from "components/Multi/AddButtton";
import AddButton from "components/Multi/AddButtton";
import ProductQtyComponent from "components/Multi/ProductQtyComponent";
import { Product } from "interfaces/interfaces"
import { NextPage } from "next";
import Link from "next/link";

type Props = {
    products: Product[]
}
const ProductItemComponent: React.FC<Props> = ({ products }) => {

    const onAdd = (num: number) => {
        return num;
    };

    return (
        <section id="ProductItemComponent">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((p: any) => {
                    return (
                        <article className="bg-white rounded-md" key={p._id}>
                            <Link href={`/products/${p._id}`} >
                                <img className="h-auto w-auto rounded-lg" src={p.thumbnail} alt="item image" />
                            </Link>
                            <div className="m-4 flex justify-between">
                                <div>
                                    <Link href={`/products/${p._id}`} className="text-m font-bold text-gray-700 mb-5">
                                        <p >
                                            {p.title} {p.description}
                                        </p>
                                    </Link>
                                    <div className="flex justify-between items-center bottom-0">
                                        <p className="mt-1 text-sm font-medium text-gray-900">Price: <b>${p.price}</b></p>
                                        <ProductQtyComponent initial={1} onAdd={onAdd} pid={p._id} />
                                    </div>
                                </div>
                            </div>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}

export default ProductItemComponent