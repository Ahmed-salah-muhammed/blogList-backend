import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/users.js";

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "username and password are required" });
    }

    const user = await User.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!user || !passwordCorrect) {
      return res.status(401).json({ error: "invalid username or password" });
    }

    const tokenPayload = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(tokenPayload, process.env.SECRET, {
      expiresIn: "60*60",
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
