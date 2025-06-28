// src/hooks/user/useUserList.ts

import { useEffect, useState } from "react";
import { fetchUsers } from "../../services/usersService";
import type { User } from "../../types/user";

export const useUserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers(); // pastikan fetchUsers tak minta argumen
      setUsers(data);
    } catch (err: any) {
      setError("Gagal memuat pengguna.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { users, loading, error, refresh: load };
};
