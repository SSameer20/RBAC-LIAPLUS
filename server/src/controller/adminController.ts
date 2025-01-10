import { STATUS_CODE } from "../lib/helper";
import { User } from "../model/userModel";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// const hash = bcrypt.hashSync('password', 10);
// const isMatch = bcrypt.compareSync('password', hash);
const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
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
      .send({ msg: "admin logged successfully", token });
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

    res.status(STATUS_CODE.CREATED).send({ msg: "admin created" });
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).send({ message: `${error}` });
  }
};

export { login, register };
