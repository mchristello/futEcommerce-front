import { Button } from "flowbite-react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { connectNextURL } from "utils/serverConnection";

type Inputs = {
    email: string
}


const ResetPasswordLinkComponent: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const router = useRouter()

    const onSubmit: SubmitHandler<Inputs> = async (data) =>{
        const response = await connectNextURL.post("/users/restore", { ...data })

        if (response.status === 200) {
            router.push("/");
        }
    };

    return (
        <section className="px-6 py-12 lg:px-8 rounded-xl backdrop-blur-sm bg-white/40 mt-10">
            <h2 className="m-5 w-[20vw] text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">Get Resete Link.</h2>
            <form className="flex flex-col gap-5 text-xl mt-10" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email" className="block text-md font-medium leading-6 text-gray-900">Enter your email:</label>
                <input 
                    {...register("email", { required: true })} 
                    placeholder="email@email.com" 
                    className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && <span>This field is required</span>}
                <Button type="submit" className="flex w-full justify-center rounded-md bg-sky-500 px-2 py-1 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500" >Send Link </Button>
            </form>
        </section>
    )
}

export default ResetPasswordLinkComponent;