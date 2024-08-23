import React from 'react';
import { useParams } from 'react-router-dom';
import { useDeleteUser } from '@/hooks/useDeleteUser';

const DeleteUserPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { handleDeleteUser, loading, error } = useDeleteUser();

  const onDelete = () => {
    if (userId) {
      handleDeleteUser(Number(userId));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Eliminar Cuenta</h1>
      <p className="mb-6">¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.</p>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={onDelete}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Eliminando...' : 'Eliminar Cuenta'}
      </button>
    </div>
  );
};

export default DeleteUserPage;
