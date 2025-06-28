// src/pages/admin/users/UserEditForm.tsx

import { useState, useEffect } from "react";
import type { User, UserUpdate } from "../../types/user";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

interface Props {
  user: User;
  onSubmit: (data: UserUpdate) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const UserEditForm = ({ user, onSubmit, loading, error }: Props) => {
  const [formData, setFormData] = useState<UserUpdate>({
    username: user.username,
    email: user.email,
    role: user.role,
    is_active: user.is_active,
    password: "",
  });

  useEffect(() => {
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
      password: "",
    });
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "is_active" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="text-white space-y-4 max-w-md">
      <Input
        name="username"
        label="Username"
        value={formData.username || ""}
        onChange={handleChange}
      />
      <Input
        name="email"
        type="email"
        label="Email"
        value={formData.email || ""}
        onChange={handleChange}
      />
      <Select
        name="role"
        label="Role"
        value={formData.role || "user"}
        onChange={handleChange}
        options={[
          { value: "user", label: "User" },
          { value: "admin", label: "Admin" },
          { value: "super_admin", label: "Super Admin" },
        ]}
      />
      <Select
        name="is_active"
        label="Status"
        value={formData.is_active ? "true" : "false"}
        onChange={handleChange}
        options={[
          { value: "true", label: "Aktif" },
          { value: "false", label: "Tidak Aktif" },
        ]}
      />
      <Input
        name="password"
        type="password"
        label="Password (kosongkan jika tidak diganti)"
        value={formData.password || ""}
        onChange={handleChange}
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
};

export default UserEditForm;
