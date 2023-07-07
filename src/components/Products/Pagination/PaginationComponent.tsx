'use client';
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from 'react-icons/hi';


type PaginationProps = {
    totalPages: number,
    currentPage: number,
    handleNextPage: () => void,
    handlePrevPage: () => void,
}

const PaginationComponent: React.FC<PaginationProps> = ({
    totalPages,
    currentPage,
    handleNextPage,
    handlePrevPage
}) => {

    const eachPage = Array.from({ length: totalPages }, (_, index) => (
        <p className="m-5" key={index}>{index + 1}</p>
    ));

    const [prevPage, setPrevPage] = useState<boolean>(false);
    const [nextPage, setNextPage] = useState<boolean>(false);

    useEffect(() => {
        setPrevPage(currentPage > 1)
        setNextPage(currentPage < totalPages)
    }, [currentPage, totalPages])

    return (
        <section className="container flex flex-row m-5 justify-center w-full text-xl text-white">
            <Button onClick={handlePrevPage} disabled={currentPage === 1} className="m-10" size="xl" gradientDuoTone="redToYellow" ><HiOutlineArrowLeft className="mr-2 h-10 w-10" /> Prev Page </Button>
            <p className="m-10 text-center" aria-label="selected">Page {currentPage} of {totalPages}</p>
            {/* <div className="flex flex-row m-10 justify-center text-center">{eachPage}</div> */}
            <Button onClick={handleNextPage} disabled={currentPage === totalPages} className="m-10" size="xl" gradientDuoTone="redToYellow" >Next Page <HiOutlineArrowRight className="ml-2 h-10 w-10" /> </Button>
            {/* <Pagination
                currentPage={currentPage}
                onPageChange={page=>{setCurrentPage(page)}}
                showIcons
                totalPages={totalPages}
            /> */}
        </section>
    )
}


export default PaginationComponent;