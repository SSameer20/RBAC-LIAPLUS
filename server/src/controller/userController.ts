import { STATUS_CODE } from "../lib/helper";
import { User } from "../model/userModel";
import { Post } from "../model/postModel";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email, role: "user" });
    if (!findUser) {
      res.status(STATUS_CODE.NOT_FOUND).send({ message: "no user found" });
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
    const token = jwt.sign({ role: "user", _id: findUser._id }, JWT_SECRET, {
      expiresIn: "12h",
    });

    res
      .status(STATUS_CODE.OK)
      .send({ message: "user logged successfully", token });
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
        .send({ message: "user already exists" });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password as string, 10);
    const newUser = new User({
      email: (email as string).toLowerCase(),
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    res.status(STATUS_CODE.CREATED).send({ message: "user created" });
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).send({ message: `${error}` });
  }
};
const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, image } = req.body;
    const id = req.user?.id;
    if (!id) {
      res
        .status(STATUS_CODE.NOT_AUTHORISED)
        .send({ message: "you are not allowed" });
      return;
    }
    const newPost = new Post({
      creator: id,
      title,
      description,
      image,
    });

    await newPost.save();

    await User.findByIdAndUpdate(
      id,
      { $push: { posts: newPost._id } },
      { new: true, useFindAndModify: false }
    );

    res.status(STATUS_CODE.CREATED).send({ message: "post created" });
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).send({ message: `${error}` });
  }
};
const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { postId } = req.body;
    const id = req.user?.id;
    if (!postId) {
      res.status(400).send({ message: "Post ID is required" });
      return;
    }

    if (!id) {
      res.status(401).send({ message: "Unauthorized: User not authenticated" });
      return;
    }
    const findPost = await Post.findByIdAndDelete({ _id: postId, creator: id });
    if (findPost) res.status(STATUS_CODE.OK).send({ message: "post deleted" });
    else
      res.status(STATUS_CODE.NOT_FOUND).send({ message: "no post available" });
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).send({ message: `${error}` });
  }
};

const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const findAllPosts = await Post.find({}).populate(
      "creator",
      "email role status"
    );
    if (!findAllPosts) {
      res.status(STATUS_CODE.NOT_FOUND).send({ message: "No Post Available" });
      return;
    }
    res
      .status(STATUS_CODE.OK)
      .send({ message: "posts fetched", posts: findAllPosts });
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).send({ message: `${error}` });
  }
};

const getUserPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const findAllPosts = await Post.find({ creator: userId }).populate(
      "creator",
      "email role status"
    );
    if (!findAllPosts) {
      res.status(STATUS_CODE.NOT_FOUND).send({ message: "No Post Available" });
      return;
    }
    res
      .status(STATUS_CODE.OK)
      .send({ message: "posts fetched", posts: findAllPosts });
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).send({ message: `${error}` });
  }
};

export { login, register, createPost, deletePost, getAllPosts, getUserPosts };
