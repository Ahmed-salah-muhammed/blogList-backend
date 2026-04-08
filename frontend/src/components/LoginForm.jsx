import { useState } from "react";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    await onLogin({ username, password });
    setPassword("");
  };

  return (
    <form onSubmit={submit} className="mx-auto flex max-w-md flex-col gap-3 rounded-lg border bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">Login</h2>
      <label className="text-sm font-medium">Username
        <input className="mt-1 w-full rounded border px-3 py-2" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </label>
      <label className="text-sm font-medium">Password
        <input type="password" className="mt-1 w-full rounded border px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit" className="rounded bg-blue-700 px-3 py-2 text-white hover:bg-blue-800">login</button>
    </form>
  );
}
