import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ email, password });
  };

  return (
    <div className="max-w-md mx-auto py-4 ">
      <nav className="flex justify-between items-center">
        <div className=" border p-1 bg-black rounded-xl ">
            <h2 className="font-extrabold"><span className="text-white">Dev</span><span className="text-blue-700">Match</span></h2>
        </div>

        <div className="flex space-x-2">
            <button className="border border-blue-700 text-blue-700 rounded-xl px-3 py-1">Welcome Back</button>
            <button className="border text-white bg-black rounded-xl px-3 py-1">Join Now</button>
        </div>
    

      </nav>
    </div>
  );
}

export default Login;
