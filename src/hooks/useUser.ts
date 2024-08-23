import { useEffect, useState } from 'react';
import { getUserById, updateUser } from '@/api/api';
import { User } from '@/types/user';

export const useUser = (userId: number) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (err) {
        setError('Error al obtener el usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const updateUserDetails = async (data: { id: number, name?: string, userName?: string, password?: string }) => {
    try {
      await updateUser(userId, data);
      setUser((prevUser: any) => ({ ...prevUser, ...data }));
    } catch (err) {
      setError('Error al actualizar el usuario');
    }
  };

  return { user, loading, error, updateUserDetails };
};