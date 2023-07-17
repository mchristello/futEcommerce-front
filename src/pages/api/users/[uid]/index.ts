import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { connectAPI } from "utils/serverConnection";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const authToken = req.headers.authorization
    const { uid } = req.query
    console.log({authToken});
    // console.log(`desde api users uid del front ${uid}`);

    if(req.method === "DELETE") {
        try {
            // const { data: response } = await connectAPI.delete(`/users/${uid}`, {
            //     headers: {
            //         Authorization: authToken // TODO: No me toma el token ??????????????!!!!!!!!!!!!
            //     }
            // })
            const { data: response } = await axios.delete(`http://localhost:8080/api/users/${uid}`, {
                headers: {
                    Authorization: authToken // TODO: No me toma el token ??????????????!!!!!!!!!!!!
                }
            })

            console.log(`RESPONSE FROM ${req.method} at ${req.url}`, response);

            return res.status(200).send(response)
        } catch (error: any) {
            console.log(`CATCH IN ${req.method} AT ${req.url}-->`, error.message);
            return res.status(500).end()
        }
    }
}

export default handler;