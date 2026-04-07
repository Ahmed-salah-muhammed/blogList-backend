import bcrypt from "bcrypt";
import User from "../models/users.js";

const createHttpError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

export const getAllUsers = async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  res.json(users);
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("blogs", {
      url: 1,
      title: 1,
      author: 1,
    });

    if (!user) {
      throw createHttpError(404, "user not found");
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { username, name, password } = req.body;

    if (!username || !password) {
      throw createHttpError(400, "username and password are required");
    }

    if (username.length < 3) {
      throw createHttpError(400, "username must be at least 3 characters long");
    }

    if (password.length < 3) {
      throw createHttpError(400, "password must be at least 3 characters long");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw createHttpError(400, "username must be unique");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ username, name, passwordHash });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
