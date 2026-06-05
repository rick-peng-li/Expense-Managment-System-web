// src/pages/Profile.js
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleUpdate = (e) => {
    e.preventDefault();
    alert("Profile updated (mock)");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block mb-1 font-bold">Username</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold">Email</label>
          <input
            type="email"
            className="border p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
        <button
          type="button"
          onClick={logout}
          className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default Profile;
