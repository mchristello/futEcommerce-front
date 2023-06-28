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
}

// interface Prod {
//     products: Product[]
// }


const ProductsPage: NextPage<Props> = ({ products, totalPages }) => {
    // const [currentPage, setCurrentPage] = useState(1);
    const [ allProducts, setAllProducts ] = useState(products)
    const pages = totalPages
    const router = useRouter();
    const { query } = router

    console.log(`QUERY DESDE HOME`, query);

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

    // const nextPage = () => {
    //     setCurrentPage((prevPage) => prevPage + 1);
    // };

    // const prevPage = () => {
    //     setCurrentPage((prevPage) => prevPage - 1);
    // };

    console.log(`CURRENT PAGE DESDE PRODUCTSPAGE`, products);

    return (
        <div>
            {/* Renderizar tus componentes de lista o tabla de productos */}
            <ProductsListComponent products={products} />           
            {/* Renderizar el componente de paginación */}
            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                onNextPage={nextPage}
                onPrevPage={prevPage}
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