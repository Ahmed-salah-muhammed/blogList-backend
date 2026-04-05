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
  }

  next(err);
};
