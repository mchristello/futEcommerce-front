import { User } from "interfaces/interfaces";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Prop {
    user: User;
}

const AccountComponent: React.FC<Prop> = ({ user }) => {

    const { data: session } = useSession()

    return (
        <section className="flex flex-col">
            <h1 className="text-5xl text-center mb-10 underline font-bold tracking-wider text-gray-700">My Account!</h1>
            { session ?
                <section className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-screen-lg hover:bg-gray-100 dark:border-gray-3s00 dark:bg-gray-400 dark:hover:bg-gray-500">
                    <div className="w-[80vw]">
                        <div className="flex flex-row text-center">
                            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-auto md:rounded-none md:rounded-l-lg" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt=""/>
                            <div className="flex flex-col justify-between p-4 leading-normal w-full m-3">
                                <div>
                                    <h3 className="text-3xl mb-4 font-bold tracking-tight text-gray-900 dark:text-white underline" >Welcome, {user.first_name} !</h3>
                                    { user.rol === 'admin'  
                                        ? <h5 className="m-4 text-2xl" >It is nice to see an admin arround. 😁</h5>
                                        : <h5 className="m-4 text-2xl" > Nice to see you again!</h5> 
                                    }
                                    <h4 className="m-4" >Here is your info. ⬇️</h4>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-900" >E-mail: <i>{user.email}</i></p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-900" >Name: <i>{user.first_name}</i></p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-900" ><small className="font-extralight">Your rol: {user.rol}.</small></p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-900" ><strong>Your cart ID:</strong> <i className="font-extralight">{user.cart._id}</i></p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-900" ><strong>Your User ID:</strong> <i className="font-extralight">{user._id}</i></p>
                                    <p className="mb-6 font-normal text-gray-700 dark:text-gray-900" >Last Connection: <i>{user.last_connection}</i></p>
                                    <Link className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 m-2" href="/users/updateInfo">Update Info</Link>
                                    <Link className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 m-2" href="/users/resetPassword">Change Password</Link>
                                </div>
                                <Link className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-6" href={`/carts/${user.cart._id}`}>Go to Cart</Link>
                            </div>
                        </div>
                    </div>
                </section>
            :
                <h2>Please login.</h2>
            }
        </section>
    )
}

export default AccountComponent;