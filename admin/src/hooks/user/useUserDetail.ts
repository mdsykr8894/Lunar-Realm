// src/hooks/user/useUserDetail.ts
import { useEffect, useState } from "react";
import { fetchUserById } from "../../services/usersService";
import type { User } from "../../types/user";

export const useUserDetail = (userId: number) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUserById(userId);
        setUser(data);
      } catch {
        setError("User tidak ditemukan atau gagal dimuat.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  return { user, loading, error };
};
