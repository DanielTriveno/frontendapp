import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/api/api";

const registerSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }).nonempty("El nombre es obligatorio"),
  userName: z.string().min(2, { message: "El nombre de usuario debe tener al menos 2 caracteres" }).nonempty("El nombre de usuario es obligatorio"),
  email: z.string().email("Debe ser un correo electrónico válido"),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  phone: z.string().min(6, { message: "El teléfono debe tener al menos 6 dígitos" }).nonempty("El teléfono es obligatorio")
});

type FormData = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data);
      navigate("/user");
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md min-h-screen">
        <Card className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">Registro</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
              <Input id="name" type="text" {...register("name")} className={errors.name ? "border-red-500" : ""} />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
              <Input id="userName" type="text" {...register("userName")} className={errors.userName ? "border-red-500" : ""} />
              {errors.userName && <span className="text-red-500 text-sm">{errors.userName.message}</span>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <Input id="email" type="email" {...register("email")} className={errors.email ? "border-red-500" : ""} />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <Input id="password" type="password" {...register("password")} className={errors.password ? "border-red-500" : ""} />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
              <Input id="phone" type="text" {...register("phone")} className={errors.phone ? "border-red-500" : ""} />
              {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-3 rounded-lg shadow-md hover:from-green-500 hover:to-green-700 transition-colors duration-300">
              Registrar
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
