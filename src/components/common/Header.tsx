import React from "react";

const Header: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <header className={`bg-blue-600 p-4 text-white ${className}`}>
      <h1 className="text-xl">Dashboard Header</h1>
    </header>
  );
};

export default Header;
