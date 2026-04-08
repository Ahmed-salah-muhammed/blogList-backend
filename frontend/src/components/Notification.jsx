export default function Notification({ notification }) {
  if (!notification) return null;

  const tone = notification.type === "success"
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : "border-rose-200 bg-rose-50 text-rose-700";

  return <div className={`mb-4 rounded border px-3 py-2 text-sm ${tone}`}>{notification.message}</div>;
}
