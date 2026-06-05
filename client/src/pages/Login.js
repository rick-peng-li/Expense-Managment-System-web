import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) navigate("/dashboard");
    else setError(res.message);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <form className="bg-white p-8 rounded-xl shadow-lg w-96" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Login</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input type="email" placeholder="Email" className="border p-2 w-full mb-3 rounded" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="border p-2 w-full mb-3 rounded" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition">Login</button>
      </form>
    </div>
  );
};

export default Login;