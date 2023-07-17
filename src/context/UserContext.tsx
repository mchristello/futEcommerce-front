import { createContext } from "react";
import { connectAPI, connectNextURL } from "utils/serverConnection";
import { useSession } from 'next-auth/react';
import { User, UserContextProvider } from "interfaces/interfaces";
import axios from "axios";

type props = {
    children: React.ReactNode
}

export const UserContext = createContext<UserContextProvider | null>(null)

export const UserProvider: React.FC<props> = ({ children }) => {
    const { data: session } = useSession();
    
    const getUsers = async () => {
        const reponse = await connectNextURL.get('/users', {
            headers: {
                Authorization: `Bearer ${session?.user?.token}`
            }
        })

        return reponse.data.payload
    }

    const deleteUser = async (uid: User["_id"]) => {
        try {
            const { data: result } = await connectNextURL.delete(`/users/${uid}`, {
                headers: {
                    Authorization: `Bearer ${session?.user?.token}`
                }
            })
            console.log({ result });
            return result
        } catch (error:any) {
            console.log(`CATCH IN USERCONTEXT AT -->`, error.message);
        }
    }

    const data = {
        getUsers,
        deleteUser
    }

    return (
        <UserContext.Provider value={data}>{children}</UserContext.Provider>
    )
}
