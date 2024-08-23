import { User } from '@/types/user';
import axios from 'axios';

 const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
 });

// Obtener la lista de usuarios
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/api/users');
  return response.data;
};

// Obtener un usuario por ID
export const getUserById = async (userId: number): Promise<User> => {
     try {
       const response = await api.get(`/api/users/${userId}`);
       return response.data;
     } catch (error) {
       throw new Error("Failed to fetch user");
     }
   };
// Obtener el último usuario registrado   
export const getLatestUser = async (): Promise<User> => {
    try {
      const response = await api.get('/api/users/latest');
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener el último usuario');
    }
  };
// Actualizar un usuario (nombre, nombre de usuario o contraseña)
export const updateUser = async (userId: number, data: { id: number, name?: string, userName?: string, password?: string }) => {
  const response = await api.patch(`/api/users/${userId}`, data);
  return response.data;
};

// Eliminar un usuario por ID
export const deleteUser = async (userId: number) => {
  const response = await api.delete(`/api/users/${userId}`);
  return response.data;
};

// Registro de un nuevo usuario
export const registerUser = async (data: { name: string, userName: string, email: string, password: string, phone: string }) => {
  const response = await api.post('/api/users/register', data);
  return response.data;
};

export default api;