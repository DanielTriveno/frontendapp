import { useState, useEffect } from 'react';
import { getLatestUser } from '@/api/api';
import { User } from '@/types/user';

export const useLatestUser = () => {
  const [latestUser, setLatestUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestUser = async () => {
      try {
        const user = await getLatestUser();
        setLatestUser(user);
      } catch (err) {
        setError('Error al obtener el último usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestUser();
  }, []);

  return { latestUser, loading, error };
};
