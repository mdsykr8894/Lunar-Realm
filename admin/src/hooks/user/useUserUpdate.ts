// src/hooks/user/useUserUpdate.ts
import { useState } from "react";
import { updateUser as apiUpdateUser } from "../../services/usersService";
import type { User, UserUpdate } from "../../types/user";

export const useUserUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (
    userId: number,
    data: UserUpdate
  ): Promise<User | null> => {
    setLoading(true);
    setError(null);

    try {
      const updatedUser = await apiUpdateUser(userId, data);
      return updatedUser;
    } catch (err: any) {
      setError(err.response?.data?.detail || "Gagal mengupdate pengguna.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
};
