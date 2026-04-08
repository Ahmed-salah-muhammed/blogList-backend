# Bloglist

## Project Structure

```
bloglist/                        ← backend (Node/Express)
├── controllers/
│   ├── blogController.js
│   ├── loginController.js
│   └── userController.js
├── models/
│   ├── blog.js
│   └── users.js
├── routes/
│   ├── blogRoutes.js
│   ├── loginRoutes.js
│   └── userRoutes.js
├── utils/
│   ├── httpError.js
│   ├── middleware.js
│   └── queryHelper.js
├── app.js
├── server.js
├── package.json
└── .env                         ← backend env vars

frontend/                        ← frontend (React/Vite)
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── vite.config.js
├── package.json
└── .env                         ← frontend env vars (optional)
```

## Backend Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/login` | — | Login, returns JWT token |
| GET | `/api/blogs` | — | Get all blogs (supports `?search=`, `?sortBy=`, `?page=`, `?limit=`) |
| GET | `/api/blogs/:id` | — | Get single blog |
| POST | `/api/blogs` | ✅ Bearer token | Create new blog |
| PUT | `/api/blogs/:id` | ✅ Owner only | Update blog |
| PATCH | `/api/blogs/:id/like` | — | Increment likes |
| DELETE | `/api/blogs/:id` | ✅ Owner only | Delete blog |
| GET | `/api/users` | — | Get all users |
| POST | `/api/users` | — | Create new user |

## Getting Started

### 1. Backend
```bash
# في root directory
cp .env.example .env       # أو عدّل .env مباشرة
# حط الـ MONGODB_URI وSECRET في .env

npm install
npm run dev                # runs on http://localhost:3003
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev                # runs on http://localhost:5173
```

الـ Vite proxy بيوجّه أي request لـ `/api` تلقائياً إلى `http://localhost:3003`.

## Backend .env
```env
NODE_ENV=development
PORT=3003
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/bloglist
SECRET=your_jwt_secret_here
```
