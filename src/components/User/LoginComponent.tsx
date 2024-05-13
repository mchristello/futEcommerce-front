import { User } from "interfaces/interfaces";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DotSpinner } from '@uiball/loaders'
import Link from "next/link";

type Inputs = {
    email: User['email'],
    password: User['password']
}

const LoginComponent: React.FC = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    // const redirect = useRouter();
    const [ isLoading, setIsLoading ] = useState(false);
    
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true);
        try {
            await signIn('login-next-auth', { ...data })
        } catch (error:any) {
            console.log(`CATCH IN LOGIN COMPONENT -->`, error.message);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section id="login_section">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 rounded-xl backdrop-blur-sm bg-white/40 mt-10">
                <h2 className="m-5 w-[20vw] text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">Sign In</h2>
                <div className="m-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    { isLoading 
                        ? 
                        <div className="mx-auto my-8">
                            <DotSpinner 
                                size={60}
                                speed={0.5} 
                                color="black" 
                            />
                        </div>
                        : <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="email" className="block text-md font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register('email') }
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <Link href={"/users/resetPasswordLink"} className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        { ...register('password') }
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </section>
    )
}

export default LoginComponent;