import { User } from "interfaces/interfaces";
import { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import AccountComponent from "components/User/AccountComponent";
import { connectBack } from "utils/serverConnection";
import { authOptions } from "pages/api/auth/[...nextauth]";


interface Prop {
    user: User;
}

type Response = {
    payload: User[];
}

const UserAccount: NextPage<Prop> = ({ user }) => {
    
    return (
        <>
            <Head>
                <title>User account.</title>
            </Head>
            <AccountComponent user={user}/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    try {
        if (session && session.user) {
            const resp = await connectBack.get<Response>(`api/users/current`, {
                headers: {
                    Authorization: `Bearer ${session.user.token}`,
                }
            })

            // console.log(`RESP EN ACCOUNT.TSX--->`, resp.data);
            
            return {
                props: {
                    user: resp.data.payload
                }
            }
        }
    } catch (error) {
        console.log(error);
        
    }
    return {
        redirect: {
            destination: "/",
            permanent: false,
        },
    };
}



export default UserAccount;