import { Product } from "interfaces/interfaces"
import { connectAPI } from "utils/serverConnection"

export const getProducts = async () => {
    const { data } = await connectAPI.get('/products')
    
    return {
        data: {
            result: data.payload.docs 
        }
    }
}