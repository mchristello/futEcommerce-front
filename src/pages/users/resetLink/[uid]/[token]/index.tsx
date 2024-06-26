import NewPasswordComponent from "../../../../../components/User/NewPasswordComponent";
import { NextPage } from "next";
import Head from "next/head";


const NewPasswordPage: NextPage = () => {

    return (
        <>
            <Head>
                <title>New Password</title>
            </Head>
            <NewPasswordComponent />
        </>
    )
}

export default NewPasswordPage