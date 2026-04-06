# Bloglist API

## Project Structure

```
bloglist/
├── models/
│   ├── blog.js               ← Blog schema & model
│   └── users.js              ← User schema & model
├── controllers/
│   ├── blogController.js     ← Blog CRUD + like logic
│   └── userController.js     ← User creation & listing
├── routes/
│   ├── blogRoutes.js         ← /api/blogs endpoints
│   └── userRoutes.js         ← /api/users endpoints
├── utils/
│   ├── middleware.js         ← logger, errorHandler, unknownEndpoint
│   └── queryHelper.js        ← search, sort, pagination helpers
├── app.js                    ← Express app + MongoDB connection
├── server.js                 ← Entry point + dotenv
├── package.json
├── .env
└── .gitignore
```

## Endpoints

### Blogs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blogs` | Get all blogs |
| GET | `/api/blogs?search=react` | Search blogs by title |
| GET | `/api/blogs?author=dan` | Filter by author |
| GET | `/api/blogs?sortBy=likes&order=asc` | Sort results |
| GET | `/api/blogs?page=1&limit=10` | Paginate results |
| GET | `/api/blogs/:id` | Get single blog |
| POST | `/api/blogs` | Create new blog |
| PUT | `/api/blogs/:id` | Update blog |
| PATCH | `/api/blogs/:id/like` | Increment likes by 1 |
| DELETE | `/api/blogs/:id` | Delete blog |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users (with their blogs) |
| GET | `/api/users/:id` | Get single user |
| POST | `/api/users` | Create new user |
| DELETE | `/api/users/:id` | Delete user |

## Environment Variables

```env
NODE_ENV=development
PORT=3003
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/bloglist
```

## Getting Started

```bash
npm install
npm run dev
```
