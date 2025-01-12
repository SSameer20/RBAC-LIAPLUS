import { Router } from "express";
import {
  login,
  register,
  createPost,
  deletePost,
  getAllPosts,
  getUserPosts,
} from "../controller/userController";
import { UserMiddleware } from "../middleware/userMiddleware";

export const UserRouter = Router();

UserRouter.post("/register", register);
UserRouter.post("/login", login);
UserRouter.get("/post/all", UserMiddleware, getAllPosts);
UserRouter.get("/post/user", UserMiddleware, getUserPosts);

UserRouter.post("/post/create", UserMiddleware, createPost);
UserRouter.delete("/post/delete", UserMiddleware, deletePost);
