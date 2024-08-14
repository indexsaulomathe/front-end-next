import React from "react";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import Footer from "../components/common/Footer";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] grid-cols-1 lg:grid-cols-[3fr_9fr] min-h-screen bg-gray-100">
      {/* Header */}
      <div className="col-span-1 lg:col-span-2 bg-white shadow-md">
        <Header />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="hidden lg:block lg:w-3/12 bg-gray-800 text-white">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 bg-gray-100 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Footer */}
      <div className="col-span-1 lg:col-span-2 bg-gray-800 text-white">
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
