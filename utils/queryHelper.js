const sortFields = ["likes", "createdAt", "title", "author"];

export const buildQueryOptions = (query) => {
  const {
    search,
    author,
    sortBy,
    order = "desc",
    page = 1,
    limit = 10,
  } = query;

  const filter = {};
  if (search) filter.title = { $regex: search, $options: "i" };
  if (author) filter.author = { $regex: author, $options: "i" };

  if (sortBy && !sortFields.includes(sortBy)) {
    const err = new Error(
      `unsupported sort field "${sortBy}". Allowed: ${sortFields.join(", ")}`,
    );
    err.status = 400;
    throw err;
  }
  const sort = sortBy ? { [sortBy]: order === "asc" ? 1 : -1 } : {};

  const parsedLimit = Math.min(Math.max(parseInt(limit) || 10, 1), 100);
  const parsedPage = Math.max(parseInt(page) || 1, 1);
  const skip = (parsedPage - 1) * parsedLimit;

  return { filter, sort, skip, limit: parsedLimit, page: parsedPage };
};

export const buildPaginationMeta = (total, page, limit) => ({
  total,
  page,
  limit,
  totalPages: Math.ceil(total / limit),
  hasNext: page * limit < total,
  hasPrev: page > 1,
});
