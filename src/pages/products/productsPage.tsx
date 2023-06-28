import PaginationComponent from "components/Products/Pagination/PaginationComponent";
import ProductsListComponent from "components/Products/ProductList/ProductListComponent";
import { Product } from "interfaces/interfaces";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { connectBack } from "utils/serverConnection";


type Props = {
    products: Product[]
    totalPages: number
    onNextPage: () => void;
    onPrevPage: () => void;
}

const ProductsPage: NextPage<Props> = ({ products, totalPages }) => {
    const [ allProducts, setAllProducts ] = useState(products)
    const router = useRouter();
    const { query } = router

    const currentPage = Number(query.page) || 1;

    const nextPage = () => {
        router.push({
            pathname: '/products',
            query: { ...query, page: currentPage + 1 },
        });
    };

    const prevPage = () => {
        router.push({
            pathname: '/products',
            query: { ...query, page: currentPage - 1 },
        });
    };

    return (
        <div>
            {/* Renderizar tus componentes de lista o tabla de productos */}
            <ProductsListComponent products={products} />           
            {/* Renderizar el componente de paginación */}
            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                handleNextPage={nextPage}
                handlePrevPage={prevPage}
            />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const page = query.page || 1;
    const limit = 10;

    console.log(`QUERY DESDE GETSERVERSIDEPROPS`, page);

    try {
        const { data: response } = await connectBack.get(`api/products?page=${page}&limit=${limit}&query=&sort=`);

        console.log(`AXIOS RESPONSE:`, response);

        return {
            props: {
                products: response.docs,
                totalPages: response.totalPages,
            },
        };
    } catch (error) {
        console.error('Error fetching products:', error);

        return {
            props: {
                products: [],
                totalPages: 0,
            },
        };
    }
}

export default ProductsPage;