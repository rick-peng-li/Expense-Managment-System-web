// src/components/Navbar.js
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Title (non-clickable) */}
      <div className="text-2xl font-bold">Expense Manager</div>

      <div className="space-x-4">
        {user && user.username ? (
          <>
            <span>Welcome, {user.username}</span>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-blue-600 px-3 py-1 rounded"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-green-500 px-3 py-1 rounded"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
