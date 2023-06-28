import { Inter } from 'next/font/google'
import { GetServerSideProps, NextPage } from 'next';
import { Product } from "interfaces/interfaces";
import { connectBack } from 'utils/serverConnection';
import ProductsList from './products/productsList';
import Head from 'next/head';
import PaginationComponent from 'components/Products/Pagination/PaginationComponent';
import { useEffect, useState } from 'react';
import axios from 'axios';


const inter = Inter({ subsets: ['latin'] })

type Props = {
  initialProducts: Product[]
  totalPages: number
}

type RequestType = {
  payload: Product[]
  totalPages: number
}

const Home: NextPage<Props> = ({ initialProducts, totalPages }) => {

  const [ products, setProducts ] = useState<Product[]>(initialProducts)
  const [currentPage, setCurrentPage ] = useState<number>(1);
  const limit = 12;

  const fetchData = async (page: number) => {
    try {
      const { data: response } = await axios.get(
        `http://localhost:8080/api/products?page=${page}&limit=${limit}&query=&sort=`, {
          headers: {'X-Requested-With': 'XMLHttpRequest'}
        }
      );
      setCurrentPage(page);
      setProducts(response.payload.docs);
      return {
        products: response.payload.docs,
        totalPages: response.payload.totalPages,
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      return {
        products: [],
        totalPages: 0,
      };
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  return (
    <>
      <Head>
        <title>eCommerce °° by M.Ch. °°</title>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`} >
        <ProductsList products={products}/>
        <PaginationComponent 
          totalPages={totalPages}
          currentPage={currentPage}
          handleNextPage={nextPage}
          handlePrevPage={prevPage}
          />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = query.page || 1;
  const limit = 12;

  try {
      const { data: response } = await connectBack.get(`api/products?page=${page}&limit=${limit}&query=&sort=`, {
        headers: {'X-Requested-With': 'XMLHttpRequest'}
      });

      return {
          props: {
              initialProducts: response.payload.docs,
              totalPages: response.payload.totalPages,
          },
      };
  } catch (error) {
      console.error('Error fetching products:', error);
{}
      return {
          props: {
              initialProducts: [],
              totalPages: 0,
          },
      };
  }
}

export default Home;