import Blog from "../models/blog.js";
import User from "../models/users.js";

export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  res.json(blogs);
};

export const getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("user", {
      username: 1,
      name: 1,
    });

    if (!blog) {
      return res.status(404).json({ error: "blog not found" });
    }

    res.json(blog);
  } catch (err) {
    next(err);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const user = await User.findOne({});

    if (!user) {
      return res.status(400).json({ error: "no users found in the database" });
    }

    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes,
      user: user._id,
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
  } catch (err) {
    next(err);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    });

    if (!updated) {
      return res.status(404).json({ error: "blog not found" });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
