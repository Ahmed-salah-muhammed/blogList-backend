import jwt from "jsonwebtoken";
import Blog from "../models/blog.js";
import User from "../models/users.js";
import { buildQueryOptions, buildPaginationMeta } from "../utils/queryHelper.js";
import { createHttpError } from "../utils/httpError.js";

const buildSafeBlogUpdate = (body) => {
  const { user, _id, id, ...safeBody } = body;
  return safeBody;
};

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
      throw createHttpError(404, "blog not found");
    }

    res.json(blog);
  } catch (err) {
    next(err);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    if (!req.token) {
      throw createHttpError(401, "token missing");
    }

    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);

    if (!user) {
      throw createHttpError(401, "token invalid");
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
    if (!req.token) {
      throw createHttpError(401, "token missing");
    }

    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      throw createHttpError(404, "blog not found");
    }

    if (!blog.user || blog.user.toString() !== decodedToken.id) {
      throw createHttpError(403, "forbidden: only owner can update blog");
    }

    const safeUpdate = buildSafeBlogUpdate(req.body);

    const updated = await Blog.findByIdAndUpdate(req.params.id, safeUpdate, {
      new: true,
      runValidators: true,
      context: "query",
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// 4.18: increment likes by 1
export const likeBlog = async (req, res, next) => {
  try {
    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    ).populate("user", { username: 1, name: 1 });

    if (!updated) {
      throw createHttpError(404, "blog not found");
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    if (!req.token) {
      throw createHttpError(401, "token missing");
    }

    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      throw createHttpError(404, "blog not found");
    }

    if (!blog.user || blog.user.toString() !== decodedToken.id) {
      throw createHttpError(403, "forbidden: only owner can delete blog");
    }

    await Blog.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(decodedToken.id, { $pull: { blogs: blog._id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
