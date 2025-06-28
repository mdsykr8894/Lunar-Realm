import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { User } from "../../types/user";
import Table from "../ui/Table/Table";
import { motion } from "framer-motion";

// MotionLink untuk animasi
const MotionLink = motion(Link);

interface Props {
  users: User[];
  onDelete?: (id: number) => void;
}

const UserTable = ({ users, onDelete }: Props) => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const allSelected = users.length > 0 && selectedUsers.length === users.length;

  const toggleAll = () => {
    if (allSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  const toggleUser = (id: number) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers((prev) => prev.filter((userId) => userId !== id));
    } else {
      setSelectedUsers((prev) => [...prev, id]);
    }
  };

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell className="text-center">
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={allSelected}
              onChange={toggleAll}
            />
          </Table.HeaderCell>
          <Table.HeaderCell className="text-center">Index</Table.HeaderCell>
          <Table.HeaderCell>Username</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Role</Table.HeaderCell>
          <Table.HeaderCell className="text-center">Status</Table.HeaderCell>
          <Table.HeaderCell className="text-center">Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {users.map((user, index) => (
          <Table.Row key={user.id}>
            <Table.Cell className="text-center">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => toggleUser(user.id)}
              />
            </Table.Cell>

            <Table.Cell className="text-center">{index + 1}</Table.Cell>
            <Table.Cell>{user.username}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell className="capitalize">{user.role}</Table.Cell>

            <Table.Cell className="text-center">
              <span
                className={`px-2 py-1 rounded-full text-sm font-medium ${
                  user.is_active
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {user.is_active ? "Active" : "Inactive"}
              </span>
            </Table.Cell>

            <Table.Cell className="text-center space-x-2">
              <MotionLink
                to={`/admin/management/users/${user.id}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "tween",
                  duration: 0.1,
                  ease: "easeOut",
                }}
                className="inline-flex items-center justify-center w-8 h-8 bg-[#161618] rounded-lg text-gray-300 hover:bg-gray-700 transition"
                title="View"
              >
                <Eye size={16} />
              </MotionLink>

              <MotionLink
                to={`/admin/management/users/${user.id}/edit`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "tween",
                  duration: 0.1,
                  ease: "easeOut",
                }}
                className="inline-flex items-center justify-center w-8 h-8 bg-[#161618] rounded-lg text-gray-300 hover:bg-green-700/50 transition"
                title="Edit"
              >
                <Pencil size={16} />
              </MotionLink>

              {onDelete && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "tween",
                    duration: 0.1,
                    ease: "easeOut",
                  }}
                  onClick={() => {
                    const confirmDelete = confirm(
                      `Are you sure you want to delete user "${user.username}"?`
                    );
                    if (confirmDelete) onDelete(user.id);
                  }}
                  className="cursor-pointer inline-flex items-center justify-center w-8 h-8 bg-[#161618] rounded-lg text-gray-300 hover:bg-red-700/50 transition"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </motion.button>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default UserTable;
