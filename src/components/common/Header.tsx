import React from "react";
import { useRouter } from "next/router";
import { performLogout } from "@/services/auth";

const Header: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await performLogout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header
      className={`bg-blue-600 p-4 text-white flex items-center ${className}`}
    >
      <h1 className="text-2xl font-semibold">Dashboard Pay</h1>
      <button
        onClick={handleLogout}
        className="ml-auto bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
