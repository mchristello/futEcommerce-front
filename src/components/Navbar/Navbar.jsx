import SessionNav from "components/Navbar/SessionNav";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {

    const { data: session} = useSession()

    return (
        <nav className="container mx-auto flex flex-row text-center bg-slate-700 rounded-xl backdrop-blur-sm bg-white/40 sticky top-1 z-50 w-screen">
            <Link className="underline_effect m-4 w-36 text-xl hover:underline hover:scale-110" href="/">HOME!</Link>
                { session ? 
                    <SessionNav />
                    :             
                    <ul className="flex flex-row">
                        <Link href="/" className="underline_effect m-4 hover:bg-neutral-300 hover:scale-110 active:bg-sky-900 focus:outline-none focus:ring focus:ring-violet-300 rounded-md w-36">
                            <li >Products</li>
                        </Link>
                        <Link href="/users/login" className="underline_effect m-4 hover:bg-neutral-300 hover:scale-110 active:bg-sky-900 focus:outline-none focus:ring focus:ring-violet-300 rounded-md w-36">
                            <li >Login</li>
                            
                        </Link>
                        <Link href="/users/register" className="underline_effect m-4 hover:bg-neutral-300 hover:scale-110 active:bg-sky-900 focus:outline-none focus:ring focus:ring-violet-300 rounded-md w-36">
                            <li >Register</li>
                        </Link>
                    </ul>
                }
        </nav>
    )
}

export default Navbar