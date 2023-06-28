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
    rol: rol;
    age: number;
    social: string;
    cart: Cart["_id"];
    documents: string[];
    last_connection: Date;
}

export enum rol {
    ADMIN = "admin",
    USER = "user",
    PREMIUM = "premium",
}


export interface Ticket {
    id: string;
    code: string;
    amount: number;
    purchaser: string;
    purchased_datetime: Date;
}

export interface Paginate {
    totalDocs: number;
    offset: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number;
    nextPage: number;
}

export interface CartContextProvider {
    cartItems: Product[];
    addProduct: (pid: Product["_id"]) => AxiosResponse;
    deleteProd: (pid: Product["_id"]) => AxiosResponse;
    emptyCart: () => AxiosResponse;
    purchase: () => void;
}
