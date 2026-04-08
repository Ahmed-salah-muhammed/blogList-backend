import { useParams } from "react-router-dom";
import BlogDetails from "../components/BlogDetails";

export default function BlogDetailsPage({ blogs, user, onLike, onDelete }) {
  const { id } = useParams();
  const blog = blogs.find((item) => item.id === id);

  return <BlogDetails blog={blog} user={user} onLike={onLike} onDelete={onDelete} />;
}
