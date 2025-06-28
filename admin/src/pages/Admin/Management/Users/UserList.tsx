import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserList } from "../../../../hooks/user/useUserList";
import { useUserDelete } from "../../../../hooks/user/useUserDelete";
import UserTable from "../../../../components/Users/UserTable";
import Pagination from "../../../../components/ui/Pagination/Pagination";

const UserList = () => {
  const { users, loading, error, refresh } = useUserList();
  const { deleteUser, loading: deleting, error: deleteError } = useUserDelete();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // atau sesuai kebutuhan

  // Hitung data yang akan ditampilkan di halaman saat ini
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = async (id: number) => {
    const success = await deleteUser(id);
    if (success) {
      alert("User deleted successfully.");
      refresh();
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User List</h1>
        <Link
          to="/admin/management/users/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add User
        </Link>
      </div>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {deleteError && <p className="text-red-500">{deleteError}</p>}
      {!loading && !error && users.length === 0 && <p>No users found.</p>}
      {!loading && !error && users.length > 0 && (
        <>
          <UserTable users={paginatedUsers} onDelete={handleDelete} />
          <Pagination
            totalItems={users.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            maxPageButtons={5} // opsional
          />
        </>
      )}
      {deleting && <p>Deleting user...</p>}
    </div>
  );
};

export default UserList;
