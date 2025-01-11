import { Router } from "express";
import {
  login,
  register,
  createPost,
  deletePost,
} from "../controller/userController";
import { UserMiddleware } from "../middleware/userMiddleware";

export const UserRouter = Router();

UserRouter.post("/register", register);
UserRouter.post("/login", login);
UserRouter.post("/post/create", UserMiddleware, createPost);
UserRouter.delete("/post/delete", UserMiddleware, deletePost);
