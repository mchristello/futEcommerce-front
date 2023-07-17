import { NextApiRequest, NextApiResponse } from "next";
import { connectAPI } from "utils/serverConnection";



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { cid } = req.query;
    const authToken = req.headers.authorization

    if (req.method === "GET") {
        try {
            const { data: response } = await connectAPI.get(`/carts/${cid}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })

            const time = new Date().toLocaleString()
            console.log(`${req.method} DESDE PAGES ${req.url}, at ${time}`, response);

            return res.status(200).send(response)
        } catch (error:any) {
            console.log(`CATCH IN PAGES/API/CARTS-->`, error.message);
            return res.status(500).end();
        }
    }

    if(req.method === 'DELETE') {
        try {
            const { data: response } = await connectAPI.delete(`/carts/${cid}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })

            const time = new Date().toLocaleString()
            console.log(`${req.method} DESDE PAGES ${req.url}, at ${time}`, response);

            return res.status(200).send(response)
        } catch (error: any) {
            console.log(`CATCH ${req.method} at ${req.url}-->`, error.message);
            return res.status(500).end();
        }
    }
}

export default handler;