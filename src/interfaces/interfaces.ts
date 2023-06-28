import { AxiosResponse } from "axios";

export interface Product {
    _id: string;
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    price: number;
    code: string;
    stock: number;
    status: boolean;
    owner: User["_id"];
}

export interface Cart {
    _id: string;
    products: Products[];
}

export interface Products {
    product: Product;
    quantity: number;
}

export interface User {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    rol: string;
    age: number;
    social: string;
    cart: Cart["_id"];
    documents: string[];
    last_connection: Date;
}

export interface Ticket {
    id: string;
    code: string;
    amount: number;
    purchaser: string;
    purchased_datetime: Date;
}

export interface PaginationProps {
    totalDocs: number;
    totalPages: number;
    page: number;
    prevPage: number;
    nextPage: number;
    onNextPage: () => void;
    onPrevPage: () => void;
}

export interface CartContextProvider {
    cartItems: number;
    addProduct: (pid: Product["_id"]) => any;
    deleteProd: (pid: Product["_id"]) => any;
    emptyCart: () => any;
    purchase: () => void;
}
