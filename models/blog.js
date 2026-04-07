import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    minlength: [1, "title cannot be empty"],
    index: true, // 4.20: index for faster title search
  },
  author: String,
  url: {
    type: String,
    required: [true, "url is required"],
    minlength: [1, "url cannot be empty"],
  },
  likes: {
    type: Number,
    default: 0,
    min: [0, "likes cannot be negative"],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
