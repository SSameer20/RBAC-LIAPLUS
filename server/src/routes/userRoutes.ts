import { Router } from "express";
import { login, register } from "../controller/userController";
import { UserMiddleware } from "../middleware/userMiddleware";

export const UserRouter = Router();

UserRouter.post("/register", register);
UserRouter.post("/login", login);
