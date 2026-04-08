export default function BlogDetails({ blog, user, onLike, onDelete }) {
  if (!blog) return <p className="rounded border bg-white p-4">Blog not found.</p>;

  const canDelete = user && blog.user && user.username === blog.user.username;

  return (
    <div className="rounded-lg border bg-white p-5 shadow-sm">
      <h2 className="mb-2 text-2xl font-semibold">{blog.title}</h2>
      <p className="text-slate-600">Author: {blog.author || "Unknown"}</p>
      <p className="mb-2 text-slate-600">URL: <a className="text-blue-700 underline" href={blog.url}>{blog.url}</a></p>
      <p className="mb-4 text-slate-600">Likes: {blog.likes || 0}</p>
      <button onClick={() => onLike(blog.id)} className="rounded bg-blue-700 px-3 py-2 text-white hover:bg-blue-800">like</button>
      {canDelete && <button onClick={() => onDelete(blog.id)} className="ml-2 rounded bg-rose-600 px-3 py-2 text-white hover:bg-rose-700">delete</button>}
    </div>
  );
}
