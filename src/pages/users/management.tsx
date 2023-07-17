import ManageUsersComponent from "components/User/Management/ManageUsersComponent";
import { User } from "interfaces/interfaces";
import { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { connectAPI, connectBack } from "utils/serverConnection";

interface Prop {
    users: User[]
}

type Response = {
    payload: User[];
}

const ManageUsersPage: NextPage<Prop> = ({ users }) => {

    return (
        <section>
            <Head>
                <title>Manage User Accounts</title>
            </Head>
            <ManageUsersComponent users={users}/>
        </section>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    try {
        if (session && session.user) {
            const response = await connectAPI.get('/users', {
                headers: {
                    Authorization: 'Bearer ' + session.user.token
                }
            })
            
            console.log({response});

            return {
                props: {
                    users: response.data.payload
                }
            }
        }
        
    } catch (error: any) {
        console.log(`ERROR EN MANAGMENT -->`, error.message);
    }

    return {
        redirect: {
            destination: "/users/account",
            permanent: false
        }
    }
}

export default ManageUsersPage;