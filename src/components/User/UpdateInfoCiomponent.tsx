import { Button } from "flowbite-react";
import { User } from "interfaces/interfaces"
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { connectNextURL } from "utils/serverConnection";


type Prop = {
    user: User
}

type Inputs = {
    first_name: User["first_name"],
    last_name:  User["last_name"],
    email:  User["email"],
    age:  User["age"],
    rol: User["rol"],
    _id:  User["_id"],
    profile: User["documents"],
    products: User["documents"],
    documents: User["documents"]
};

const UpdateInfoComponent: React.FC<Prop> = ({ user }) => {

    const { register, handleSubmit } = useForm<Inputs>();
    const redirect = useRouter()
    
    const onSubmitInfo: SubmitHandler<Inputs> = async (data) => {
        const body = { ...data }
        const response = await connectNextURL.post('/users/updateInfo', { ...body })

        if(response.status === 200) {
            redirect.push('/users/account')
        }
    }

    const onSubmitDocs: SubmitHandler<Inputs> = async (data) => {
        const body = { ...data }
        const response = await connectNextURL.post(`/users/${user._id}/documents`, { ...body })

        if(response.status === 200) {
            redirect.push('users/account')
        }
    }

    return (
        <section>
            <h2 className="m-auto mb-10 w-[20vw] text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">Update Info!</h2>
            <div className="flex flex-col m-auto w-[50vw]">
                <form className="mb-20" onSubmit={handleSubmit(onSubmitInfo)}> 
                    <p className="m-auto mb-5 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">USER information.</p>
                    <input type="text" {...register("first_name")} id="first_name" placeholder={`Name: ${user.first_name} - disabled`}  disabled/>
                    <input type="text" {...register("last_name")} id="last_name" placeholder={`Lastname: ${user.last_name} - disabled`}  disabled/>
                    <input type="email" {...register("email")} id="email" placeholder={`Email: ${user.email} - disabled`} />
                    <input type="text" {...register("rol")} id="rol" placeholder={`Rol: ${user.rol} - disabled`} disabled/>
                    <input type="number" {...register("age")} id="age" placeholder={`Age: ${user.age}`} />
                    <input type="text" {...register("_id")} id="first_name" placeholder={`ID: ${user._id} - disabled`} value={user._id} disabled/>
                    <Button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-6" id="send-btn" >Update</Button>
                </form>

                <form className="new_product-form" onSubmit={handleSubmit(onSubmitDocs)}> 
                    <p className="m-auto mb-5 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">USER Documentation.</p>
                    <label htmlFor="profile">Profile Pic</label>
                    <input type="file" {...register("profile")} id="profile" placeholder="Profile Pic" /><br />
                    <label htmlFor="products">Product Pic</label>
                    <input type="file" {...register("products")} id="products" placeholder="Product Pic" /><br />
                    <label htmlFor="documents">Document</label>
                    <input type="file" {...register("documents")} id="documents" placeholder="Document" />
                    <Button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-6" >Upload</Button>
                </form>
                
            </div>
        </section>
    )
}


export default UpdateInfoComponent