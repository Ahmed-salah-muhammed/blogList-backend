import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/users.js";

const createHttpError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw createHttpError(400, "username and password are required");
    }

    const user = await User.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!user || !passwordCorrect) {
      throw createHttpError(401, "invalid username or password");
    }

    const tokenPayload = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(tokenPayload, process.env.SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      username: user.username,
      name: user.name,
    });
  } catch (err) {
    next(err);
  }
};
