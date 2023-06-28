'use client';

import { Card } from 'flowbite-react';
import { Cart } from "interfaces/interfaces";
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    cart: Cart[];
}

const CartResumeList: React.FC<Props> = ({ cart }) => {

    console.log(`DE CARTRESUME`, cart);

    return (
        <Card>
            <h5 className="m-3 text-base font-semibold text-gray-900 dark:text-white lg:text-xl">
                Cart Resume
            </h5>
            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <p>
                    This is your cart so far.
                </p>
            </div>
            <ul className="my-4 space-y-3">
                { cart.map((p) => {
                    console.log(p);
                    return (
                        <li key={p._id}>
                            <Link
                                className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                                href={`/products/${p.products._id}`}
                            >
                                <Image src={p.products.thumbnail} alt='Product image' className="w-10" />
                                <span className="ml-3 flex-1 whitespace-nowrap">
                                    {p.products.description}
                                </span>
                                <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                                    <p>
                                        x{p.quantity}
                                    </p>
                                </span>
                                <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                                    <p>
                                        ${p.products.price} each
                                    </p>
                                </span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
            {/* <div>
                <a
                    className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
                    href="#"
                >
                    <span />
                    <p>
                        Why do I need to connect with my wallet?
                    </p>
                </a>
            </div> */}
        </Card>
    )
}

export default CartResumeList;