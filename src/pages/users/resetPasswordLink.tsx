import ResetPasswordLinkComponent from "components/User/RestorePass/ResetPasswordLinkComponent";
import { NextPage } from "next";
import Head from "next/head";



const ResetPasswordLink: NextPage = () => {

    return (
        <>
            <Head>
                <title>Restore Password</title>
            </Head>
            <ResetPasswordLinkComponent />
        </>
    )
}

export default ResetPasswordLink;