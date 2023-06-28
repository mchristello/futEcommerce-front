import axios from "axios";
import { createContext } from "react";
import { connectAPI } from "utils/serverConnection";
import { useSession } from 'next-auth/react';

type props = {
    children?: React.ReactNode
}

export const UserContext = createContext({})

export const UserContextProvider = ({ children }: props) => {
    const { data: session } = useSession();

    const getUsers = async () => {
        const users = await connectAPI.get('/users', {
            headers: {
                Authorization: `Bearer ${session?.user}`
            }
        })
    }
}