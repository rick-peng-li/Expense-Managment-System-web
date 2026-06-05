// src/components/Sidebar.js
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/expenses", label: "Expenses" },
    { path: "/budgets", label: "Budgets" },
    { path: "/reports", label: "Reports" },
    { path: "/profile", label: "Profile" },
  ];

  return (
    <div className="w-60 bg-gray-100 h-screen p-4 space-y-2 shadow-md">
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
