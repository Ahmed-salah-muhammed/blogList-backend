![Pagination Diagram](./Barcelona.png)

```
------   this is the structure of the project   ------

bloglist/
├── models/
│   └── blog.js          ← Mongoose model
├── controllers/
│   └── blogController.js  CRUD logic
├── routes/
│   └── blogRoutes.js    ← endpoints
├── utils/
│   └── middleware.js    ← logger, unknownEndpoint, errorHandler
├── app.js               ← Express app + MongoDB connection
├── server.js            ← entry point
├── package.json
├── .env
└── .gitignore

```
