import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  } else {
    req.token = null;
  }
  next();
};

export const userExtractor = async (req, res, next) => {
  try {
    if (!req.token) {
      return res.status(401).json({ error: "token missing" });
    }

    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({ error: "token invalid" });
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

export const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
};

export const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).json({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  } else if (err.name === "MongoServerError" && err.code === 11000) {
    return res.status(400).json({ error: "duplicate key error" });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "invalid token" });
  } else if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "token expired" });
  } else if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "malformatted JSON body" });
  }

  return res.status(500).json({ error: "internal server error" });
};
