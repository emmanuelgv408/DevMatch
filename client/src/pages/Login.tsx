import { useState } from "react";
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);

    
      localStorage.setItem("user", JSON.stringify(data.user));
    

      navigate("/feed");

      console.log("Login successful:", data);
      toast.success("Welcome back 👋")
  
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-2 sm:px-4">
      {/* Navbar */}
      <nav className="flex flex-col sm:flex-row justify-center items-center w-full sm:max-w-md mb-8">
        <div className="border p-1 bg-black rounded-xl mb-2 sm:mb-0">
          <h2 className="font-extrabold text-2xl text-center sm:text-left">
            <span className="text-white">Dev</span>
            <span className="text-blue-700">Match</span>
          </h2>
        </div>

      </nav>

      {/* Login Form */}
      <div className="w-full sm:max-w-md bg-gray-800 p-6 rounded-xl shadow-md mx-2 sm:mx-0">
        <h3 className="text-white text-xl font-semibold mb-4 text-center sm:text-left">
          Login to your account
        </h3>

        {error && (
          <div className="mb-4 text-red-500 font-medium text-sm">{error}</div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-700 sm:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-700 sm:text-base"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
      type="button" 
      onClick={() => navigate("/register")} 
      className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-black/80 transition cursor-pointer"
    >
      Register
    </button>

        </form>
      </div>
    </div>
  );
}

export default Login;
