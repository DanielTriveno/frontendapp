import { useState } from 'react';
import { deleteUser } from '@/api/api';
import { useNavigate } from 'react-router-dom';

export const useDeleteUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDeleteUser = async (userId: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteUser(userId);
      navigate('/');
    } catch (err) {
      setError('Error al eliminar la cuenta. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteUser, loading, error };
};
