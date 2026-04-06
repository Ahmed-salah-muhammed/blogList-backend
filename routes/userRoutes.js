import { Router } from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUser);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);

export default router;
