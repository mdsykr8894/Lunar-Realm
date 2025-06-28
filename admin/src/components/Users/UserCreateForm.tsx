// src/pages/admin/users/UserCreateForm.tsx

import Input from "../ui/Input";
import Button from "../ui/Button";
import type { UserCreate } from "../../types/user";

interface Props {
  form: UserCreate;
  loading: boolean;
  error?: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const UserCreateForm = ({
  form,
  loading,
  error,
  onChange,
  onSubmit,
}: Props) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        name="username"
        label="Username"
        placeholder="Username"
        value={form.username}
        onChange={onChange}
        required
      />
      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="Email"
        value={form.email}
        onChange={onChange}
        required
      />
      <Input
        name="password"
        type="password"
        label="Password"
        placeholder="Password"
        value={form.password}
        onChange={onChange}
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
};

export default UserCreateForm;
