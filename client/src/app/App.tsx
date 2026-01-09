
import { Outlet, Link } from "react-router-dom"

function App() {
  return (
    <div className="p-4">
      <header className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">DevMatch</h1>
        <nav className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>

      <main>
        {/* Nested route content will render here */}
        <Outlet />
      </main>
    </div>
  )
}

export default App
