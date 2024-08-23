import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const userNameShema = z.object({
    userName: z.string()
        .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
        .max(50, { message: "El nombre no puede tener más de 50 caracteres" })
        .nonempty({ message: "El nombre es obligatorio" })
});

type FormData = z.infer<typeof userNameShema>;

const UpdateUserNamePage = () => {
    const { userId } = useParams<{ userId: string }>();
    const { handleSubmit, register, formState:{ errors } } = useForm<FormData>({
        resolver: zodResolver(userNameShema)
    });
    const { error, updateUserDetails } = useUser(Number(userId));
    const navigate = useNavigate();



    const onSubmit = async (data:FormData) => {   
        await updateUserDetails({ id: Number(userId), userName: data.userName });
        navigate('/user');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-full max-w-md mx-auto flex flex-col flex-grow">
                <Card className="flex flex-col flex-grow bg-white shadow-lg rounded-lg p-6">
                    <div className="relative flex flex-col flex-grow">
                        <button
                            className="absolute top-0 left-1 p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                            onClick={() => navigate(-1)}
                            aria-label="Regresar"
                        >
                            <ChevronLeft className="h-6 w-6 text-gray-500" />
                        </button>
                        <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">
                            Actualizar nombre de Usuario
                        </h2>
                        {error && <div className="text-red-600 mb-4">{error}</div>}
                        <form onSubmit={handleSubmit(onSubmit) } className="flex flex-col flex-grow">
                            <div className="mb-6 flex-grow">
                                <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre de Usuario
                                </label>
                                <Input
                                    id="userName"
                                    type="text"
                                    {...register('userName')}
                                    className={`block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 ${errors.userName ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.userName && <span className="text-red-500 text-sm mt-1">{errors.userName.message}</span>}
                            </div>
                            <div className="mt-auto">
                                <Button
                                    type="submit" 
                                    className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:to-green-700 transition-colors duration-300"
                                >
                                    Guardar
                                </Button>
                            </div>
                        </form>
                    </div>
                </Card>          
            </div>
        </div>
    );

}
export default UpdateUserNamePage;