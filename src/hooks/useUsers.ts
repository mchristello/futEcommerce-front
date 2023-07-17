import { UserContext } from "context/UserContext";
import { useContext } from 'react';


export const useUsers = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useCart debe ser utilizado dentro de un CartProvider');
    }

    return context;
};