import { NextApiRequest, NextApiResponse } from "next";
import { connectAPI } from "utils/serverConnection";



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const authToken = req.headers.authorization
    console.log({authToken});



    if(req.method === 'POST') {
        try {
            const { data } = await connectAPI.post('/users/updateInfo');
            console.log(`FROM API/USERS ---> LINE 9`, data);

            return res.status(200).send(data);

        } catch (error:any) {
            console.log(`FROM GET IN PAGES/API-->`, error);
            return res.status(500).end()
        }
    }
}