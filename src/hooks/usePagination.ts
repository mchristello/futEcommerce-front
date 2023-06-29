// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { GetServerSideProps } from 'next';
// import { connectBack } from 'utils/serverConnection';
// import { Product } from 'interfaces/interfaces';

// interface PaginationData<T> {
//     data: T[];
//     totalPages: number;
// }

// interface Prod {
//     products: Product[]
// }

// interface PaginationHook<T> {
//     products: T[];
//     currentPage: number;
//     totalPages: number;
//     nextPage: () => void;
//     prevPage: () => void;
// }

// const usePagination = <T>(initialPage: number): PaginationHook<T> => {
//     const [products, setProducts] = useState<Prod>([]);
//     const [currentPage, setCurrentPage] = useState<number>(initialPage);
//     const [totalPages, setTotalPages] = useState<number>(0);
//     const limit = 12;

//     const fetchData = async (page: number) => {
//         try {
//             const { data } = await axios.get<PaginationData<T>>(
//                 `https://backendpf-production.up.railway.app/api/products?page=${page}&limit=${limit}&query=&sort=`
//             , {
//                 headers: {'X-Requested-With': 'XMLHttpRequest'}
//             });

            
//             setProducts(data.payload.docs);
//             setTotalPages(data.payload.totalPages);
//             console.log(`FROM USEPAGINATION`, products);
//         } catch (error) {
//             console.error('Error fetching products:', error);
//         }
//     };

//     useEffect(() => {
//         fetchData(currentPage);
//     }, [currentPage]);

//     const nextPage = () => {
//         setCurrentPage((prevPage) => prevPage + 1);
//     };

//     const prevPage = () => {
//         setCurrentPage((prevPage) => prevPage - 1);
//     };

//     return {
//         products,
//         currentPage,
//         totalPages,
//         nextPage,
//         prevPage,
//     };
// }

// export default usePagination;
