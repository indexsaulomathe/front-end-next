import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  const roles = useSelector((state: RootState) => state.user.roles);

  return (
    <aside className={`bg-gray-800 text-white h-full p-4 ${className}`}>
      <nav>
        {roles.includes("user") && (
          <ul className="mb-6">
            <h3 className="text-gray-400 mb-2">User</h3>
            <li>
              <Link href="/">
                <span className="block py-2 px-4 rounded hover:bg-gray-700">
                  Wallet
                </span>
              </Link>
            </li>
          </ul>
        )}
        {roles.includes("admin") && (
          <ul>
            <h3 className="text-gray-400 mb-2">Admin</h3>
            <li>
              <Link href="/dashboard/admin">
                <span className="block py-2 px-4 rounded hover:bg-gray-700">
                  Users
                </span>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
