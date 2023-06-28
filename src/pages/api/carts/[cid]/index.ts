import { NextApiRequest, NextApiResponse } from "next";
import { connectAPI } from "utils/serverConnection";



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // console.log(`REVISANDO QUE TRAE EL HEADER`, req.headers.authorization);
    const { cid } = req.query;
    // console.log(`QUERY DE CART ID`, cid);

    const authToken = req.headers.authorization
    // console.log(`A VER EL AUTHTOKEN ------------------>`, authToken);
    if (req.method === "GET") {
        try {
            const { data: response } = await connectAPI.get(`/carts/${cid}`, {
                headers: {
                    Authorization: `Bearer` + authToken
                }
            })

            console.log(`${req.method} DESDE PAGES ${req.url}`, response);

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
                    Authorization: `Bearer` + authToken
                }
            })

            console.log(`${req.method} DESDE PAGES ${req.url}`, response);

            return res.status(200).send(response)
        } catch (error: any) {
            console.log(`CATCH ${req.method} at ${req.url}-->`, error.message);
            return res.status(500).end();
        }
    }
}

export default handler;