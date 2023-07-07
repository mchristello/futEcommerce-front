import { Product } from "interfaces/interfaces"
import ProductItemComponent from "../ProductItems/ProductItemComponent";
import { BsFillArrowDownCircleFill } from "react-icons/bs";


type Props = {
    products: Product[];
}

const ProductsListComponent: React.FC<Props> = ({ products }) => {

    return (
        <>
            <div className="flex flex-row gap-10 text-5xl font-bold tracking-wider text-gray-100">
                <h2 className="text-gray-900 mb-20">Our Products</h2>
                <BsFillArrowDownCircleFill color="gray"/>
            </div>
            
            <section className="flex flex-wrap justify-center items-center gap-7 max-w-[90vw]">
                <ProductItemComponent products={products} />
            </section>
        </>
    )
}

export default ProductsListComponent;