// @/components/DashboardLayout.tsx
import React, { ReactNode } from "react";
import useAuth from "@/hooks/useAuth";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import Footer from "../components/common/Footer";

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] grid-cols-1 lg:grid-cols-[1fr_4fr] min-h-screen bg-gray-100">
      <Header />

      <main className="flex flex-col lg:grid lg:grid-cols-[1fr_4fr] lg:gap-4 md:p-6">
        <aside className="hidden lg:block bg-blue-600 text-white lg:col-span-1">
          <Sidebar />
        </aside>

        <div className="flex-1 bg-gray-100 overflow-y-auto lg:col-span-3">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
