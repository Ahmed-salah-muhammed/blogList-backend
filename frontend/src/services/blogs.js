import api from "./api";

export const getBlogs = async () => {
  const { data } = await api.get("/blogs");
  return data.data || [];
};

export const createBlog = async (blog) => {
  const { data } = await api.post("/blogs", blog);
  return data;
};

export const likeBlog = async (id) => {
  const { data } = await api.patch(`/blogs/${id}/like`);
  return data;
};

export const deleteBlog = async (id) => {
  await api.delete(`/blogs/${id}`);
};
