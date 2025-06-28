// src/hooks/user/useUserCreate.ts
import { useState } from "react";
import { createUser as createUserService } from "../../services/usersService";
import type { User, UserCreate } from "../../types/user";

export const useUserCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (newUser: UserCreate): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const createdUser = await createUserService(newUser);
      return createdUser;
    } catch (err: any) {
      setError(err.response?.data?.detail || "Gagal membuat pengguna.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
};
