import { User } from "interfaces/interfaces";
import { connectNextURL } from "utils/serverConnection";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    firstName: User["first_name"],
    lastName:  User["last_name"],
    email:  User["email"],
    age:  User["age"],
    password:  User["password"]
};

const RegisterComponent: React.FC = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const redirect = useRouter();
    
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const body = { ...data }
        const response = await connectNextURL.post('/users', { ...body })

        console.log(response.data);
        if(response.status === 200) {
            // redirect.push('/login')
        }
    };

    return (
        <section id="register_section">
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 rounded-xl backdrop-blur-sm bg-white/40 mt-10">
                <h2 className="m-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                    Create Your Account
                </h2>
                <div className="m-10 sm:mx-auto sm:w-full sm:max-w-lg">
                    <form className="space-y-12 w-fit" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-row">
                            <div className="flex flex-col">
                                <label htmlFor="firstName" className="block text-md font-medium leading-6 text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register("firstName")}
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        autoComplete="firstName"
                                        required
                                        className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col ml-4">
                                <label htmlFor="lastName" className="block text-md font-medium leading-6 text-gray-900">
                                    Last Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register("lastName")}
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        autoComplete="lastName"
                                        required
                                        className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row w-full">
                            <div className="flexflex-col w-full">
                                <label htmlFor="email" className="block text-md font-medium leading-6 text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register("email")}
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row">
                            <div className="flex items-center justify-between flex-col">
                                <label htmlFor="age" className="block text-md font-medium leading-6 text-gray-900">
                                    Age
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register("age")}
                                        id="age"
                                        name="age"
                                        type="number"
                                        autoComplete="age"
                                        required
                                        className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between flex-col ml-4">
                                <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register("password")}
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="password"
                                        required
                                        className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default RegisterComponent;