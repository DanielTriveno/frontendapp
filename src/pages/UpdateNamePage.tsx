import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';

const nameSchema = z.object({
  name: z.string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(50, { message: "El nombre no puede tener más de 50 caracteres" })
    .nonempty({ message: "El nombre es obligatorio" })
});

type FormData = z.infer<typeof nameSchema>;

const UpdateNamePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(nameSchema)
  });
  const { error, updateUserDetails } = useUser(Number(userId));
  const navigate = useNavigate();


  const onSubmit = async (data: FormData) => {
    await updateUserDetails({ id: Number(userId), name: data.name });
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
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">Actualizar Nombre</h2>
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-grow">
              <div className="mb-6 flex-grow">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <Input
                  id="name"
                  type="text"
                  {...register('name')}
                  className={`block w-full border rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div className="mt-auto">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-3 rounded-lg shadow-md hover:from-green-500 hover:to-green-700 transition-colors duration-300"
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

export default UpdateNamePage;
