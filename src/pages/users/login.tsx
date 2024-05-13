import LoginComponent from "components/User/LoginComponent"
import { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { authOptions } from "pages/api/auth/[...nextauth]";


const Login: NextPage = () => {

    return (
        <>
            <Head>
                <title>eCommerce °° by M.Ch °°</title>
            </Head>
            <LoginComponent />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);
    
    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
    };

    }
    return {
        props: {},
    };
};

export default Login;