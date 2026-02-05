import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import React from "react";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
