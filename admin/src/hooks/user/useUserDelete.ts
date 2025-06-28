// src/hooks/user/useUserDelete.ts

import { useState } from "react";
import { deleteUser as deleteUserAPI } from "../../services/usersService";

export const useUserDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUser = async (userId: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await deleteUserAPI(userId);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.detail || "Gagal menghapus pengguna.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, loading, error };
};
