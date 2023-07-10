import { NextApiRequest, NextApiResponse } from "next";
import { connectBack } from "utils/serverConnection";



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { uid, token } = req.query;

    if(req.method === "POST") {
        try {
            const { data } = await connectBack.post(`/users/resetLink/${uid}/${token}`, { ...req.body })
    
            return res.status(200).send(data)
        } catch (error) {
            console.log(`ERROR IN POST AT ${req.url} -->`, error);
            return res.status(500).end()
        }
    }
}

export default handler;