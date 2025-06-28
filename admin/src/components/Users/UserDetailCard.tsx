// src/pages/admin/users/UserDetailCard.tsx

import type { User } from "../../types/user";

interface Props {
  user: User;
}

const UserDetailCard = ({ user }: Props) => {
  return (
    <div className="space-y-4 text-sm">
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <p>
        <strong>Status:</strong> {user.is_active ? "Aktif" : "Tidak Aktif"}
      </p>
      <p>
        <strong>Dibuat:</strong> {new Date(user.created_at).toLocaleString()}
      </p>
      {user.updated_at && (
        <p>
          <strong>Diperbarui:</strong>{" "}
          {new Date(user.updated_at).toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default UserDetailCard;
