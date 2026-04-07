/**
 * Builds a Mongoose-ready options object from request query params.
 *
 * Supported params:
 *   search   - partial, case-insensitive match on title
 *   author   - partial, case-insensitive match on author
 *   sortBy   - field to sort by, allowed: "likes" | "createdAt" | "title" | "author"
 *   order    - "asc" | "desc"   (default: "desc")
 *   page     - page number, 1-based  (default: 1)
 *   limit    - items per page, max 100 (default: 10)
 *
 * Returns { filter, sort, skip, limit, page } or throws { status, error } on bad input.
 */

const ALLOWED_SORT_FIELDS = ["likes", "createdAt", "title", "author"];

export const buildQueryOptions = (query) => {
  const {
    search,
    author,
    sortBy,
    order = "desc",
    page = 1,
    limit = 10,
  } = query;

  // --- filter ---
  const filter = {};
  if (search) filter.title  = { $regex: search, $options: "i" };
  if (author) filter.author = { $regex: author, $options: "i" };

  // --- sort ---
  if (sortBy && !ALLOWED_SORT_FIELDS.includes(sortBy)) {
    const err = new Error(
      `unsupported sort field "${sortBy}". Allowed: ${ALLOWED_SORT_FIELDS.join(", ")}`
    );
    err.status = 400;
    throw err;
  }
  const sort = sortBy ? { [sortBy]: order === "asc" ? 1 : -1 } : {};

  // --- pagination ---
  const parsedLimit = Math.min(Math.max(parseInt(limit) || 10, 1), 100);
  const parsedPage  = Math.max(parseInt(page) || 1, 1);
  const skip        = (parsedPage - 1) * parsedLimit;

  return { filter, sort, skip, limit: parsedLimit, page: parsedPage };
};

/**
 * Builds the pagination metadata to include in the response.
 */
export const buildPaginationMeta = (total, page, limit) => ({
  total,
  page,
  limit,
  totalPages: Math.ceil(total / limit),
  hasNext: page * limit < total,
  hasPrev:  page > 1,
});
