import { useState } from "react";

export default function BlogForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    const ok = await onCreate({ title, author, url });
    if (ok) {
      setTitle("");
      setAuthor("");
      setUrl("");
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto flex max-w-lg flex-col gap-3 rounded-lg border bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">Create New Blog</h2>
      <label className="text-sm font-medium">Title
        <input className="mt-1 w-full rounded border px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label className="text-sm font-medium">Author
        <input className="mt-1 w-full rounded border px-3 py-2" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </label>
      <label className="text-sm font-medium">URL
        <input className="mt-1 w-full rounded border px-3 py-2" value={url} onChange={(e) => setUrl(e.target.value)} required />
      </label>
      <button type="submit" className="rounded bg-blue-700 px-3 py-2 text-white hover:bg-blue-800">create</button>
    </form>
  );
}
