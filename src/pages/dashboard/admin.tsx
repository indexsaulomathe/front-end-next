import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import UserTable from "@/components/admin/UserTable";
import { User } from "@/types/user";
import { createUser, getAllUsers } from "@/services/users";
import UserModal from "@/components/admin/UserModal";
import { toast } from "react-toastify";
import { createWallet } from "@/services/wallet";

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveUser = async (
    name: string,
    email: string,
    password: string,
    roles: string[],
    blocked: boolean
  ) => {
    try {
      const newUser = await createUser(name, email, password, roles, blocked);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      const initialBalance = 0.0;
      await createWallet(newUser.id, initialBalance);
      toast.success("Create user successful");
    } catch (error) {
      toast.error("Failed to create user");
      setError("Failed to create user");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 mt-5">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Page</h1>

        <div className="mb-4 flex justify-center md:justify-end">
          <button
            onClick={handleAddUser}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow-md transition duration-200 ease-in-out"
          >
            Add New User
          </button>
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg w-full">
            <UserTable users={users} />
          </div>
        )}

        <UserModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveUser}
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminPage;
