import { Product } from "interfaces/interfaces"
import { NextPage } from "next";
import ProductItemComponent from "../ProductItems/ProductItemComponent";


type Props = {
    products: Product[];
}

const ProductsListComponent: React.FC<Props> = ({ products }) => {

    return (
        <>
            <h2 className="text-5xl font-bold tracking-wider text-gray-100 mb-5">Our Products 🔽</h2>
            <section className="flex flex-wrap justify-center items-center gap-7 max-w-[100vw]">
                <ProductItemComponent  products={products} />
            </section>
        </>
    )
}

export default ProductsListComponent;