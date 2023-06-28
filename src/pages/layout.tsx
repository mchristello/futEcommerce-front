import Navbar from "components/Navbar/Navbar"
import Head from "next/head"

type LayoutProps = {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {

    return (

        <>
            <Head>
                <title>Layouts Example</title>
            </Head>
            <Navbar />
            <main className="flex flex-col items-center justify-between w-full min-h-[100vh] h-full bg-main gap-6 py-[50px]">
                {children}
            </main>
        </>

    )
}

export default Layout