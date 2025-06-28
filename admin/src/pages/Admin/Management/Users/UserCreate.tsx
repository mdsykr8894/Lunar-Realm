// src/pages/admin/users/UserCreate.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../../services/usersService";
import type { UserCreate as UserCreateType } from "../../../../types/user";
import UserCreateForm from "../../../../components/Users/UserCreateForm";

const UserCreate = () => {
  const [form, setForm] = useState<UserCreateType>({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createUser(form);
      navigate("/admin/management/users");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white max-w-md">
      <h1 className="text-2xl font-bold mb-4">Tambah Pengguna Baru</h1>
      <UserCreateForm
        form={form}
        loading={loading}
        error={error}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UserCreate;
