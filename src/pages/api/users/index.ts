import { connectAPI, connectBack } from "utils/serverConnection";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const authToken = req.headers.authorization
    const { uid } = req.query
    console.log({authToken});
    console.log({uid});

    if(req.method === 'GET') {
        try {
            const { data } = await connectAPI.get('/users');
            console.log(`FROM API/USERS ---> LINE 9`, data);
            return res.status(200).send(data);
        } catch (error:any) {
            console.log(`FROM GET IN PAGES/API-->`, error);
            return res.status(500).end()
        }
    }

    if(req.method === 'POST') {
        try {
            const { data } = await connectBack.post('/users/register', { ...req.body })
            console.log(`FROM API/USERS ---> LINE 20`, data);
            return res.status(200).send(data)
        } catch (error) {
            console.log(`FROM POST IN PAGES/API-->`, error);
            return res.status(500).end()
        }
    }
}

export default handler;