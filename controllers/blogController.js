import Blog from "../models/blog.js";
import User from "../models/users.js";
import {
  buildQueryOptions,
  buildPaginationMeta,
} from "../utils/queryHelper.js";

export const getAllBlogs = async (req, res, next) => {
  try {
    const { filter, sort, skip, limit, page } = buildQueryOptions(req.query);

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .populate("user", { username: 1, name: 1 })
        .sort(sort)
        .skip(skip)
        .limit(limit),
      Blog.countDocuments(filter),
    ]);

    res.json({
      data: blogs,
      pagination: buildPaginationMeta(total, page, limit),
    });
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message });
    next(err);
  }
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

export const likeBlog = async (req, res, next) => {
  try {
    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true },
    ).populate("user", { username: 1, name: 1 });

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
