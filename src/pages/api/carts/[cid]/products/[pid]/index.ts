import { NextApiRequest, NextApiResponse } from "next"
import { connectAPI } from "utils/serverConnection"



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { pid, cid } = req.query
    const productToAdd = req.body

    console.log(`PRDUCTO A USAR ------------>`, req.body);

    const authToken = req.headers.authorization

    if(req.method === 'POST') {
        try {
            const { data: response } = await connectAPI.post(`/carts/${cid}/products/${pid}`, {...req.body}, {
                headers: {
                    Authorization: authToken
                }
            })

            console.log(`RESPONSE FROM ${req.method} at ${req.url}`, response);
            return res.status(200).send(response)
        } catch (error: any) {
            console.log(`CATCH IN ${req.method} at ${req.url}`, error.message);
            return res.status(error.code).end()
        }
    }

    if(req.method === 'DELETE') {
        console.log(`pid: ${pid} & cid: ${cid} from ${req.url}`);
        try {
            const { data: response } = await connectAPI.delete(`/carts/${cid}/products/${pid}`, {
                headers: {
                    Authorization: authToken
                }
            })

            console.log(`RESPONSE FROM ${req.method} at ${req.url}`, response);

            return res.status(200).send(response)
        } catch (error: any) {
            console.log(`CATCH IN ${req.method} at ${req.url}`, error.message);
            return res.status(error.code).end()
        }
    }
}

export default handler