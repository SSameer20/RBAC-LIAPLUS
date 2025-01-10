import { Router } from "express";
import { login, register } from "../controller/adminController";
import { AdminMiddleware } from "../middleware/adminMiddleware";

export const AdminRouter = Router();

AdminRouter.post("/register", register);
AdminRouter.post("/login", login);
