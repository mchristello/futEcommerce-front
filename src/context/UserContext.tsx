import { createContext } from "react";
import { connectAPI, connectNextURL } from "utils/serverConnection";
import { useSession } from 'next-auth/react';
import { User } from "interfaces/interfaces";

type props = {
    children: React.ReactNode
}

export const UserContext = createContext({})

export const UserProvider = ({ children }:props) => {
    const { data: session } = useSession();

    const getUsers = async () => {
        const users = await connectNextURL.get('/users', {
            headers: {
                Authorization: `Bearer ${session?.user?.token}`
            }
        })

        return users.data.payload
    }

    const data = {
        getUsers
    }

    return (
        <UserContext.Provider value={data}>{children}</UserContext.Provider>
    )
}
