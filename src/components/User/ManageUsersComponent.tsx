'use client';

import { Button } from "flowbite-react";
import { useUsers } from "hooks/useUsers";
import { User } from "interfaces/interfaces";

type Props = {
    users: User[]
}

const ManageUsersComponent: React.FC<Props> = ({users}) => {
    const { deleteUser } = useUsers()

    return (
        <section>
            <h2 className=" text-center text-3xl mb-10 font-bold tracking-tight text-gray-900 dark:text-white underline">User Accounts Managment</h2>
            <div className="flex flex-row flex-wrap justify-center gap-10">
                { users.map((user: any) => {
                    return (
                        <section key={user.email} className="flex flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-screen-lg hover:bg-gray-100 dark:border-gray-3s00 dark:bg-gray-400 dark:hover:bg-gray-500">
                            <div className="w-[20vw]">
                                <div className="text-center">
                                    <div className="flex flex-col justify-center p-4 leading-normal w-full m-auto">
                                        <div>
                                            <h4 className="m-4 text-xl" >{user.first_name} {user.last_name}</h4>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-900" ><strong>E-mail:</strong> <i>{user.email}</i></p>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-900" ><strong>User ID:</strong> <i className="font-extralight">{user._id}</i></p>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-900 text-md" ><strong>User rol:</strong> {user.rol}.</p>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-900" ><strong>Cart ID:</strong> <i className="font-extralight">{user.cart}</i></p>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-900" ><strong>User Accont Origin:</strong> <i className="font-extralight">{user.social}</i></p>
                                            <p className="mb-6 font-normal text-gray-700 dark:text-gray-900" ><strong>User Last Connection:</strong> <i>{user.last_connection}</i></p>
                                        </div>
                                        <Button gradientDuoTone="redToYellow" onClick={() => deleteUser(user._id)}>
                                            Delete User!
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
                })}
            </div>
        </section>
    )
};

export default ManageUsersComponent;