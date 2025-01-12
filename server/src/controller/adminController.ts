import { STATUS_CODE } from "../lib/helper";
import { User } from "../model/userModel";
import { Post } from "../model/postModel";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email, role: "admin" });
    if (!findUser) {
      res.status(STATUS_CODE.NOT_FOUND).send({ message: "no admin found" });
      return;
    }

    const isPasswordMatch = bcrypt.compareSync(
      password,
      findUser.password as string
    );
    if (!isPasswordMatch) {
      res.status(STATUS_CODE.NOT_FOUND).send({ message: "wrong credentials" });
      return;
    }
    const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";
    const token = jwt.sign({ role: "admin", _id: findUser._id }, JWT_SECRET, {
      expiresIn: "12h",
    });

    res
      .status(STATUS_CODE.OK)
      .send({ message: "admin logged successfully", token });
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).send({ message: `${error}` });
  }
};

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
      res
        .status(STATUS_CODE.NOT_FOUND)
        .send({ message: "admin already exists" });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password as string, 10);
    const newAdmin = new User({
      email: (email as string).toLowerCase(),
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();

    res.status(STATUS_CODE.CREATED).send({ message: "admin created" });
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).send({ message: `${error}` });
  }
};

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const findAllUsers = await User.find();
    if (!findAllUsers) {
      res
        .status(STATUS_CODE.NOT_FOUND)
        .send({ message: "admin already exists" });
      return;
    }
    res
      .status(STATUS_CODE.OK)
      .send({ message: "users fetched", users: findAllUsers });
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).send({ message: `${error}` });
  }
};

const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const findAllPosts = await Post.find().populate(
      "creator",
      "email role status"
    );
    if (!findAllPosts) {
      res
        .status(STATUS_CODE.NOT_FOUND)
        .send({ message: "admin already exists" });
      return;
    }
    res
      .status(STATUS_CODE.OK)
      .send({ message: "users fetched", posts: findAllPosts });
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).send({ message: `${error}` });
  }
};

const postStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { postId, status } = req.body;

    if (!postId) {
      res.status(400).send({ message: "Post ID is required" });
      return;
    }
    if (!["active", "restrict"].includes(status)) {
      res.status(400).send({
        message: "Invalid status. Allowed values are 'active' or 'restrict'.",
      });
      return;
    }

    const restrictPost = await Post.findByIdAndUpdate(
      postId,
      { status },
      { new: true }
    );

    if (restrictPost) {
      res
        .status(STATUS_CODE.OK)
        .send({ message: "Post restricted", post: restrictPost });
    } else {
      res
        .status(STATUS_CODE.NOT_FOUND)
        .send({ message: "No post available with the given ID" });
    }
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).send({ message: `Error: ${error}` });
  }
};

const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { postId } = req.body;
    if (!postId) {
      res.status(400).send({ message: "Post ID is required" });
      return;
    }
    const findPost = await Post.findByIdAndDelete({ _id: postId });
    if (findPost) res.status(STATUS_CODE.OK).send({ message: "post deleted" });
    else
      res.status(STATUS_CODE.NOT_FOUND).send({ message: "no post available" });
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).send({ message: `${error}` });
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;
    if (!userId) {
      res.status(400).send({ message: "User ID is required" });
      return;
    }
    const findUser = await User.findByIdAndDelete({ _id: userId });
    if (findUser) res.status(STATUS_CODE.OK).send({ message: "user deleted" });
    else
      res.status(STATUS_CODE.NOT_FOUND).send({ message: "no user available" });
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).send({ message: `${error}` });
  }
};

const userStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, status } = req.body;
    if (!userId) {
      res.status(400).send({ message: "User ID is required" });
      return;
    }

    if (!["active", "restrict"].includes(status)) {
      res.status(400).send({
        message: "Invalid status. Allowed values are 'active' or 'restrict'.",
      });
      return;
    }
    const findUser = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );
    if (findUser)
      res.status(STATUS_CODE.OK).send({ message: "user status changed" });
    else
      res.status(STATUS_CODE.NOT_FOUND).send({ message: "no user available" });
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).send({ message: `${error}` });
  }
};

export {
  login,
  register,
  postStatus,
  deletePost,
  deleteUser,
  userStatus,
  getAllUsers,
  getAllPosts,
};
