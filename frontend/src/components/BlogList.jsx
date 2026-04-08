import { Link } from "react-router-dom";

export default function BlogList({ blogs }) {
  if (!blogs.length) return <p className="rounded border bg-white p-4 text-slate-500">No blogs yet.</p>;

  return (
    <ul className="overflow-hidden rounded-lg border bg-white shadow-sm">
      {blogs.map((blog) => (
        <li key={blog.id} className="flex items-center justify-between border-b px-4 py-3 last:border-b-0">
          <div>
            <Link to={`/blogs/${blog.id}`} className="font-medium text-blue-700 hover:underline">{blog.title}</Link>
            <span className="text-slate-500"> — {blog.author}</span>
          </div>
          <span className="text-sm text-slate-500">❤️ {blog.likes || 0}</span>
        </li>
      ))}
    </ul>
  );
}
