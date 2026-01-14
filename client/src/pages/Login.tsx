import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = import.meta.env.VITE_BASE_URL; 

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

    console.log("Login successful:", data);
    
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      {/* Navbar */}
      <nav className="flex justify-between items-center w-full max-w-md mb-8">
        <div className="border p-1 bg-black rounded-xl">
          <h2 className="font-extrabold text-2xl">
            <span className="text-white">Dev</span>
            <span className="text-blue-700">Match</span>
          </h2>
        </div>

        <div className="flex space-x-2">
          <button className="border border-blue-700 text-blue-700 rounded-xl px-3 py-1 hover:bg-blue-700 hover:text-white transition cursor-pointer">
            Welcome Back
          </button>
          <button className="border text-white bg-black rounded-xl px-3 py-1 hover:bg-gray-700 transition cursor-pointer">
            Join Now
          </button>
        </div>
      </nav>

      {/* Login Form */}
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-md">
        <h3 className="text-white text-xl font-semibold mb-4">Login to your account</h3>

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
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-700"
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
        </form>
      </div>
    </div>
  );
}

export default Login;
