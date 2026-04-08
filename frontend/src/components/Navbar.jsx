import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="mb-4 flex items-center justify-between rounded-lg border bg-white p-3 shadow-sm">
      <div className="flex gap-4 text-sm font-medium">
        <Link to="/" className="text-blue-700 hover:underline">Blogs</Link>
        {user && <Link to="/new" className="text-blue-700 hover:underline">New Blog</Link>}
      </div>
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <span className="text-sm text-slate-600">{user.name} logged in</span>
            <button onClick={onLogout} className="rounded bg-slate-800 px-3 py-1 text-sm text-white hover:bg-slate-900">logout</button>
          </>
        ) : (
          <Link to="/login" className="text-blue-700 hover:underline">Login</Link>
        )}
      </div>
    </nav>
  );
}
