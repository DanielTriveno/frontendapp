import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

// Esquema de validación para las contraseñas usando Zod
const passwordSchema = z.object({
    currentPassword: z.string()
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
        .nonempty({ message: "La contraseña actual es obligatoria" }),
    newPassword: z.string()
        .min(6, { message: "La nueva contraseña debe tener al menos 6 caracteres" })
        .nonempty({ message: "La nueva contraseña es obligatoria" }),
    confirmPassword: z.string()
        .min(6, { message: "La confirmación de la contraseña debe tener al menos 6 caracteres" })
        .nonempty({ message: "La confirmación de la contraseña es obligatoria" })
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

type FormData = z.infer<typeof passwordSchema>;

const UpdatePasswordPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const { handleSubmit, register, formState:{ errors } } = useForm<FormData>({
        resolver: zodResolver(passwordSchema)
    });
    const { error, updateUserDetails } = useUser(Number(userId));
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        await updateUserDetails({ id: Number(userId), password: data.newPassword });
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
                            Actualizar Contraseña
                        </h2>
                        {error && <div className="text-red-600 mb-4">{error}</div>}
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-grow">
                            <div className="mb-4">
                                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Contraseña Actual
                                </label>
                                <Input
                                    id="currentPassword"
                                    type="password"
                                    {...register('currentPassword')}
                                    className={`block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 ${errors.currentPassword ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.currentPassword && <span className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nueva Contraseña
                                </label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    {...register('newPassword')}
                                    className={`block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.newPassword && <span className="text-red-500 text-sm mt-1">{errors.newPassword.message}</span>}
                            </div>
                            <div className="mb-6">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirmar Contraseña
                                </label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    {...register('confirmPassword')}
                                    className={`block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.confirmPassword && <span className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</span>}
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
};

export default UpdatePasswordPage;
