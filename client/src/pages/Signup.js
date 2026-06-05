import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(username, email, password);
    if (res.success) {
      // ✅ Redirect to login page with success state
      navigate("/login", { state: { signupSuccess: true } });
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-100 via-yellow-100 to-pink-100">
      <form
        className="bg-white p-8 rounded-xl shadow-lg w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold mb-4 text-purple-700">Signup</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full mb-3 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600 transition"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;