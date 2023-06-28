import { Product } from "interfaces/interfaces"
import { NextPage } from "next";
import ProductItemComponent from "../ProductItems/ProductItemComponent";
import { useState } from "react";
import PaginationComponent from "../Pagination/PaginationComponent";


type Props = {
    products: Product[];
}

const ProductsListComponent: NextPage<Props> = ({ products }) => {

    return (
        <>
            <h2 className="text-5xl font-bold tracking-wider text-gray-100 mb-5">Our Products 🔽</h2>
            <section className="flex flex-wrap justify-center items-center gap-7 max-w-[100vw]">
                {/* { products ? products.map(p => 
                { return (
                    <ProductItemComponent key={p._id} products={p} />
                )})
                    : <h3>There are no products to show</h3>
                } */}
                <ProductItemComponent  products={products} />

            </section>
        </>
    )
}

export default ProductsListComponent;