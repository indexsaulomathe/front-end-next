import React from "react";
import Link from "next/link";

const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <aside className={`bg-gray-800 text-white h-full p-4 ${className}`}>
      <nav>
        <ul>
          <li>
            <Link href="/dashboard/wallet">
              <span className="block py-2 px-4 rounded hover:bg-gray-700">
                Wallet
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
