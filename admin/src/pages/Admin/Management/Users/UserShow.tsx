import { useParams } from "react-router-dom";
import { useUserDetail } from "../../../../hooks/user/useUserDetail";
import UserDetailCard from "../../../../components/Users/UserDetailCard";

const UserShow = () => {
  const { userId } = useParams();
  const id = parseInt(userId || "", 10);
  const { user, loading, error } = useUserDetail(id);

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-4">Detail Pengguna</h1>
      {loading && <p>Memuat data pengguna...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {user && <UserDetailCard user={user} />}
    </div>
  );
};

export default UserShow;
