import { Router } from "express";
import {
  login,
  register,
  deleteUser,
  userStatus,
  deletePost,
  postStatus,
} from "../controller/adminController";
import { AdminMiddleware } from "../middleware/adminMiddleware";

export const AdminRouter = Router();

AdminRouter.post("/register", register);
AdminRouter.post("/login", login);
AdminRouter.delete("/user/delete", AdminMiddleware, deleteUser);
AdminRouter.put("/user/restrict", AdminMiddleware, userStatus);
AdminRouter.delete("/post/delete", AdminMiddleware, deletePost);
AdminRouter.put("/post/restrict", AdminMiddleware, postStatus);
