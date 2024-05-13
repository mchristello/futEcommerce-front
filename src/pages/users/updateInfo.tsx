import UpdateInfoComponent from "components/User/UpdateInfoCiomponent";
import { User } from "interfaces/interfaces";
import { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { connectBack } from "utils/serverConnection";

type Prop = {
    user: User
}

type Response = {
    payload: User
}

const UpdateInfo: NextPage<Prop> = ({ user }) => {

    return (
        <>
            <Head>
                <title>Update User Info</title>
            </Head>
            <UpdateInfoComponent user={user} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    try {
        if (session && session.user) {
            const response = await connectBack.get<Response>('/api/users/current', {
                headers: {
                    Authorization: `Bearer ${session.user.token}`
                }
            })

            return {
                props: {
                    user: response.data.payload
                }
            }
        }
    } catch (error) {
        console.log(error);
    }

    return {
        redirect: {
            destination: '/users/account',
            permanent: false
        }
    }
}

export default UpdateInfo