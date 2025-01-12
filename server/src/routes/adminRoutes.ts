import { Router } from "express";
import {
  login,
  register,
  deleteUser,
  userStatus,
  deletePost,
  postStatus,
  getAllUsers,
  getAllPosts,
} from "../controller/adminController";
import { AdminMiddleware } from "../middleware/adminMiddleware";

export const AdminRouter = Router();

AdminRouter.post("/register", register);
AdminRouter.post("/login", login);
AdminRouter.get("/user/all", AdminMiddleware, getAllUsers);
AdminRouter.delete("/user/delete", AdminMiddleware, deleteUser);
AdminRouter.put("/user/restrict", AdminMiddleware, userStatus);
AdminRouter.delete("/post/delete", AdminMiddleware, deletePost);
AdminRouter.put("/post/restrict", AdminMiddleware, postStatus);
AdminRouter.get("/post/all", AdminMiddleware, getAllPosts);
