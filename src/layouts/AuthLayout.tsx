import React from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow rounded w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
