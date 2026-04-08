import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { login as loginRequest } from "./services/auth";
import { createBlog, deleteBlog, getBlogs, likeBlog } from "./services/blogs";
import { setAuthToken } from "./services/api";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import NewBlogPage from "./pages/NewBlogPage";

const STORAGE_KEY = "bloglistUser";

export default function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      setAuthToken(parsed.token);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    getBlogs().then(setBlogs).catch(() => pushNotification("error", "failed to fetch blogs"));
  }, [user]);

  const pushNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 2500);
  };

  const handleLogin = async (credentials) => {
    try {
      const loggedIn = await loginRequest(credentials);
      setUser(loggedIn);
      setAuthToken(loggedIn.token);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedIn));
      pushNotification("success", "logged in successfully");
      setBlogs(await getBlogs());
      return true;
    } catch (err) {
      pushNotification("error", err.response?.data?.error || "login failed");
      return false;
    }
  };

  const handleLogout = () => {
    setUser(null);
    setBlogs([]);
    setAuthToken(null);
    window.localStorage.removeItem(STORAGE_KEY);
    pushNotification("success", "logged out");
  };

  const handleCreateBlog = async (values) => {
    try {
      const created = await createBlog(values);
      setBlogs((prev) => prev.concat(created));
      pushNotification("success", "blog created");
      return true;
    } catch (err) {
      pushNotification("error", err.response?.data?.error || "failed to create blog");
      return false;
    }
  };

  const handleLikeBlog = async (id) => {
    try {
      const updated = await likeBlog(id);
      setBlogs((prev) => prev.map((b) => (b.id === id ? updated : b)));
    } catch {
      pushNotification("error", "failed to like blog");
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      pushNotification("success", "blog deleted");
    } catch (err) {
      pushNotification("error", err.response?.data?.error || "failed to delete blog");
    }
  };

  const sortedBlogs = useMemo(() => [...blogs].sort((a, b) => (b.likes || 0) - (a.likes || 0)), [blogs]);

  return (
    <div className="mx-auto min-h-screen max-w-5xl p-4">
      <Navbar user={user} onLogout={handleLogout} />
      <Notification notification={notification} />
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />} />
        <Route path="/" element={user ? <HomePage blogs={sortedBlogs} /> : <Navigate to="/login" replace />} />
        <Route path="/blogs/:id" element={<BlogDetailsPage blogs={sortedBlogs} user={user} onLike={handleLikeBlog} onDelete={handleDeleteBlog} />} />
        <Route path="/new" element={user ? <NewBlogPage onCreate={handleCreateBlog} /> : <Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}
