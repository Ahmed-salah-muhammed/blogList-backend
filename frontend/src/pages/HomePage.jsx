import BlogList from "../components/BlogList";

export default function HomePage({ blogs }) {
  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-bold text-slate-800">Blogs</h1>
      <BlogList blogs={blogs} />
    </section>
  );
}
