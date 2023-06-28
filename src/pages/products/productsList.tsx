import ProductsListComponent from "components/Products/ProductList/ProductListComponent"
import { Product } from "interfaces/interfaces"
import { NextPage } from "next"


type Props = {
    products: Product[]
}

const ProductsList: NextPage<Props> = ({ products }) => {

    return (
        <>
            <ProductsListComponent products={products} />
        </>
    )
}

export default ProductsList;