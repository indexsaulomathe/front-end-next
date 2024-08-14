import React from "react";
import { User } from "@/types/user";

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="w-1/5 px-4 py-3 text-left">Name</th>
            <th className="w-1/5 px-4 py-3 text-left">Email</th>
            <th className="w-1/5 px-4 py-3 text-left">Roles</th>
            <th className="w-1/5 px-4 py-3 text-left">Blocked</th>
            <th className="w-1/5 px-4 py-3 text-left">Created At</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="px-4 py-3">{user.name}</td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.roles.join(", ")}</td>
              <td className="px-4 py-3">
                {user.blocked ? (
                  <span className="text-red-500">Yes</span>
                ) : (
                  <span className="text-green-500">No</span>
                )}
              </td>
              <td className="px-4 py-3">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
