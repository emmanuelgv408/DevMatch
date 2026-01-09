 
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./app/App"
import Login from "./pages/Login"
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
    
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
