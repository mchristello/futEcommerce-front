import { Button } from "flowbite-react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { connectNextURL } from "utils/serverConnection";

type Inputs = {
    password: string
}

const NewPasswordComponent: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const router = useRouter();
    console.log(router);

    const { uid, token } = router.query;

    const onSubmit: SubmitHandler<Inputs> = async (data) =>{

        console.log(data);
        const response = await connectNextURL.post(`/users/resetLink/${uid}/${token}`, { ...data })

        if (response.status === 200) {
            router.push("/");
        }
    };

    return (
        <section className="px-6 py-12 lg:px-8 rounded-xl backdrop-blur-sm bg-white/40 mt-10">
            <h2 className="m-5 w-[20vw] text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">Set new Password.</h2>
            <form className="flex flex-col gap-5 text-xl mt-10" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-900">Enter your new password</label>
                <input {...register("password", { required: true })} type="password" className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                {errors.password && <span>This field is required</span>}
                <Button type="submit" className="flex w-full justify-center rounded-md bg-sky-500 px-2 py-1 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500" >Change Password</Button>
            </form>
        </section>
    )
}

export default NewPasswordComponent;