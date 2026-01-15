 
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import App from "./app/App"
import Login from "./pages/Login"
import Register from './pages/Register'
import './index.css'



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* App layout */}
        <Route path="/" element={<App />}>
          {/* Nested routes can go here later */}
        </Route>

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    
      </Routes>
      <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#111827",
          color: "#fff",
        },
      }}
    />
    </BrowserRouter>
  </React.StrictMode>
)
