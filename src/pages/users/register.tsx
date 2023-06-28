import { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import RegisterComponent from "components/User/Register/RegisterComponent";
import Head from "next/head";


const Register: NextPage = () => {

    return (
        <>
            <Head>
                <title>eCommerce °° by M.Ch. °°</title>
            </Head>
            <RegisterComponent />
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


export default Register;