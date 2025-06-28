// src/pages/Admin/Management/Users/UserEdit.tsx

import { useParams, useNavigate } from "react-router-dom";
import { useUserDetail } from "../../../../hooks/user/useUserDetail";
import { useUserUpdate } from "../../../../hooks/user/useUserUpdate";
import UserEditForm from "../../../../components/Users/UserEditForm";

const UserEdit = () => {
  const { userId } = useParams();
  const id = parseInt(userId || "", 10);
  const navigate = useNavigate();

  const { user, loading: loadingUser, error: errorUser } = useUserDetail(id);
  const {
    updateUser,
    loading: loadingUpdate,
    error: errorUpdate,
  } = useUserUpdate();

  const handleUpdate = async (data: Parameters<typeof updateUser>[1]) => {
    const updated = await updateUser(id, data);
    if (updated) {
      alert("User berhasil diupdate!");
      navigate(`/admin/management/users/${id}`);
    }
  };

  if (loadingUser) return <p>Memuat data pengguna...</p>;
  if (errorUser) return <p className="text-red-500">{errorUser}</p>;
  if (!user) return <p>User tidak ditemukan.</p>;

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-4">Edit Pengguna</h1>
      <UserEditForm
        user={user}
        onSubmit={handleUpdate}
        loading={loadingUpdate}
        error={errorUpdate}
      />
    </div>
  );
};

export default UserEdit;
